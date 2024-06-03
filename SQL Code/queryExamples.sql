SELECT * FROM ServiceTransaction;

--To apply filters, such as month = 5 (May) or PropertyID = 4:
SELECT * 
FROM ServiceTransaction
WHERE MONTH(TransactionDate) = 5;

SELECT * 
FROM Property
WHERE PropertyID = 4;

