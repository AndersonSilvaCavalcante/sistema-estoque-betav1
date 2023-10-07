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

CREATE OR ALTER PROCEDURE get_products
	@id int,
	@name varchar(255),
	@barcode varchar(255)
AS
	SELECT 
		id ,
		name,
		barcode,
		supplierId ,
		qtdMin,
		qtdCurrent,
		costPrice,
		salePrice
	FROM products
	WHERE 
		(id = @id or @id IS NULL) AND
		(name = @name or @name IS NULL) AND
		(barcode = @barcode or @barcode IS NULL)
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
ASp
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
        INSERT INTO #error (ErrorMessage) VALUES('Fornecedor não pode ser excluido porque existe um produto atrelado a ele.');
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
