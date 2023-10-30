"use client"
/**Dependencies */
import { NextPage } from "next"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

/**Components */
import Filter from "@/components/Filter"
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import { ButtonPlus } from "@/components/ButtonPlus"
import ContainerCustom from "@/components/Container"
import { CustomTextInput } from "@/components/CustomInputs"

/**Service */
import SalesService from "@/actions/sales";


const titles: Array<ITitles> = [
    { label: "N° da venda", value: 'id' },
    { label: "Data da Venda", value: 'dateCreated', date: true },
    { label: "Nome do Cliente", value: 'clientName' },
    { label: "Valor", value: 'value', valuePrefix: "currency" }
]

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
            <PageHeader title="Vendas">
                <ButtonPlus onCLick={() => router.push("/sales/form")} title="Cadastrar Venda" />
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