'use client'
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "../SideBar";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Header = () => {
    const [toggle, setOpen] = useState<boolean>(false);
    const handleToggle = () => setOpen(!toggle);
    const router = useRouter()

    const goPath = (path: string) => {
        router.replace(path)
    }

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'white' }}>
            <Container sx={{ minWidth: '95vw' }}>
                <Toolbar>
                    <IconButton
                        onClick={() => handleToggle()}
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 0.5 }}
                    >
                        <MenuIcon />
                        <SideBar toggle={toggle} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Image src={"/logo_criselegance_no_bg.svg"} alt={"Logo"} width={120} height={80} onClick={() => goPath("/dashboard")} className="c-pointer" />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header