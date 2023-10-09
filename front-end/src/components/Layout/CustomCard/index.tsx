"use client"

import { Card, CardContent, Container, Typography } from "@mui/material"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const CustomCard = () => {
    return (
        <Card sx={{ boxShadow: '1px 1px 5px' }}>
            <CardContent >
                <Container>
                    <ShoppingBagIcon fontSize="medium" />
                    <Typography variant="h4" component="p">
                        26
                    </Typography>
                    <Typography component="p">
                        Vendas Realizadas
                    </Typography>
                    {/*children*/}
                    <Typography>
                        {/*footer */}
                    </Typography>
                </Container>
            </CardContent>
        </Card>
    )
}

export default CustomCard