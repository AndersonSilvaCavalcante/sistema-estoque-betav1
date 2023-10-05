import { Box, Card, CardContent, Grid } from "@mui/material"

const Dashboard = () => {
    return (
        <Box sx={{ color: 'white' }}>
            <Box mt={2} sx={{ backgroundColor: 'green', borderRadius: '20px' }} p={2}>
                <header>
                    <p className="title">Resumo do dia</p>
                </header>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2} sx={{ backgroundColor: 'purple', borderRadius: '20px' }} p={2}>
                <header>
                    <p className="title">Avisos do estoque</p>
                </header>
                <Box className="grid-container" pt={2}>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
            <Box mt={2} sx={{ backgroundColor: 'blue', borderRadius: '20px' }} p={2}>
                <header>
                    <p className="title">Ultimas entradas/ saídas</p>
                </header>
                <Box className="grid-container" pt={2}>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                    <Box sx={{ minWidth: 275 }} className="grid-item">
                        <Card>
                            <CardContent >
                                <p>Teste</p>
                                {/*icon*/}
                                {/*tile*/}
                                {/*description*/}
                                {/*children*/}
                                {/*footer */}
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Dashboard