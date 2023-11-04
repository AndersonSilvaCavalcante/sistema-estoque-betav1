
alter table sales
add valueBeforeDIscount float null,
	valueCostPrice float null

	

  alter table recordStock
  add currentPrice float default('')
    
CREATE OR ALTER  PROCEDURE post_sales     
 @clientId int,    
 @discount float,    
 @products NVARCHAR(MAX),    
 @value float,
 @valueBeforeDIscount float,
 @valueCostPrice float
AS       
    
 INSERT INTO sales    
           (products    
           ,discount    
           ,clientId    
           ,value
		   ,valueBeforeDIscount
		   ,valueCostPrice
		   )    
     VALUES    
           (@products    
           ,@discount    
           ,@clientId    
           ,@value
		   ,@valueBeforeDIscount
		   ,@valueCostPrice
		   )    
    
declare crProducts cursor    
 for SELECT     
  jsonVariable.*    
  FROM OPENJSON(@products, N'$') WITH (    
  productId int N'$.ProductId',    
  newQtd int N'$.NewQtd',    
  qtdChange int N'$.QtdChange',    
  totalCostPrice float N'$.TotalCostPrice',    
  currentPrice float N'$.CurrentPrice',    
  totalCurrentPrice float N'$.TotalCurrentPrice'    
  ) AS jsonVariable    
    
    
 open crProducts    
    
 declare @productId INTEGER    
 declare @newQtd INTEGER    
 declare @qtdChange INTEGER    
 declare @totalCostPrice float    
 declare @totalCurrentPrice float    
 declare @currentPrice float    
    
 fetch NEXT FROM crProducts into @productId, @newQtd, @qtdChange, @totalCostPrice, @currentPrice, @totalCurrentPrice    
    
 WHILE @@FETCH_STATUS = 0    
 BEGIN    
    
 print @productId    
    
 UPDATE products    
 SET qtdCurrent = @newQtd    
 WHERE id = @productId;     
    
 INSERT INTO recordStock(    
            productId    
           ,type    
           ,newQtd    
           ,qtdChange    
           ,totalCostPrice    
           ,totalCurrentPrice
		   ,currentPrice)    
     VALUES    
           (@productId    
           ,'sale'    
           ,@newQtd    
           ,@qtdChange    
           ,@totalCostPrice    
           ,@totalCurrentPrice
		   ,@currentPrice)    
    
    
 FETCH NEXT FROM crProducts into @productId, @newQtd, @qtdChange, @totalCostPrice, @currentPrice, @totalCurrentPrice  
 END    
 CLOSE crProducts    
 DEALLOCATE crProducts    
 

CREATE OR ALTER  PROCEDURE get_sales   
 @id int  
AS    
 SELECT     
  s.id ,    
  s.dateCreated,    
  s.value,
  s.discount,
  s.valueBeforeDIscount,
  s.valueCostPrice,
  s.products as productsString,
  c.name AS clientName
 FROM sales s   
 INNER JOIN client c ON c.id = s.clientId  
 WHERE     
  (s.id = @id or @id IS NULL) 
