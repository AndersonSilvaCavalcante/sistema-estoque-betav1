using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;

namespace stock_api.EndPoints
{
    public static class ServicesEndPoint
    {
        public static void MapServicesEndPoint(this WebApplication app)
        {
            app.MapGet("ListServices", async (Int32? id, string? name) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", id));
                pv.Add(new ParametroValor("@name", name));
                return Persistencia.ExecutarSql<Services>(@"get_services", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("services");

            app.MapPost("SaveServices", async ([FromBody] Services service) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", service.Name));
                pv.Add(new ParametroValor("@costPrice", service.CostPrice));
                pv.Add(new ParametroValor("@salePrice", service.SalePrice));
                Persistencia.ExecutarSqlSemRetorno(@"post_services", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("services"); 
            
            app.MapPut("EditServices", async ([FromBody] Services service, Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", service.Name));
                pv.Add(new ParametroValor("@costPrice", service.CostPrice));
                pv.Add(new ParametroValor("@salePrice", service.SalePrice));
                pv.Add(new ParametroValor("@Id", id));
                Persistencia.ExecutarSqlSemRetorno(@"put_services", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("services");

            app.MapDelete("DeleteServices", async (Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@Id", id));
                Persistencia.ExecutarSqlSemRetorno(@"delete_services", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("services");

        }
    }
}