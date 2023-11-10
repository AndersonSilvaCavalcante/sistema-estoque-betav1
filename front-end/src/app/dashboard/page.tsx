//TODO ao abrir aplicativo caso tenha produtos com estoque acionar toast.info
"use client"
import ContainerCustom from "@/components/Container"
import LottieFilesComponent from "@/components/LottieFilesComponent"
import PageHeader from "@/components/PageHeader"
import { Box, Card, Skeleton, Typography } from "@mui/material"
import { NextPage } from "next"
import React, { useEffect, useState } from "react"


/**Animations */
import emptyAnimation from "@/assets/animations/lottie/empty_animation.json"
import CardCustom from "@/components/Card"
import DashboardService from "@/actions/dashboard"
import TableCustom from "@/components/TableCustom"

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
                { title: "Serviços Concluídos", value: data[0].qtdOrderService },
                { title: "Receita", value: 'R$' + data[0].revenue },
                { title: "Lucro", value: 'R$' + data[0].profit }
            ])
        } catch { }
    }

    const getNoticeProducts = async () => {
        try {
            const { data } = await DashboardService.getNoticeProducts()
            setProducts(data)
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
            <PageHeader title="Dashboard" />
            <ContainerCustom title="Resumo do dia">
                <div className="d-grid">
                    {resumeDay && resumeDay.map(resume => (
                        <CardCustom>
                            <p>{resume.title}</p>
                            <p>{resume.value}</p>
                        </CardCustom>
                    ))}

                    {!resumeDay && Array.from(new Array(4)).map(e => (
                        <CardCustom>
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
                />
            </ContainerCustom>
            <ContainerCustom title="Relatórido de entrada e saída">
                <TableCustom
                    data={recordStock}
                    titles={titlesRecordStock}
                />
            </ContainerCustom>
        </React.Fragment>
    )
}
export default Dashboard