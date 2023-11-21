namespace stock_api.Entidades
{
    public class Sales
    {
        public int Id { get; set; }
        public List<ProductsList> Products { get; set; }
        public int ClientId { get; set; }
        public float Value { get; set; }
        public string ClientName { get; set; }
        public string ProductsString { get; set; }
        public float Discount { get; set; }
        public float? ValueBeforeDIscount { get; set; }
        public float? ValueCostPrice { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public string paymentForm { get; set; }
        public int  amountPaid { get; set; }
        public int customerChangeCash { get; set; }
        public int paymentInstallments { get; set; }
    }

    public class ProductsList
    {
        public int ProductId { get; set; }
        public int OldQtd { get; set; }
        public string ProductName { get; set; }
        public int NewQtd { get; set; }
        public int QtdChange { get; set; }
        public float TotalCostPrice { get; set; }
        public float TotalCurrentPrice { get; set; }
        public float CurrentPrice { get; set; }

        
    }
}
