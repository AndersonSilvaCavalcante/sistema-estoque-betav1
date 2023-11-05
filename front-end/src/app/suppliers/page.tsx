"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Actions */
import Supplier from "@/actions/suppliers"

/**Components */
import { Box, Button } from "@mui/material"
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import ContainerCustom from "@/components/Container"
import { ConfirmPopup, CustomPopup } from "@/components/Popups"
import { toast } from "react-toastify"
import { CustomTelInput, CustomTextInput } from "@/components/CustomInputs"

/**Icons */
import SaveIcon from "@mui/icons-material/Save"
import AddIcon from '@mui/icons-material/Add';
import Filter from "@/components/Filter"


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
    confirmPopupToggle?: boolean
}

interface ISupplierConfirmPopup {
    toggle: boolean
    msg?: string
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
    const [supplierConfirmPopup, setSupplierConfirmPopup] = useState<ISupplierConfirmPopup>({ toggle: false, msg: '' })
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
                setSupplierConfirmPopup({ toggle: false, msg: '' })
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
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Fornecedores">
                <Button onClick={showSaveNewSupplier} color="success" variant="contained" endIcon={<AddIcon />}>Cadastrar Fornecedor</Button>
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
            <ConfirmPopup
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
            </CustomPopup>
        </React.Fragment>
    )
}

export default Suppliers