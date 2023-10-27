//TODO ao abrir aplicativo caso tenha produtos com estoque acionar toast.info
"use client"
import Container from "@/components/Container"
import CustomCard from "@/components/Layout/CustomCard"
import PageHeader from "@/components/PageHeader"
import { Box, Grid } from "@mui/material"
import { NextPage } from "next"
import Link from "next/link"
import React from "react"

const Dashboard: NextPage = () => {
    return (
        <React.Fragment>
            <PageHeader title="Dashboard" />
            <Box mb={4}>

            <Container title="Resumo do dia">
                <Box mt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <CustomCard />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <CustomCard />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <CustomCard />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <CustomCard />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            </Box>
            <Box mb={4}>
            <Container title="Avisos do estoque">
                <Box mt={4}>
                </Box>
            </Container>
            </Box>
        </React.Fragment>
    )
}
export default Dashboard