namespace stock_api.Entidades
{
    public class OrderService
    {
        public int Order { get; set; }
        public DateTime DateCreated { get; set; }
        public string Plate { get; set; }
        public string Status { get; set; }
        public DateTime DateClosed { get; set; }
        public int ClientId { get; set; }
        public string Services { get; set; }
        public string Comments { get; set; }
    }
}
