'use client'

/**Dependencies */
import { toast } from "react-toastify";
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from "next/navigation";

/**Components */
import AddIcon from '@mui/icons-material/Add';
import PageHeader from "@/components/PageHeader"
import ContainerCustom from "@/components/Container";
import { Box, Button, Stack, TextField, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, FormHelperText, Autocomplete } from "@mui/material"

/**Icons */
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**Service */
import Client from "@/actions/client";
import Services from "@/actions/services";
import TableCustom from "@/components/TableCustom";
import OrderService from "@/actions/orderServices";
import { ConfirmPopup } from "@/components/Popups";



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

    const [openConfirm, setOpenConfirm] = useState<boolean>(false)

    const [clientSelecioned, setClientSelecioned] = useState<ICLient | null>(null)

    const [typeScreen, setTypeScreen] = useState<string>("Cadastrar")

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

    const addOrEditOrderService = async () => {

        setErrorInput(false)

        if (!orderService.clientId || servicesToBePerformed.length === 0) {
            return setErrorInput(true)
        }

        try {
            const payload: IOrderService = { ...orderService, services: JSON.stringify(servicesToBePerformed) }
            if (typeScreen === "Editar") {
                await OrderService.editOrderService(slug[1], payload)

            } else {
                await OrderService.saveOrderService(payload)
            }
            setOrderService(initialOrderService)
            setServicesToBePerformed([])
            toast.success(`Sucesso ao ${typeScreen} Ordem de Serviço!`)
            goBack()
        } catch {
            toast.error(`Erro ao  ${typeScreen}  Ordem de Serviço!`)
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

    const getOrderById = async (id: string) => {
        try {
            const { data } = await OrderService.getListOrderService({ order: id, plate: '', status: '', clientId: '' })
            setOrderService({ ...data[0], services: '' })

            const clientInfo = listClients.filter(client => client.id === data[0].clientId)[0]

            setClientSelecioned(clientInfo)
            setClientsInfo(clientInfo)
            setServicesToBePerformed(JSON.parse(data[0].services))
        } catch { }
    }

    const goBack = () => {
        setClientSelecioned(null)
        router.replace("/orderServices")
    }

    useEffect(() => {
        if (clientSelecioned) {
            setOrderService({ ...orderService, clientId: clientSelecioned.id })
        } else {
            setOrderService({ ...orderService, clientId: null })
        }
    }, [clientSelecioned])

    useEffect(() => {
        getListOrderService()
        getListClients()
    }, [])

    useEffect(() => {
        if (listClients) {
            if (slug[0] === 'edit') {
                setTypeScreen("Editar")
                getOrderById(slug[1])
            } else if (slug[0] === 'view') {
                setTypeScreen("Visualizar")
                getOrderById(slug[1])
            } else {
                setTypeScreen("Cadastrar")
            }
        }
    }, [slug, listClients])

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
            <PageHeader title={`${typeScreen} Ordem de Serviço`}>
            </PageHeader>
            <ContainerCustom>
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <Autocomplete
                        size="small"
                        disablePortal
                        options={listClients}
                        disabled={typeScreen !== 'Cadastrar'}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            );
                        }}
                        onChange={(event, newValue) => setClientSelecioned(newValue)}
                        value={clientSelecioned || null}
                        renderInput={(params) => (
                            <FormControl variant="outlined" sx={{ minWidth: 220 }} size="small" >
                                <TextField
                                    {...params}
                                    // error={errorInput?.clientId}
                                    label="Nome do Cliente *"
                                />
                                {/* {(errorInput?.clientId) && (
                                    <FormHelperText>Campo obrigatório!</FormHelperText>
                                )} */}
                            </FormControl>
                        )}
                    />
                </Stack>
                {viewClient && infoClients && (
                    <Stack direction="row" spacing={2} mb={2} mt={2}>
                        <TextField value={infoClients.plate} onChange={changeValuesClients} name='plate' label="Placa" size="small" variant="outlined" disabled={disableCLient} />
                        <TextField value={infoClients.model} onChange={changeValuesClients} name='model' label="Modelo" size="small" variant="outlined" disabled={disableCLient} />
                        <TextField value={infoClients.name} onChange={changeValuesClients} name='name' label="Nome" size="small" variant="outlined" disabled={disableCLient} />
                        <TextField value={infoClients.phone} onChange={changeValuesClients} name='phone' label="Telefone" size="small" variant="outlined" disabled={disableCLient} />
                        {disableCLient && typeScreen !== 'Visualizar' && (<Button color="warning" variant="outlined" onClick={() => setDIsableCLient(false)} endIcon={<CreateIcon />}>Editar</Button>)}
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
                {typeScreen !== 'Visualizar' && (
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
                )}
                {servicesToBePerformed.length > 0 && (
                    <TableCustom
                        data={servicesToBePerformed}
                        titles={titles}
                        remove={typeScreen !== 'Visualizar'}
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
                        disabled={typeScreen === 'Visualizar'}
                    />
                </Stack>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="error" variant="outlined" endIcon={typeScreen !== 'Visualizar' ? <CloseIcon /> : <ArrowBackIcon />} onClick={goBack}> {typeScreen !== 'Visualizar' ? "Cancelar" : "Voltar"}</Button>
                        {typeScreen !== 'Visualizar' && (
                            <Button color="success" variant="outlined" onClick={() => setOpenConfirm(true)} endIcon={<SaveIcon />}>Salvar</Button>
                        )}
                    </Stack>
                </Box>
            </ContainerCustom>

            <ConfirmPopup
                toggle={openConfirm}
                title={`${typeScreen} Ordem de Serviço`}
                message={"Deseja confirma ordem de serviço?"}
                confirmAction={addOrEditOrderService}
                cancelFunction={() => setOpenConfirm(false)}
            />

        </React.Fragment>
    )
}

export default OrderServicesRegister
