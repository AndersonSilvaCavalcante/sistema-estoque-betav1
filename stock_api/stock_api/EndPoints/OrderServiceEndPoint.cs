using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;

namespace stock_api.EndPoints
{
    public static class OrderServiceEndPoint
    {
        public static void MapOrderServiceEndPoint(this WebApplication app)
        {
            app.MapGet("ListOrderService", async ( string? status, string? plateOrOrder) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@status", status));
                pv.Add(new ParametroValor("@plateOrOrder", plateOrOrder));
                return Persistencia.ExecutarSql<Products>(@"get_OrderService", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("orderService");

            app.MapPost("SaveOrderService", async ([FromBody] OrderService orderService) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@clientId", orderService.ClientId));
                pv.Add(new ParametroValor("@services", orderService.Services));
                pv.Add(new ParametroValor("@comments", orderService.Comments));
                Persistencia.ExecutarSqlSemRetorno(@"post_OrderService", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("orderService"); 
            
            app.MapPut("CloseOrderService", async (Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@Id", id));
                Persistencia.ExecutarSqlSemRetorno(@"closeOrderService", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("orderService");
        }
    }
}