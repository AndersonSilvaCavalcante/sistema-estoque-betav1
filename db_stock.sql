CREATE DATABASE db_stock

USE db_stock

CREATE TABLE supplier(
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(255) NOT NULL,
	contact VARCHAR(255) NOT NULL
)

CREATE TABLE products(
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(255) NOT NULL,
	barcode VARCHAR(255) NOT NULL,
	supplierId INT NOT NULL,
	qtdMin  INT NOT NULL,
	qtdCurrent  INT NOT NULL,
	costPrice float NOT NULL,
	salePrice float NOT NULL,
	FOREIGN KEY (supplierId) REFERENCES supplier(id)
)

CREATE TABLE services(
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(255) NOT NULL,
	costPrice float NOT NULL,
	salePrice float NOT NULL
)

CREATE TABLE client(
	id INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(255) NOT NULL,
	phone VARCHAR(255) NOT NULL,
	plate VARCHAR(255) NOT NULL,
	model VARCHAR(255) NOT NULL,
	dateCreated date default(GETDATE())
)

CREATE TABLE orderService (
	id INT PRIMARY KEY IDENTITY(1,1),
	clientId INT NOT NULL,
	services VARCHAR(255) NOT NULL,
	comments VARCHAR(255),
	status VARCHAR(255) NOT NULL DEFAULT('started'),
	dateCreated date default(GETDATE()),
	dateClosed date,
	FOREIGN KEY (clientId) REFERENCES client(id)
)

CREATE OR ALTER PROCEDURE get_products
	@id int,
	@name varchar(255),
	@barcode varchar(255),
	@supplierId varchar(255)
AS
	SELECT 
		p.id ,
		p.name,
		p.barcode,
		p.supplierId,
		sp.name 'supplierName',
		p.qtdMin,
		p.qtdCurrent,
		p.costPrice,
		p.salePrice
	FROM products p JOIN supplier AS sp
	ON (p.supplierId = sp.id)
	WHERE 
		(p.id = @id or @id IS NULL) AND
		(p.name = @name or @name IS NULL) AND
		(barcode = @barcode or @barcode IS NULL) AND
		(supplierId = @supplierId or @supplierId IS NULL)
GO

CREATE PROCEDURE post_products
	@name VARCHAR(255),
	@barcode VARCHAR(255),
	@supplierId INT,
	@qtdMin  INT,
	@qtdCurrent  INT,
	@costPrice float,
	@salePrice float 
AS
	INSERT INTO products (name, barcode, supplierId, qtdMin, qtdCurrent, costPrice, salePrice) VALUES(@name, @barcode, @supplierId, @qtdMin, @qtdCurrent, @costPrice, @salePrice);
GO

CREATE PROCEDURE put_products
	@id int,
	@name VARCHAR(255),
	@barcode VARCHAR(255),
	@supplierId INT,
	@qtdMin  INT,
	@qtdCurrent  INT,
	@costPrice float,
	@salePrice float
AS
	UPDATE 
		products
	SET
		name =  @name,
		barcode = @barcode,
		supplierId = @supplierId,
		qtdMin = @qtdMin,
		qtdCurrent = @qtdCurrent,
		costPrice = @costPrice,
		salePrice = @salePrice
	WHERE id = @id;
GO
		
CREATE PROCEDURE delete_products
	@id int
AS
	DELETE FROM products
	WHERE (id = @id)
GO


CREATE OR ALTER PROCEDURE get_supplier
	@id int,
	@name varchar(255)
AS
	SELECT 
		id ,
		name,
		contact
	FROM supplier
	WHERE 
		(id = @id or @id IS NULL) AND
		(name = @name or @name IS NULL)
GO

CREATE PROCEDURE post_supplier
	@name VARCHAR(255),
	@contact VARCHAR(255)
AS
	INSERT INTO supplier (name, contact) VALUES(@name, @contact);
GO

CREATE PROCEDURE put_supplier
	@id int,
	@name VARCHAR(255),
	@contact VARCHAR(255)
AS
	UPDATE 
		supplier
	SET
		name =  @name,
		contact = @contact
	WHERE id = @id;
GO
		
CREATE PROCEDURE delete_supplier
	@id int
AS
BEGIN TRY
	DELETE FROM supplier
	WHERE (id = @id)
END TRY
BEGIN CATCH

DECLARE @nErrorNum INT;

	CREATE TABLE #error(
		id INT PRIMARY KEY IDENTITY(1,1),
		ErrorMessage VARCHAR(255) NOT NULL
	)

    SELECT  @nErrorNum = ERROR_NUMBER()

    IF @nErrorNum = 547
    BEGIN
        INSERT INTO #error (ErrorMessage) VALUES('Fornecedor n�o pode ser excluido porque existe um produto atrelado a ele.');
    END
    ELSE
       THROW

	SELECT ErrorMessage FROM #error
	DROP TABLE #error
END CATCH;
GO


CREATE PROCEDURE get_services
	@id int,
	@name varchar(255)
AS
	SELECT 
		id ,
		name,
		costPrice,
		salePrice
	FROM services
	WHERE 
		(id = @id or @id IS NULL) AND
		(name = @name or @name IS NULL)
GO

CREATE PROCEDURE post_services
	@name VARCHAR(255),
	@costPrice float,
	@salePrice float 
AS
	INSERT INTO services (name, costPrice, salePrice) VALUES(@name, @costPrice, @salePrice);
GO

CREATE PROCEDURE put_services
	@id int,
	@name VARCHAR(255),
	@costPrice float,
	@salePrice float
AS
	UPDATE 
		services
	SET
		name =  @name,
		costPrice = @costPrice,
		salePrice = @salePrice
	WHERE id = @id;
GO
		
CREATE PROCEDURE delete_services
	@id int
AS
	DELETE FROM services
	WHERE (id = @id)
GO


CREATE OR ALTER PROCEDURE get_OrderService
	@status varchar(255),
	@plate varchar(255),
	@order int
AS
	SELECT 
		s.id 'order' ,
		s.dateCreated,
		c.plate 'plate',
		s.status,
		s.dateClosed
	FROM orderService s
	INNER JOIN client c on c.id = s.clientId
	WHERE 
		(s.status = @status or @status LIKE '') AND
		(c.plate LIKE @plate  or @plate IS NULL) AND
		(s.id = @order  or @order IS NULL) 
GO

sp_helptext get_OrderService


SELECT CONVERT(VARCHAR, s.id ) FROM orderService s
SELECT CAST(1.9 AS INT) FROM client c

select * from orderService

CREATE OR ALTER PROCEDURE post_OrderService
	@clientId VARCHAR(255),
	@services VARCHAR(255),
	@comments VARCHAR(255) 
AS
	INSERT INTO orderService
		(clientId, services, comments) 
	VALUES
		(@clientId, @services, @comments);
GO

CREATE PROCEDURE closeOrderService
	@id int
AS
	UPDATE 
		orderService
	SET
		status =  'closed'
	WHERE id = @id;
GO

CREATE PROCEDURE get_Client
	@id int,
	@name VARCHAR(255),
	@plate VARCHAR(255)
AS
	SELECT 
		id,
		name,
		phone,
		plate,
		model

	FROM client
	WHERE 
		(id = @id or @id IS NULL) AND
		(name = @name or @name IS NULL) AND
		(plate = @plate or @plate IS NULL)
GO

CREATE PROCEDURE post_Clients
	@name VARCHAR(255),
	@phone VARCHAR(255),
	@plate VARCHAR(255),
	@model VARCHAR(255)
AS
	INSERT INTO client
		(name, phone, plate, model)
	VALUES
		(@name, @phone, @plate, @model)
GO

CREATE PROCEDURE put_Clients
	@id int,
	@name VARCHAR(255),
	@phone VARCHAR(255),
	@plate VARCHAR(255),
	@model VARCHAR(255)
AS
	UPDATE 
		client
	SET
		name = @name, 
		phone = @phone, 
		plate = @plate, 
		model = @model
	WHERE id = @id;
GO

CREATE PROCEDURE delete_client
	@id int
AS
BEGIN TRY
	DELETE FROM client
	WHERE (id = @id)
END TRY
BEGIN CATCH

DECLARE @nErrorNum INT;

	CREATE TABLE #error(
		id INT PRIMARY KEY IDENTITY(1,1),
		ErrorMessage VARCHAR(255) NOT NULL
	)

    SELECT  @nErrorNum = ERROR_NUMBER()

    IF @nErrorNum = 547
    BEGIN
        INSERT INTO #error (ErrorMessage) VALUES('Cliente não pode ser excluido porque existe uma ordem de serviço atrelada a ele.');
    END
    ELSE
       THROW

	SELECT ErrorMessage FROM #error
	DROP TABLE #error
END CATCH;
GO	