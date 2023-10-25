namespace stock_api.Entidades
{
    public class Sales
    {
        public int Id { get; set; }
        public List<ProductsList> Products { get; set; }
        public int Qtd { get; set; }
        public int ClientId { get; set; }
        public float Value { get; set; }
        public string ClientName { get; set; }
        public float Discount { get; set; }
        public DateTime DateCreated { get; set; }


    }

    public class ProductsList
    {
        public int productId { get; set; }
        public int newQtd { get; set; }
        public int qtdChange { get; set; }
        public int totalCostPrice { get; set; }
        public int valueTotal { get; set; }
        public int totalCurrentPrice { get; set; }
        public int discont { get; set; }

        
    }
}
