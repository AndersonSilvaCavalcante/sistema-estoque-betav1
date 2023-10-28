'use client'

/**Dependencies */
import { toast } from "react-toastify";
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";

/**Components */
import AddIcon from '@mui/icons-material/Add';
import PageHeader from "@/components/PageHeader"
import ContainerCustom from "@/components/Container";
import { Box, Button, Stack, TextField, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, FormHelperText } from "@mui/material"

/**Icons */
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';

/**Service */
import Client from "@/actions/client";
import Services from "@/actions/services";
import TableCustom from "@/components/TableCustom";
import OrderService from "@/actions/orderServices";



interface IlistServices {
    id: number,
    name: string,
    salePrice: number
}

interface IProps {
    params: {
        slug: Array<string>
    }
}

const OrderServicesRegister = ({ params }: IProps) => {

    const { slug } = params;

    const titles: Array<ITitles> = [
        { label: "Nome", value: 'name' },
        { label: "Preço", value: 'salePrice' },
    ]

    const initialOrderService: IOrderService = {
        clientId: null,
        services: '',
        comments: ''
    }

    const initialInfoClients: ICLient = {
        id: 0,
        dateCreated: new Date(),
        model: '',
        name: '',
        phone: '',
        plate: ''
    }

    const router = useRouter()
    const searchParams = usePathname()

    const [orderService, setOrderService] = useState<IOrderService>(initialOrderService)

    const [listClients, setClients] = useState<Array<ICLient>>([])
    const [listServices, setListServices] = useState<Array<IlistServices>>([])

    const [servicesToBePerformed, setServicesToBePerformed] = useState<Array<IServicesToBePerformed>>([])

    const [infoClients, setClientsInfo] = useState<ICLient>(initialInfoClients)
    const [viewClient, setViewCLient] = useState<boolean>(false)
    const [disableCLient, setDIsableCLient] = useState<boolean>(true)

    const [errorInput, setErrorInput] = useState<boolean>(false)

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        setOrderService({ ...orderService, [name]: value })
    }

    const changeValuesClients = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        setClientsInfo({ ...infoClients, [name]: value })
    }

    const getListOrderService = async () => {
        try {
            const { data } = await Services.getListServices()
            setListServices(data)
        } catch { }
    }

    const addServicesToBePerformed = () => {
        const data = listServices.filter(list => list.id == parseInt(orderService?.services))[0]
        setOrderService({ ...orderService, services: '' })

        const dados = [...servicesToBePerformed, { name: data.name, salePrice: data.salePrice, id: data.id }].map((e, index: number) => ({
            ...e,
            id: index
        }))
        setServicesToBePerformed(dados)
    }

    const deleteServicesToBePerformed = (id: number) => {
        setServicesToBePerformed(listServices.filter(list => list.id !== id))
    }

    const addOrderService = async () => {

        setErrorInput(false)

        if (!orderService.clientId || servicesToBePerformed.length === 0) {
            return setErrorInput(true)
        }

        try {
            const payload: IOrderService = { ...orderService, services: JSON.stringify(servicesToBePerformed) }
            await OrderService.saveOrderService(payload)
            setOrderService(initialOrderService)
            setServicesToBePerformed([])
            toast.success("Sucesso ao criar ordem de serviço!")
            goBack()
        } catch {
            toast.error("Erro ao criar ordem de serviço!")
        }
    }

    const getListClients = async () => {
        try {
            const { data } = await Client.getListClients()
            setClients(data)
        } catch { }
    }

    const saveClient = async () => {
        try {
            await Client.editClient(infoClients)
            toast.success("Sucesso ao editar cliente!")
            getListClients()
            setDIsableCLient(true)
        } catch {
            toast.error("Erro ao editar cliente!")
        }
    }

    const goBack = () => {
        router.back()
    }

    useEffect(() => {
        console.log('slug', slug)
    }, [slug])

    useEffect(() => {
        getListOrderService()
        getListClients()
    }, [])

    useEffect(() => {
        if (orderService.clientId) {
            setViewCLient(true)
            setClientsInfo(listClients.filter(list => list.id == orderService.clientId)[0])
        } else {
            setViewCLient(false)
        }
    }, [orderService.clientId])

    return (
        <React.Fragment>
            <PageHeader title="Cadastrar Ordem de Serviço">
            </PageHeader>
            <ContainerCustom>
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small" error={errorInput}>
                        <InputLabel id="demo-simple-select-standard-label">Cliente *</InputLabel>
                        <Select
                            label="Cliente *"
                            value={orderService?.clientId?.toString()}
                            name="clientId"
                            onChange={changeValues}
                        >
                            {listClients.map((list, index: number) => (
                                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                            ))}
                        </Select>
                        {errorInput && (
                            <FormHelperText>Campo obrigatório</FormHelperText>
                        )}
                    </FormControl>
                </Stack>
                {viewClient && (
                    <Stack direction="row" spacing={2} mb={2} mt={2}>
                        <TextField value={infoClients?.plate} onChange={changeValuesClients} name='plate' label="Placa" size="small" variant="outlined" disabled={disableCLient} />
                        <TextField value={infoClients?.model} onChange={changeValuesClients} name='model' label="Modelo" size="small" variant="outlined" disabled={disableCLient} />
                        <TextField value={infoClients?.name} onChange={changeValuesClients} name='name' label="Nome" size="small" variant="outlined" disabled={disableCLient} />
                        <TextField value={infoClients?.phone} onChange={changeValuesClients} name='phone' label="Telefone" size="small" variant="outlined" disabled={disableCLient} />
                        {disableCLient && (<Button color="warning" variant="outlined" onClick={() => setDIsableCLient(false)} endIcon={<CreateIcon />}>Editar</Button>)}
                    </Stack>
                )}
                {!disableCLient && (
                    <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                        <Stack direction="row" spacing={2}>
                            <Button color="error" variant="outlined" onClick={() => setDIsableCLient(true)} endIcon={<CloseIcon />}>Cancelar</Button>
                            <Button color="success" variant="outlined" onClick={saveClient} endIcon={<SaveIcon />}>Salvar</Button>
                        </Stack>
                    </Box>
                )}
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }} size="small" error={errorInput}>
                        <InputLabel >Serviços a serem feitos *</InputLabel>
                        <Select
                            label="Serviços a serem feitos *"
                            value={orderService?.services}
                            name="services"
                            onChange={changeValues}
                        >
                            {listServices.map((list, index: number) => (
                                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                            ))}
                        </Select>
                        {errorInput && (
                            <FormHelperText>Campo obrigatório</FormHelperText>
                        )}
                    </FormControl>
                    <Button color="success" variant="outlined" endIcon={<AddIcon />} onClick={addServicesToBePerformed} >Adicionar</Button>
                </Stack>
                {servicesToBePerformed.length > 0 && (
                    <TableCustom
                        data={servicesToBePerformed}
                        titles={titles}
                        remove={true}
                        removeFunction={deleteServicesToBePerformed}
                        sum={true}
                    />
                )}
                <Stack spacing={2} mb={2} mt={2}>
                    <TextField
                        name='comments'
                        label="Observações"
                        size="small"
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={changeValues}
                        value={orderService?.comments}
                    />
                </Stack>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="error" variant="outlined" endIcon={<CloseIcon />} onClick={goBack} >Cancelar</Button>
                        <Button color="success" variant="outlined" onClick={addOrderService} endIcon={<SaveIcon />}>Salvar</Button>
                    </Stack>
                </Box>
            </ContainerCustom>
        </React.Fragment>
    )
}

export default OrderServicesRegister
