//TODO ao abrir aplicativo caso tenha produtos com estoque acionar toast.info
"use client"
import ContainerCustom from "@/components/Container"
import PageHeader from "@/components/PageHeader"
import { Skeleton } from "@mui/material"
import { NextPage } from "next"
import React, { useEffect, useState } from "react"


/**Animations */
import CardCustom from "@/components/Card"
import DashboardService from "@/actions/dashboard"
import TableCustom from "@/components/TableCustom"
import { toast } from "react-toastify"
import moment from "moment"

import "../../assets/css/dashboard.scss"


interface IResumeDay {
    title: string
    value: number
}

interface IRecordStock {
    id: number,
    name: string,
    type: string,
    qtdChange: number,
    newQtd: number,
    dateCreated: Date
}



const titles: Array<ITitles> = [
    { label: "Nome", value: 'name' },
    { label: "Estoque Mínimo", value: 'qtdMin' },
    { label: "Estoque Atual", value: 'qtdCurrent' },
]

const titlesRecordStock: Array<ITitles> = [
    { label: "Nome", value: 'name' },
    { label: "Tipo", value: 'type' },
    { label: "Quantidade Antiga", value: 'oldQtd' },
    { label: "Quantidade Alterada", value: 'qtdChange' },
    { label: "Nova Quantidade", value: 'newQtd' },
    { label: "Data", value: 'dateCreated', date: true },
]


const Dashboard: NextPage = () => {

    const [resumeDay, setResumeDay] = useState<Array<IResumeDay> | null>(null)
    const [products, setProducts] = useState<Array<IProduct> | null>(null)
    const [recordStock, setRecordStock] = useState<Array<IRecordStock> | null>(null)

    const getResumeDay = async () => {
        try {
            const { data } = await DashboardService.getDashboard()
            setResumeDay([
                { title: "Vendas", value: data[0].qtdSales },
                // { title: "Serviços Concluídos", value: data[0].qtdOrderService },
                { title: "Faturamento", value: 'R$' + parseFloat(data[0].revenue).toFixed(2) },
                { title: "Lucro Líquido", value: 'R$' + parseFloat(data[0].profit).toFixed(2) },
                { title: "Investimento", value: 'R$' + parseFloat(data[0].investment).toFixed(2) },
                { title: "Despesas", value: 'R$' + parseFloat(data[0].expenses).toFixed(2) },
                { title: "Caixa", value: 'R$' + parseFloat(data[0].box).toFixed(2) },
            ])
        } catch { }
    }

    const getNoticeProducts = async () => {
        try {
            const { data } = await DashboardService.getNoticeProducts()
            setProducts(data)
            data.length > 0 && toast.warning(`Há ${data.length} produtos com estoque baixo!`, { draggable: false })
        } catch { }
    }

    const getRecordStock = async () => {
        try {
            const { data } = await DashboardService.getRecordStock()
            setRecordStock(data)
        } catch { }
    }

    useEffect(() => {
        getResumeDay()
        getNoticeProducts()
        getRecordStock()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Painel Administrativo" />
            <ContainerCustom title={`Resumo do dia ${moment(new Date()).format("MMMM/YYYY")}`}>
                <div className="resume-day-grid">
                    {resumeDay && resumeDay.map((resume, index: number) => (
                        <CardCustom key={index}>
                            <p>{resume.title}</p>
                            <p>{resume.value}</p>
                        </CardCustom>
                    ))}

                    {!resumeDay && Array.from(new Array(6)).map((e, index: number) => (
                        <CardCustom key={index}>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </CardCustom>
                    ))}
                </div>
            </ContainerCustom>
            <ContainerCustom title="Avisos do estoque">
                <TableCustom
                    data={products}
                    titles={titles}
                    addStock={true}
                />
            </ContainerCustom>
            <ContainerCustom title="Relatório de entrada e saída">
                <TableCustom
                    data={recordStock}
                    titles={titlesRecordStock}
                />
            </ContainerCustom>
        </React.Fragment>
    )
}
export default Dashboard