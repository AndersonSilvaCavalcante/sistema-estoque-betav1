import React, { useEffect } from "react";
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Image from "next/image"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const menuOptions =
    [
        {
            name: "Dashboard",
            path: "/dashboard"
        }, {
            name: "Vendas",
            path: "/dashboard"
        }, {
            name: "Ordens de Serviço",
            path: "/orderServices"
        }, {
            name: "Fornecedores",
            path: "/suppliers"
        }, {
            name: "Produtos",
            path: "/products"
        }, {
            name: "Serviços",
            path: "/services"
        }
    ]

interface IProps {
    toggle: boolean
}

const SideBar = ({ toggle }: IProps) => {
    const [state, setState] = React.useState<boolean>(false);

    useEffect(() => {
        setState(toggle);
    }, [toggle])

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <DrawerHeader>
                <Box flexGrow={1}>
                    <Image src={"/logo_supermotos_no_bg.svg"} alt={""} width={120} height={80} />
                </Box>
                <IconButton onClick={() => setState(false)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menuOptions.map((option: any, index: number) => (
                    <Link href={option.path}>
                        <ListItem key={option.name} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={option.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {['Configurações', 'Sobre'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Drawer
            open={state}
        >
            {list()}
        </Drawer>
    );
}
export default SideBar