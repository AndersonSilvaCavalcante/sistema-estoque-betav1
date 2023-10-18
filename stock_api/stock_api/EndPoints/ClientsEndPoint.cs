using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;

namespace stock_api.EndPoints
{
    public static class ClientsEndPoint
    {

        public static void MapClientsEndPoint(this WebApplication app)
        {
            app.MapGet("ListClient", async (Int32? id, string? name, string? plate) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", id));
                pv.Add(new ParametroValor("@name", name));
                pv.Add(new ParametroValor("@plate", plate));
                return Persistencia.ExecutarSql<Clients>(@"get_Client", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("clients");

            app.MapPost("SaveClient", async ([FromBody] Clients clients) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", clients.Name));
                pv.Add(new ParametroValor("@phone", clients.Phone));
                pv.Add(new ParametroValor("@plate", clients.Plate));
                pv.Add(new ParametroValor("@model", clients.Model));
                Persistencia.ExecutarSqlSemRetorno(@"post_Clients", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("clients");

            app.MapPut("EditClient", async ([FromBody] Clients clients) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", clients.Id));
                pv.Add(new ParametroValor("@name", clients.Name));
                pv.Add(new ParametroValor("@phone", clients.Phone));
                pv.Add(new ParametroValor("@plate", clients.Plate));
                pv.Add(new ParametroValor("@model", clients.Model));
                Persistencia.ExecutarSqlSemRetorno(@"put_Clients", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("clients");


            app.MapDelete("DeletClient", async (Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", id));

                var erro = Persistencia.ExecutarSql<Error>(@"delete_client", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);

                if (erro.Count() != 0)
                {
                    return Results.BadRequest(erro);
                }

                return Results.Ok();
            }).WithTags("clients");
        }

    }
}
