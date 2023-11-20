"use client"
/**Dependencies */
import { NextPage } from "next"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

/**Components */
import Filter from "@/components/Filter"
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import ContainerCustom from "@/components/Container"
import { CustomTextInput } from "@/components/CustomInputs"
import { Button } from "@mui/material";

/**Service */
import SalesService from "@/actions/sales";

/**Icons */
import SaveIcon from '@mui/icons-material/Save';
import { CustomPopup } from "@/components/Popups";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { ButtonPlus } from "@/components/ButtonPlus";

const titles: Array<ITitles> = [
    { label: "Data da Venda", value: 'dateCreated', date: true },
    { label: "N° da venda", value: 'id' },
    { label: "Nome do Cliente", value: 'clientName' },
    { label: "Custo da venda", value: 'valueCostPrice', valuePrefix: "currency" },
    { label: "Total Sem Desconto", value: 'valueBeforeDIscount', valuePrefix: "currency" },
    { label: "Desconto", value: 'discount', valuePrefix: "currency" },
    { label: "Total Com Desconto", value: 'value', valuePrefix: "currency" }
]


const titlesReceipt: Array<ITitles> = [
    { label: "Produto", value: 'ProductName' },
    { label: "Quantidade", value: 'QtdChange' },
    { label: "Preço Unitário", value: 'CurrentPrice', valuePrefix: "currency" },
    { label: "Total", value: 'TotalCurrentPrice', valuePrefix: "currency" }
]


const Sales: NextPage = () => {
    const [salesList, setSalesList] = useState<Array<ISale> | null>(null)
    const [filter, setFilter] = useState<number | undefined>(undefined)

    const [openReceipt, setOpenReceipt] = useState<boolean>(false)
    const [productSelected, setProductSelected] = useState<IProduct>()

    const router = useRouter()

    const returnSalesList = async (clean?: boolean) => {
        try {
            const { data } = await SalesService.getListSales(clean ? undefined : filter)
            setSalesList(data)
        } catch { }
    }

    const cleanSales = () => {
        setFilter(undefined)
        returnSalesList(true)
    }

    const viewReceipt = (data: ISale) => {
        setProductSelected(JSON.parse(data.productsString))
        setOpenReceipt(true)
    }

    useEffect(() => {
    }, [filter])

    useEffect(() => {
        returnSalesList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Vendas">
                <ButtonPlus onCLick={() => router.push("/sales/form")} title="Realizar Venda" />
            </PageHeader>
            <Filter cleanFunction={cleanSales} filterFucntion={() => returnSalesList(false)}>
                <CustomTextInput value={filter} type="nunber" label={"N° de venda"} name={"codigoVenda"} changeFunction={(e) => setFilter(parseInt(e.target.value))} />
            </Filter>
            <ContainerCustom>
                <TableCustom
                    data={salesList}
                    titles={titles}
                    view={true}
                    viewFunction={viewReceipt}
                />
            </ContainerCustom>
            <CustomPopup
                toggle={openReceipt}
                title={"Visualizar Recibo"}
                confirmButtonTitle="Salvar"
                confirmButtonIcon={<SaveIcon />}
                confirmAction={() => setOpenReceipt(false)}
                cancelFunction={() => setOpenReceipt(false)}
            >
                <TableCustom
                    data={productSelected}
                    titles={titlesReceipt}
                />
            </CustomPopup>
        </React.Fragment>
    )
}

export default Sales