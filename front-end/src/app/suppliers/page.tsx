"use client"
/**Dependencies */
import { NextPage } from "next"
import React, { useEffect, useState } from "react"

/**Actions */
import Supplier from "@/actions/suppliers"

/**Components */
import { Box } from "@mui/material"
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom"
import ContainerCustom from "@/components/Container"
import { ConfirmPopup, CustomPopup } from "@/components/Popups"
import { toast } from "react-toastify"
import { CustomTelInput, CustomTextInput } from "@/components/CustomInputs"

/**Icons */
import SaveIcon from "@mui/icons-material/Save"
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
    confirmPopupToggle?: boolean
}

interface ISupplierConfirmPopup {
    toggle: boolean
    msg?: string
}

interface IErroForm {
    name: boolean,
    contact: boolean
}

const Suppliers: NextPage = () => {
    const [openSupplierPopup, setSupplierPopup] = useState(false)
    const handleOpen = () => setSupplierPopup(true)
    const handleClose = () => {
        setSupplier(initialSupplier)
        setSupplierPopup(false)
        setErrorInput(null)
    }

    const initialFIlter: IFilter = { id: null, name: '' }
    const initialSupplier: ISupplier = { id: 0, name: "", contact: "" }
    const [suppliers, setSuppliers] = useState<Array<ISupplier> | null>(null)
    const [supplier, setSupplier] = useState<ISupplier>(initialSupplier)
    const [filter, setFilter] = useState<IFilter>(initialFIlter)
    const [saveSupplierPopupData, setSaveSupplierPopupData] = useState<ISaveSupplierPopupData>()
    const [supplierConfirmPopup, setSupplierConfirmPopup] = useState<ISupplierConfirmPopup>({ toggle: false, msg: '' })
    const [errorInput, setErrorInput] = useState<null | IErroForm>(null)

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
        setSaveSupplierPopupData({ title: "Editar Fornecedor", type: "edit" })
        handleOpen()
    }

    const saveSupplier = async () => {
        setErrorInput(null)

        let error: any = {}
        const supplierAny: any = supplier
        Object.keys(supplier).map(key => {
            if (key !== 'id' && (supplierAny[key] === '' || supplierAny[key] === 0 || (key === 'contact' && supplier?.contact.length < 17))) {
                error = { ...error, [key]: true }
            }
        })

        if (Object.keys(error).length !== 0) {
            return setErrorInput(error)
        }

        try {
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
        const name = e.target.name
        const value = e.target.value
        setFilter({ ...filter, [name]: value })
    }

    const changeSuplierValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                    <CustomTextInput value={supplier?.name} label={"Nome"} name={"name"} changeFunction={changeSuplierValues} error={errorInput?.name} />
                    <CustomTelInput label={"Contato"} value={supplier?.contact} name={"contact"} changeFunction={changeSuplierValues} error={errorInput?.contact} errorMessage={supplier?.contact.length < 17 ? "Número inválido" : undefined} />
                </Box>
            </CustomPopup>
        </React.Fragment>
    )
}

export default Suppliers