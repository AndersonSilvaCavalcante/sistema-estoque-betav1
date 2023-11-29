"use client"

/**Dependencies */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**Components */
import PageHeader from "@/components/PageHeader";
import { SelectChangeEvent } from "@mui/material";
import Filter from "@/components/Filter";
import { toast } from "react-toastify";
import { ButtonPlus } from "@/components/ButtonPlus";
import ExpenseService from "@/actions/expenses";

export interface IFilter {
    id?: number
    name?: string,
    barcode?: string,
    supplierId?: number,
    status?: string
}

const Products: NextPage = () => {
    const router = useRouter()
    const initialFIlter: IFilter = { name: '', barcode: '', status: 'todos' }
    const [filter, setFilter] = useState<IFilter>(initialFIlter)

    const getExpenses = async (clean?: boolean) => {
        try {
            const { data } = await ExpenseService.getListExpenseS()
            const dates: Array<string> = data.map((d: IExpense) => d.datePortion)
            const uniques = dates.filter((d, i) => dates.indexOf(d) === i);
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const cleanFilters = () => {
        setFilter(initialFIlter)
        getExpenses(true)
    }

    const changeFilterValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const name = e.target.name
        const value = e.target.value
        setFilter({ ...filter, [name]: value })
    }

    useEffect(() => {
        getExpenses()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Despesas">
                <ButtonPlus onCLick={() => router.push("/expenses/form/register")} title="Cadastrar Despesa" />
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getExpenses(false)}>

            </Filter>
        </React.Fragment>
    )
}

export default Products