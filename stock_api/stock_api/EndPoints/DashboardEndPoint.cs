﻿using Microsoft.AspNetCore.Mvc;
using stock_api.Entidades;
using System.Text.Json;

namespace stock_api.EndPoints
{
    public static class DashboardEndPoint
    {
        public static void MapDashboardEndPoint(this WebApplication app)
        {
            //app.MapGet("ListDashboard", async () => {
            //    List<ParametroValor> pv = new List<ParametroValor>();
            //    return Persistencia.ExecutarSql<Dashboard>(@"get_dashboard", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            //}).WithTags("dashboard");

            app.MapGet("ResumeDay", async () => {
                List<ParametroValor> pv = new List<ParametroValor>();
                return Persistencia.ExecutarSql<Dashboard>(@"get_resumeDay", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("dashboard");

            app.MapGet("ResumeMonth", async () => {
                List<ParametroValor> pv = new List<ParametroValor>();
                return Persistencia.ExecutarSql<Dashboard>(@"get_resumeMonth", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("dashboard");

            app.MapGet("ListNoticeProducts", async () => {
                List<ParametroValor> pv = new List<ParametroValor>();
                return Persistencia.ExecutarSql<Products>(@"get_noticeProducts", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("dashboard");

            app.MapGet("ListRecordStock", async () => {
                List<ParametroValor> pv = new List<ParametroValor>();
                return Persistencia.ExecutarSql<RecordStock>(@"get_recordStock", pv, tipoconsulta: TipoConsulta.STORED_PROCEDURE).ToList();
            }).WithTags("dashboard");
        }
    }
}