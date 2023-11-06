"use client"

/**Dependencies */
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

/**Actions */
import Client from "@/actions/client";

/**Components */
import ContainerCustom from "@/components/Container";
import { CustomTelInput, CustomTextInput } from "@/components/CustomInputs";
import PageHeader from "@/components/PageHeader"
import { ConfirmPopup } from "@/components/Popups";
import { Box, Button, Stack } from "@mui/material";
import { toast } from "react-toastify";

/**Icons */
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
    params: {
        slug: Array<string>
    }
}

const ClientsRegisterOrUpdate = ({ params }: IProps) => {
    const router = useRouter()
    const { slug } = params;
    const [action, setAction] = useState<string>()
    const initialClient: ICLient = {
        id: 0,
        name: "",
        plate: "",
        model: "",
        phone: "",
        dateCreated: new Date()
    }
    const [client, setClient] = useState<ICLient>(initialClient)
    const [popupConfirmToggle, setPopupConfirmToggle] = useState<boolean>(false)
    const handleClose = () => {
        setPopupConfirmToggle(false)
    }

    const getClienttById = async (id: ICLient["id"]) => {
        try {
            const { data } = await Client.getListClients({ id: id })
            setClient(data[0])
        } catch (error) {
            toast.error("Algo deu errado!")
        }
    }

    const saveClient = async () => {
        try {
            slug[0] == "register" ? await Client.saveClient(client) : null
            slug[0] == "edit" ? await Client.editClient(client) : null
            setClient(initialClient)
            handleClose
            toast.success("Cliente Salvo com sucesso!")
            router.replace("/clients")
        } catch (error) {
            toast.error("Algo deu errado ao salvar o Cliente")
        }
    }

    const goBack = () => {
        router.replace("/clients")
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        //setErrorInput(false)
        const name = e.target.name
        const value = e.target.value
        setClient({ ...client, [name]: value })
    }

    useEffect(() => {
        if (slug[0] == "edit") {
            setAction("Editar")
            getClienttById(parseInt(slug[1]))
        } else {
            setAction("Cadastrar")
        }
    }, [slug])

    return (
        <React.Fragment>
            <PageHeader title={`${action} Cliente`} />
            <ContainerCustom title="Dados do Cliente">
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <CustomTextInput value={client?.name} changeFunction={changeValues} name='name' label="Nome" />
                    <CustomTelInput value={client?.phone} changeFunction={changeValues} name='phone' label="Telefone" />
                    <CustomTextInput value={client?.model} changeFunction={changeValues} name='model' label="Modelo" />
                    <CustomTextInput value={client?.plate} name='plate' label="Placa" changeFunction={changeValues} />
                </Stack>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="error" onClick={goBack} variant="outlined" endIcon={<CloseIcon />}>Cancelar</Button>
                        <Button color="success" onClick={() => setPopupConfirmToggle(true)} variant="contained" endIcon={<SaveIcon />}>Salvar</Button>
                    </Stack>
                </Box>
            </ContainerCustom>
            <ConfirmPopup
                toggle={popupConfirmToggle}
                title={`${action} Cliente`}
                message={"Confirma esta ação?"}
                confirmAction={saveClient}
                cancelFunction={handleClose}
            />
        </React.Fragment>
    )
}

export default ClientsRegisterOrUpdate