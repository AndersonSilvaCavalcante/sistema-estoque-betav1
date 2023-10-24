using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Server.IISIntegration;
using stock_api;
using stock_api.EndPoints;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("https://localhost:3000", "http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
}));
builder.Services.AddAuthentication(IISDefaults.AuthenticationScheme);

var app = builder.Build();

app.MapProductsEndPoint();
app.MapSupplierEndPoint();
app.MapServicesEndPoint();
app.MapOrderServiceEndPoint();
app.MapClientsEndPoint();
app.MapSalesEndPoint();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("corsapp");
app.MapFallbackToFile("index.html");
Persistencia.SetarConnStr(Confs.GetConnectionString(app));

app.Run();


public static class Confs
{
    private const string configFile = @"\conn\connections.json";

    public static string GetConnectionString(WebApplication app)
    {
        string connStr = app.Configuration.GetConnectionString("db_stock");

        if (File.Exists(System.AppDomain.CurrentDomain.BaseDirectory + configFile))
        {
            connStr = File.ReadAllText(System.AppDomain.CurrentDomain.BaseDirectory + configFile).Trim();
        }

        return connStr;
    }
}
