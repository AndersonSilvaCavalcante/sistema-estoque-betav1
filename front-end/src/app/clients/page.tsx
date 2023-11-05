"use client"
import Client from "@/actions/client";
import { ButtonPlus } from "@/components/ButtonPlus";
import ContainerCustom from "@/components/Container";
import { CustomTextInput } from "@/components/CustomInputs";
import Filter from "@/components/Filter";
import PageHeader from "@/components/PageHeader";
import TableCustom from "@/components/TableCustom";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const titles: Array<ITitles> = [
    { label: "Data Criação", value: 'dateCreated', date: true },
    { label: "Nome", value: 'name' },
    { label: "Contato", value: 'phone' },
    { label: "Modelo", value: 'model' },
    { label: "Placa", value: 'plate' }
]

export interface IFilter {
    name: string
}

const Clients: NextPage = () => {
    const [clients, setClients] = useState<Array<ICLient>>([])
    const initialFIlter: IFilter = { name: '' }
    const [filter, setFilter] = useState<IFilter>(initialFIlter)

    const getClientsList = async (clean?: boolean) => {
        try {
            const { data } = await Client.getListClients(clean ? initialFIlter : filter)
            setClients(data)
        } catch (error) {

        }
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
                {/* <ButtonPlus onCLick={showSaveNewSupplier} title="Cadastrar Cliente" /> */}
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getClientsList(false)}>
                <CustomTextInput value={filter?.name} label={"Nome"} name={"name"} changeFunction={changeValues} />
            </Filter>
            <ContainerCustom>
                <TableCustom
                    data={clients}
                    titles={titles}
                    edit={false}
                    remove={false}
                // editFunction={showEditSupplier}
                // removeFunction={deleteSupplier}
                />
            </ContainerCustom>
            {/* <ConfirmPopup
                toggle={supplierConfirmPopup.toggle}
                title={supplierConfirmPopup.msg}
                message={"Confirma esta ação?"}
                confirmAction={saveSupplier}
                cancelFunction={() => setSupplierConfirmPopup({ toggle: false, msg: saveSupplierPopupData?.title })}
            />
            <CustomPopup
                toggle={openSupplierPopup}
                title={saveSupplierPopupData?.title}
                confirmButtonTitle="Salvar"
                confirmButtonIcon={<SaveIcon />}
                confirmAction={() => setSupplierConfirmPopup({ toggle: true, msg: saveSupplierPopupData?.title })}
                cancelFunction={handleClose}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gridGap: 20
                }}>
                    <CustomTextInput value={supplier?.name} label={"Nome"} name={"name"} changeFunction={changeSuplierValues} error={errorInput} />
                    <CustomTelInput label={"Contato"} value={supplier?.contact} name={"contact"} changeFunction={(newValue) => setSupplier({ ...supplier, contact: newValue })} error={errorInput} />
                </Box>
            </CustomPopup> */}
        </React.Fragment>
    )
}

export default Clients