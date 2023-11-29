using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;
using System.Text.Json;

namespace stock_api.EndPoints
{
    public static class ExpensesEndPoint
    {
        public static void MapExpensesEndPoint(this WebApplication app)
        {
            app.MapGet("ListExpenses", async () => {
                List<ParametroValor> pv = new List<ParametroValor>();
                return Persistencia.ExecutarSql<Expenses>(@"get_expenses", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("expenses");

            app.MapPost("SaveExpenses", async ([FromBody] Expenses expenses) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", expenses.Name));
                pv.Add(new ParametroValor("@value", expenses.Value));
                pv.Add(new ParametroValor("@portions", JsonSerializer.Serialize(expenses.Portions)));
                Persistencia.ExecutarSqlSemRetorno(@"post_expenses", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("expenses");
        }
    }
}