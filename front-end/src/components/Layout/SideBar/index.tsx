/**Dependencies */
import React, { useEffect } from "react";

/**Components */
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Image from "next/image"
import Link from "next/link";

/**Icons */
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
        }, {
            name: "Configurações",
            path: "/settings"
        }, {
            name: "Sobre",
            path: "/about"
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <Box flexGrow={1}>
                    <Image src={"/logo_supermotos_no_bg.svg"} alt={""} width={120} height={80} />
                </Box>
                <IconButton onClick={() => setState(false)}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {menuOptions.map((option: any, index: number) => (
                    <Link href={option.path} key={option.name}>
                        <ListItem disablePadding>
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