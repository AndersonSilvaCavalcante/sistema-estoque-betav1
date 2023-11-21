﻿using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;

namespace stock_api.EndPoints
{
    public static class ProductsEndPoint
    {
        public static void MapProductsEndPoint(this WebApplication app)
        {
            app.MapGet("ListProducts", async (Int32? id, string? name, string? barcode, int? supplierId, string? status) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@id", id));
                pv.Add(new ParametroValor("@barcode", barcode));
                pv.Add(new ParametroValor("@supplierId", supplierId));
                pv.Add(new ParametroValor("@name", name));
                pv.Add(new ParametroValor("@supplierId", supplierId));
                pv.Add(new ParametroValor("@status", status));
                return Persistencia.ExecutarSql<Products>(@"get_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("products");

            app.MapPost("SaveProducts", async ([FromBody] Products products) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", products.Name));
                pv.Add(new ParametroValor("@barcode", products.Barcode));
                pv.Add(new ParametroValor("@supplierId", products.SupplierId));
                pv.Add(new ParametroValor("@qtdMin", products.QtdMin));
                pv.Add(new ParametroValor("@qtdCurrent", products.QtdCurrent));
                pv.Add(new ParametroValor("@costPrice", products.CostPrice));
                pv.Add(new ParametroValor("@salePrice", products.SalePrice));
                pv.Add(new ParametroValor("@type", products.Type));
                pv.Add(new ParametroValor("@oldQtd", products.OldQtd));
                pv.Add(new ParametroValor("@qtdChange", products.QtdChange));
                pv.Add(new ParametroValor("@perProfit", products.PerProfit));
                pv.Add(new ParametroValor("@valueProfit", products.ValueProfit));
                Persistencia.ExecutarSqlSemRetorno(@"post_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("products"); 
            
            app.MapPut("EditProducts", async ([FromBody] Products products, Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@name", products.Name));
                pv.Add(new ParametroValor("@barcode", products.Barcode));
                pv.Add(new ParametroValor("@supplierId", products.SupplierId));
                pv.Add(new ParametroValor("@qtdMin", products.QtdMin));
                pv.Add(new ParametroValor("@qtdCurrent", products.QtdCurrent));
                pv.Add(new ParametroValor("@costPrice", products.CostPrice));
                pv.Add(new ParametroValor("@salePrice", products.SalePrice));
                pv.Add(new ParametroValor("@Id", id));
                pv.Add(new ParametroValor("@type", products.Type));
                pv.Add(new ParametroValor("@oldQtd", products.OldQtd));
                pv.Add(new ParametroValor("@qtdChange", products.QtdChange));
                pv.Add(new ParametroValor("@perProfit", products.PerProfit));
                pv.Add(new ParametroValor("@valueProfit", products.ValueProfit));
                Persistencia.ExecutarSqlSemRetorno(@"put_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("products");

            app.MapDelete("DeleteProducts", async (Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@Id", id));
                Persistencia.ExecutarSqlSemRetorno(@"delete_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("products");
            
            app.MapPut("AlterStatusProducts", async (Int32 id) => {
                List<ParametroValor> pv = new List<ParametroValor>();
                pv.Add(new ParametroValor("@Id", id));
                Persistencia.ExecutarSqlSemRetorno(@"alter_status_products", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE);
            }).WithTags("products");

        }
    }
}