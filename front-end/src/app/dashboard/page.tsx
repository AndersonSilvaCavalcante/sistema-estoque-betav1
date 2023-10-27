//TODO ao abrir aplicativo caso tenha produtos com estoque acionar toast.info
"use client"
import ContainerCustom from "@/components/Container"
import LottieFilesComponent from "@/components/LottieFilesComponent"
import PageHeader from "@/components/PageHeader"
import { Box, Typography } from "@mui/material"
import { NextPage } from "next"
import React from "react"


/**Animations */
import emptyAnimation from "@/assets/animations/lottie/empty_animation.json"

const Dashboard: NextPage = () => {
    return (
        <React.Fragment>
            <PageHeader title="Dashboard" />
            <ContainerCustom title="Resumo do dia">
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