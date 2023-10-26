"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Components */
import { Button} from "@mui/material"
import Filter from "@/components/Filter"

/**Icons */

import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import ContainerCustom from "@/components/Container"
import SalesService from "@/actions/sales";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import { CustomTextInput } from "@/components/CustomInputs"

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
    const router = useRouter()


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
            <PageHeader title="Fornecedores">
                <Button onClick={() => router.push("/sales/form")} color="success" variant="contained" endIcon={<AddIcon />}>Cadastrar Venda</Button>
            </PageHeader>
            <Filter cleanFunction={cleanSales} filterFucntion={() => returnSalesList(false)}>
                <CustomTextInput value={filter} label={"Codigo de venda"} name={"codigoVenda"} changeFunction={(e) => setFilter(parseInt(e.target.value))} />
            </Filter>
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