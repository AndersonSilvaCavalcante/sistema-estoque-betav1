using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;

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

            
        }
    }
}