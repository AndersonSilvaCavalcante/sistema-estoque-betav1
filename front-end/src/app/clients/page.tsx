"use client"
import Client from "@/actions/client";
import { ButtonPlus } from "@/components/ButtonPlus";
import ContainerCustom from "@/components/Container";
import { CustomTextInput } from "@/components/CustomInputs";
import Filter from "@/components/Filter";
import PageHeader from "@/components/PageHeader";
import TableCustom from "@/components/TableCustom";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const titles: Array<ITitles> = [
    { label: "Data Criação", value: 'dateCreated', date: true },
    { label: "Data de Atualização", value: 'dateUpdated', date: true },
    { label: "Nome", value: 'name' },
    { label: "Contato", value: 'phone' }
    // { label: "Modelo", value: 'model' },
    // { label: "Placa", value: 'plate' }
]

export interface IFilter {
    id?: number
    name?: string
}

const Clients: NextPage = () => {
    const router = useRouter()
    const [clients, setClients] = useState<Array<ICLient> | null>(null)
    const initialFIlter: IFilter = { name: '' }
    const [filter, setFilter] = useState<IFilter>(initialFIlter)

    const getClientsList = async (clean?: boolean) => {
        try {
            const { data } = await Client.getListClients(clean ? initialFIlter : filter)
            setClients(data)
        } catch (error) {

        }
    }

    const editClientPage = (data: IProduct) => {
        router.replace(`/clients/form/edit/${data.id}`)
    }
    const cleanFilters = () => {
        setFilter(initialFIlter)
        getClientsList(true)
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorInput(false)
        const name = e.target.name
        const value = e.target.value
        setFilter({ ...filter, [name]: value })
    }

    useEffect(() => {
        getClientsList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Clientes">
                <ButtonPlus onCLick={() => router.push("/clients/form/register")} title="Cadastrar Cliente" />
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getClientsList(false)}>
                <CustomTextInput value={filter?.name} label={"Nome"} name={"name"} changeFunction={changeValues} />
            </Filter>
            <ContainerCustom>
                <TableCustom
                    data={clients}
                    titles={titles}
                    edit={true}
                    remove={false}
                    editFunction={editClientPage}
                // removeFunction={deleteSupplier}
                />
            </ContainerCustom>
        </React.Fragment>
    )
}

export default Clients