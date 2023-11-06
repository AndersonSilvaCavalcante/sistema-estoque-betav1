namespace stock_api.Entidades
{
    public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public int SupplierId { get; set; }
        public string? SupplierName { get; }
        public int QtdMin { get; set; }
        public int QtdCurrent { get; set; }
        public float CostPrice { get; set; }
        public float SalePrice { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}