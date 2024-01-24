"use client"
import { Box, Container } from "@mui/material"
import { ToastContainer } from "react-toastify"
import Header from "../Layout/Header"
import React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment"
import "dayjs/locale/pt-br";

const ApplicationView = ({
    children,
}: {
    children: React.ReactNode
}) => {
    //Configurações da Aplicação
    moment.updateLocale('pt', {
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    })

    return (
        <React.Fragment>
            <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
                <Header />
                <ToastContainer theme="colored" />
                <Container sx={{ minWidth: '90vw' }}>
                    <Box pt={3} pb={3}>
                        {children}
                    </Box>
                </Container>
            </LocalizationProvider>
        </React.Fragment>
    )
}

export default ApplicationView