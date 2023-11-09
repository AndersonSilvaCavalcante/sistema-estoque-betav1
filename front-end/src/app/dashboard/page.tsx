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

interface IResumeDay {
    title: string
    value: number
}

const Dashboard: NextPage = () => {

    const [resumeDay, setResumeDay] = useState<Array<IResumeDay> | null>(null)

    const getResumeDay = async () => {
        try {
            const { data } = await DashboardService.getDashboard()
            setResumeDay([
                { title: "Vendas", value: data[0].qtdSales },
                { title: "Serviços Concluídos", value: data[0].qtdOrderService },
                { title: "Receita", value: data[0].revenue },
                { title: "Lucro", value: data[0].profit }
            ])
        } catch { }
    }

    useEffect(() => {
        getResumeDay()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Dashboard" />
            <ContainerCustom title="Resumo do dia">
                <div className="d-grid">
                    {resumeDay && resumeDay.map(resume => (
                        <CardCustom>
                            <p>{resume.title}</p>
                            <p>R$ {resume.value}</p>
                        </CardCustom>
                    ))}

                    {!resumeDay && Array.from(new Array(4)).map(e => (
                        <CardCustom>
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                        </CardCustom>
                    ))}
                </div>
                {/* <Box mt={4}>
                    <Box mt={5} mb={5} sx={{
                        display: 'grid',
                        placeItems: 'center',
                        textAlign: 'center'
                    }}>
                        <Box>
                            <LottieFilesComponent animation={emptyAnimation} loop={true} />
                            <Typography variant={"h5"} component={"p"}>Não há dados suficientes para gerar relatório</Typography>
                        </Box>
                    </Box>
                </Box> */}
            </ContainerCustom>
            <ContainerCustom title="Avisos do estoque">
                <Box mt={4}>
                    <Box mt={5} mb={5} sx={{
                        display: 'grid',
                        placeItems: 'center',
                        textAlign: 'center'
                    }}>
                        <Box>
                            <LottieFilesComponent animation={emptyAnimation} loop={true} />
                            <Typography variant={"h5"} component={"p"}>Não há dados suficientes para gerar relatório</Typography>
                        </Box>
                    </Box>
                </Box>
            </ContainerCustom>
        </React.Fragment>
    )
}
export default Dashboard