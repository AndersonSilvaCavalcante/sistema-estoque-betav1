"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Actions */
import Supplier from "@/actions/suppliers"

/**Components */
import { Box, Button, TextField } from "@mui/material"
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import ContainerCustom from "@/components/Container"
import { CustomPopup } from "@/components/Popups"
import { toast } from "react-toastify"
import { CustomTextInput } from "@/components/CustomInputs"

/**Icons */
import SaveIcon from "@mui/icons-material/Save"
import AddIcon from '@mui/icons-material/Add';
import Filter from "@/components/Filter"
import { ButtonPlus } from "@/components/ButtonPlus"


const titles: Array<ITitles> = [
    { label: "Nome", value: 'name' },
    { label: "Telefone", value: 'contact' }
]

export interface IFilter {
    id: null,
    name: string
}

interface ISaveSupplierPopupData {
    title: string
    type: "edit" | "create"
}

const Suppliers: NextPage = () => {
    const [openSupplierPopup, setSupplierPopup] = useState(false)
    const handleOpen = () => setSupplierPopup(true)
    const handleClose = () => {
        setSupplier(initialSupplier)
        setSupplierPopup(false)
        setErrorInput(false)
    }
    const initialFIlter: IFilter = { id: null, name: '' }
    const initialSupplier: ISupplier = { id: 0, name: "", contact: "" }
    const [suppliers, setSuppliers] = useState<Array<ISupplier>>([])
    const [supplier, setSupplier] = useState<ISupplier>(initialSupplier)
    const [filter, setFilter] = useState<IFilter>(initialFIlter)
    const [saveSupplierPopupData, setSaveSupplierPopupData] = useState<ISaveSupplierPopupData>()
    const [errorInput, setErrorInput] = useState<boolean>(false)

    const getSuppliersList = async (clean?: boolean) => {
        try {
            const { data } = await Supplier.getSuppliers(clean ? initialFIlter : filter)
            setSuppliers(data)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const showSaveNewSupplier = () => {
        setSaveSupplierPopupData({ title: "Cadastrar Fornecedor", type: "create" })
        handleOpen()
    }

    const showEditSupplier = async (data: ISupplier) => {
        setSupplier(data)
        setSaveSupplierPopupData({ title: "Editar Fornecedor", type: "create" })
        handleOpen()
    }

    const saveSupplier = async () => {
        setErrorInput(false)
        try {
            if (supplier.name == '' || supplier.contact == '') {
                setErrorInput(true)
            } else {
                if (saveSupplierPopupData?.type == "create") {
                    await Supplier.saveSupplier(supplier)

                } else {
                    await Supplier.editSupplier(supplier)
                }
                setSupplier(initialSupplier)
                handleClose()
                toast.success("Fornecedor Salvo com Sucesso!")
                getSuppliersList()
            }
        } catch (error) {
            toast.error("Algo deu errado ao salvar o Fornecedor")
        }
    }

    const deleteSupplier = async (id: ISupplier["id"]) => {
        try {
            await Supplier.deleteSupplierById(id)
            toast.success("Fornecedor deletado com sucesso!")
            getSuppliersList()
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const cleanFilters = () => {
        setFilter(initialFIlter)
        getSuppliersList(true)
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorInput(false)
        const name = e.target.name
        const value = e.target.value
        setFilter({ ...filter, [name]: value })
    }

    const changeSuplierValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setErrorInput(false)
        const name = e.target.name
        const value = e.target.value
        setSupplier({ ...supplier, [name]: value })
    }

    useEffect(() => {
        getSuppliersList()
    },[])

    return (
        <React.Fragment>
            <CustomPopup
                toggle={openSupplierPopup}
                title={saveSupplierPopupData?.title}
                confirmButtonTitle="Salvar"
                confirmButtonIcon={<SaveIcon />}
                confirmAction={saveSupplier}
                cancelFunction={handleClose}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gridGap: 20
                }}>
                    <CustomTextInput value={supplier?.name} label={"Nome"} name={"name"} changeFunction={changeSuplierValues} error={errorInput} />
                    <CustomTextInput value={supplier?.contact} label={"Contato"} name={"contact"} changeFunction={changeSuplierValues} error={errorInput} />
                </Box>
            </CustomPopup>
            <PageHeader title="Fornecedores">
                <ButtonPlus onCLick={showSaveNewSupplier} title="Cadastrar Fornecedor" />
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getSuppliersList(false)}>
                <CustomTextInput value={filter?.name} label={"Nome"} name={"name"} changeFunction={changeValues} />
            </Filter>
            <ContainerCustom>
                <TableCustom
                    data={suppliers}
                    titles={titles}
                    edit={true}
                    remove={true}
                    editFunction={showEditSupplier}
                    removeFunction={deleteSupplier}
                />
            </ContainerCustom>
        </React.Fragment>
    )
}

export default Suppliers