'use client'
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "../SideBar";
const Header = () => {
    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'green' }}>
            <Container sx={{ minWidth: '95vw' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 0.5 }}
                    >
                        <MenuIcon />
                        <SideBar/>
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>
                        <Link href="/dashboard" >
                            <Image src={"/logo_supermotos_no_bg.svg"} alt={""} width={120} height={80} />
                        </Link>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header