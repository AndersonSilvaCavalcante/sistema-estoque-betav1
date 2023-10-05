using stock_api.Entidades;

namespace stock_api.EndPoints
{
    public static class ProductsEndPoint
    {
        public static void MapProductsEndPoint(this WebApplication app)
        {
            app.MapGet("ListProducts", async (Int32? id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@Id", id));
                return Persistencia.ExecutarSql<Products>(@"get_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("products");

            app.MapPost("SaveProducts", async (Products products) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", products.Name));
                pv.Add(new ParametroValor("@barcode", products.Barcode));
                pv.Add(new ParametroValor("@supplierId", products.SupplierId));
                pv.Add(new ParametroValor("@qtdMin", products.QtdMin));
                pv.Add(new ParametroValor("@qtdCurrent", products.QtdCurrent));
                pv.Add(new ParametroValor("@costPrice", products.CostPrice));
                pv.Add(new ParametroValor("@salePrice", products.SalePrice));
                Persistencia.ExecutarSqlSemRetorno(@"post_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("products");
        }
    }
}