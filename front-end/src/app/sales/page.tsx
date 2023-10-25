"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Components */
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"

/**Icons */
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from '@mui/icons-material/FilterList';
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import ContainerCustom from "@/components/Container"
import Link from "next/link"
import SalesService from "@/actions/sales";

const titles: Array<ITitles> = [
    { label: "N° da venda", value: 'id' },
    { label: "Data da Venda", value: 'dateCreated' },
    { label: "Nome do Cliente", value: 'clientName' },
    { label: "Valor", value: 'value' }
]

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    '& .MuiTextField-root': { m: 1, width: '25ch' }
};


const Sales: NextPage = () => {
    const [salesList, setSalesList] = useState<Array<ISale>>([])
    const [filter, setFilter] = useState<number | string>('')

    const returnSalesList = async (clean?: boolean) => {
        try {
            const { data } = await SalesService.getListSales(clean ? '' : filter)
            setSalesList(data)
        } catch { }
    }

    const cleanSales = () => {
        setFilter('')
        returnSalesList(true)
    }
    useEffect(() => {
    }, [filter])

    useEffect(() => {
        returnSalesList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Vendas Realizadas">
                <Link href="/sales/form">
                    <Button color="success" variant="outlined" endIcon={<SaveIcon />}>Nova Venda</Button>
                </Link>
            </PageHeader>
            <ContainerCustom title="Filtrar">
                <Box mb={2} mt={2}>
                    <TextField value={filter} onChange={(e) => setFilter(parseInt(e.target.value))} label="Codigo de venda" size="small" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => cleanSales()} color="error" variant="outlined" endIcon={<CloseIcon />}>Limpar</Button>
                        <Button onClick={() => returnSalesList()} color="success" variant="outlined" endIcon={<FilterListIcon />}>Filtrar</Button>
                    </Stack>
                </Box>
            </ContainerCustom>
            <ContainerCustom>
                <TableCustom
                    data={salesList}
                    titles={titles}
                />
            </ContainerCustom>
        </React.Fragment>
    )
}

export default Sales