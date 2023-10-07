using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;

namespace stock_api.EndPoints
{
    public static class SupplierEndPoint
    {
        public static void MapSupplierEndPoint(this WebApplication app)
        {
            app.MapGet("ListSupplier", async (Int32? id, string? name) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@=id", id));
                pv.Add(new ParametroValor("@name", name));
                return Persistencia.ExecutarSql<Supplier>(@"get_supplier", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("supplier");

            app.MapPost("SaveSupplier", async ([FromBody] Supplier supplier) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", supplier.Name));
                pv.Add(new ParametroValor("@contact", supplier.Contact));
                Persistencia.ExecutarSqlSemRetorno(@"post_supplier", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("supplier"); 
            
            app.MapPut("EditSupplier", async ([FromBody] Supplier supplier, Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", supplier.Name));
                pv.Add(new ParametroValor("@contact", supplier.Contact));
                pv.Add(new ParametroValor("@id", id));
                Persistencia.ExecutarSqlSemRetorno(@"put_supplier", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("supplier");

            app.MapDelete("DeletSupplier", async (Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", id));

                var  erro = Persistencia.ExecutarSql<Error>(@"delete_supplier", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);

                if(erro.Count() != 0)
                {
                    return Results.BadRequest(erro);
                }

                return Results.Ok();
            }).WithTags("supplier");

        }
    }
}