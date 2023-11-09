using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;
using System.Text.Json;

namespace stock_api.EndPoints
{
    public static class DashboardEndPoint
    {
        public static void MapDashboardEndPoint(this WebApplication app)
        {
            app.MapGet("ListDashboard", async () => {
                List<ParametroValor> pv = new List<ParametroValor>();
                return Persistencia.ExecutarSql<Dashboard>(@"get_dashboard", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("dashboard");
        }
    }
}