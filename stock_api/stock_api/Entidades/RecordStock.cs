namespace stock_api.Entidades
{
    public class RecordStock
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int QtdChange { get; set; }
        public int NewQtd { get; set; }
        public int OldQtd { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
