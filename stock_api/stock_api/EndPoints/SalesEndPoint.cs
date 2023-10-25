using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;
using System.Text.Json;

namespace stock_api.EndPoints
{
    public static class SalesEndPoint
    {
        public static void MapSalesEndPoint(this WebApplication app)
        {
            app.MapGet("ListSales", async (Int32? id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", id));
                return Persistencia.ExecutarSql<Sales>(@"get_sales", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("sales");

            app.MapPost("SaveSales", async ([FromBody] Sales sales) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@clientId", sales.ClientId));
                pv.Add(new ParametroValor("@discount", sales.Discount));
                pv.Add(new ParametroValor("@products", JsonSerializer.Serialize(sales.Products)));
                pv.Add(new ParametroValor("@value", sales.Value));
            Persistencia.ExecutarSqlSemRetorno(@"post_sales", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("sales");
        }
    }
}