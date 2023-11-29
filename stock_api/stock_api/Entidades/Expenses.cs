namespace stock_api.Entidades
{
    public class Expenses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
        public DateTime DatePortion { get; set; }
        public List<PortionsList> Portions { get; set; }
    }

    public class PortionsList
    {
        public DateTime DatePortion { get; set; }
    }
}
