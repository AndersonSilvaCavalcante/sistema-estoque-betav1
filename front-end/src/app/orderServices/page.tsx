'use client'

/**Dependencies */
import moment from 'moment';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import styled from "styled-components";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

/**Components */
import Filter from '@/components/Filter';
import PageHeader from '@/components/PageHeader';
import { ConfirmPopup } from '@/components/Popups';
import CircleIcon from '@mui/icons-material/Circle';
import { ButtonPlus } from '@/components/ButtonPlus';
import ContainerCustom from "@/components/Container";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CustomTextInput } from '@/components/CustomInputs';
import LottieFilesComponent from '@/components/LottieFilesComponent';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, IconButton, Menu, Autocomplete, Typography } from "@mui/material"

/**Service */
import Client from '@/actions/client';
import OrderService from "@/actions/orderServices";

/**scss */
import "../../assets/css/orderServices.scss"

/**Animations */
import emptyAnimation from "@/assets/animations/lottie/empty_animation.json"

const Card = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid silver;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 300;
`;


const ContainerOrderService = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`;

export interface IFilter {
    plate: string,
    order: number | string,
    status: string,
    clientId: number | string
}

interface ICardsListOrderService {
    type: string,
    list: Array<listOrderService>
}

interface IStatus {
    label: string,
    value: string
}

interface listOrderService {
    order: number,
    status: string,
    plate: string,
    clientName: string,
    dateCreated: Date
    dateClosed: Date
}

interface IOPtion {
    title: string
    value: string
}

const optionsInitial: Array<IOPtion> = [
    { title: 'Editar', value: 'edit' },
    { title: 'Visualizar', value: 'view' }
];


const OrderServices: NextPage = () => {

    const initialFIlter: IFilter = { plate: '', order: '', status: 'started', clientId: '' }
    const listStatus: Array<IStatus> = [
        { label: "Todos", value: ' ', },
        { label: "Abertas", value: 'started' },
        { label: "Fechadas", value: 'closed' }
    ]

    const router = useRouter()

    const [filter, setFIlter] = useState<IFilter>(initialFIlter)
    const [listOrderService, setListOrderService] = useState<Array<ICardsListOrderService>>([])

    const [orderServiceSelected, setOrderServiceSelected] = useState<listOrderService | null>(null)

    const [options, setOptions] = useState<Array<IOPtion>>(optionsInitial)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const [openFinishModal, setOpenFinishModal] = useState<boolean>(false)
    const [idFinishModal, setIdFinishModal] = useState<number>(0)

    const [listClients, setClients] = useState<Array<ICLient>>([])
    const [clientSelecioned, setClientSelecioned] = useState<ICLient | null>(null)


    const funcOpenFinishModal = (id: number) => {
        setIdFinishModal(id)
        setOpenFinishModal(true)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>, selected: listOrderService) => {
        setOrderServiceSelected(selected)

        if (selected.status == 'started') {
            setOptions(optionsInitial)
        } else {
            setOptions([{ title: 'Visualizar', value: 'view' }])
        }

        setAnchorEl(event.currentTarget);
    };

    const handleOption = (option: string) => {
        router.push(`/orderServices/form/${option}/${orderServiceSelected?.order}`)
    };


    const getListOrderService = async (clean?: boolean) => {
        try {
            const { data } = await OrderService.getListOrderService(clean ? initialFIlter : filter)

            const list = data as Array<listOrderService>

            const started = list.filter(list => list.status === "started")
            const closed = list.filter(list => list.status === "closed")

            const payload: Array<ICardsListOrderService> = [
                { type: "Abertas", list: started },
                { type: "Fechadas", list: closed }
            ]

            setListOrderService(payload)
        } catch {

        }
    }


    const closeOrderService = async (id: number) => {
        try {
            await OrderService.closeOrderService(id)
            toast.success("Sucesso ao finalizar ordem de serviço!")
            getListOrderService()
        } catch {
            toast.error("Erro ao finalizar ordem de serviço!")
        }
    }


    const cleanFilters = () => {
        setClientSelecioned(null)
        setFIlter(initialFIlter)
        getListOrderService(true)
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const name = e.target.name
        const value = e.target.value

        setFIlter({ ...filter, [name]: value })
    }

    const getListClients = async () => {
        try {
            const { data } = await Client.getListClients()
            setClients(data)
        } catch { }
    }

    useEffect(() => {
        if (clientSelecioned) {
            setFIlter({ ...filter, clientId: clientSelecioned.id })
        } else {
            setFIlter({ ...filter, clientId: '' })
        }
    }, [clientSelecioned])

    useEffect(() => {
        getListOrderService()
        getListClients()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Ordem de serviço">
                <ButtonPlus onCLick={() => router.push("/orderServices/form/register")} title="Cadastrar Ordem de Serviço" />
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getListOrderService(false)}>
                <CustomTextInput value={filter?.plate} name='plate' label="Placa" changeFunction={changeValues} />
                <CustomTextInput value={filter?.order} name='order' label="N° da ordem" changeFunction={changeValues} />
                <FormControl variant="outlined" sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                    <Select
                        label="Status"
                        value={filter?.status}
                        name="status"
                        onChange={changeValues}
                    >
                        {listStatus.map((list, index: number) => (
                            <MenuItem key={index} value={list.value}>{list.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Autocomplete
                    size="small"
                    disablePortal
                    options={listClients}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    onChange={(event, newValue) => setClientSelecioned(newValue)}
                    value={clientSelecioned}
                    renderInput={(params) => (
                        <FormControl variant="outlined" sx={{ minWidth: 275 }} size="small"  >
                            <TextField
                                {...params}
                                label="Nome do Cliente *"
                            />
                        </FormControl>
                    )}
                />
            </Filter>
            {listOrderService.map((card, index: number) => (
                card.list.length > 0 && (
                    <ContainerCustom title={card.type} key={index}>
                        <ContainerOrderService>
                            {card.list.map((list, index: number) => (
                                <Card key={index} className='cardOrderService' >
                                    <div className='d-flex'>
                                        <label>nº {list.order}</label>
                                        <div className='d-flex'>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={openMenu ? 'long-menu' : undefined}
                                                aria-expanded={openMenu ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={(e) => handleClick(e, list)}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>

                                            {list.status === 'started' ? (
                                                <CircleIcon color='success' />
                                            ) : (
                                                <CircleIcon color='error' />
                                            )}
                                        </div>

                                    </div>
                                    <p>{list.clientName} | {list.plate}</p>
                                    <div className='d-flex'>
                                        <label>Criada em: {moment(list.dateCreated).format("DD/MM/YYYY HH:mm:ss")}</label>
                                        {list.status === "started" && (
                                            <Button color="error" onClick={() => funcOpenFinishModal(list.order)} >FInalizar</Button>
                                        )}
                                        {list.status === "closed" && (
                                            <label>Finalizada em: {moment(list.dateClosed).format("DD/MM/YYYY HH:mm:ss")}</label>
                                        )}
                                    </div>
                                </Card>
                            ))}
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    'aria-labelledby': 'long-button',
                                }}
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={() => setAnchorEl(null)}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.value} onClick={() => handleOption(option.value)}>
                                        {option.title}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </ContainerOrderService>
                    </ContainerCustom>
                )
            ))}


            {listOrderService.length == 0 && (
                <ContainerCustom>
                    <Box mt={5} mb={5} sx={{
                        display: 'grid',
                        placeItems: 'center',
                        textAlign: 'center'
                    }}>
                        <Box>
                            <LottieFilesComponent animation={emptyAnimation} loop={true} />
                            <Typography variant={"h5"} component={"p"}>Não há dados</Typography>
                        </Box>
                    </Box>
                </ContainerCustom>
            )}

            <ConfirmPopup
                toggle={openFinishModal}
                title={"Finalizar ordem de serviço"}
                message={"Deseja finalizar ordem de serviço?"}
                confirmAction={() => closeOrderService(idFinishModal)}
                cancelFunction={() => setOpenFinishModal(false)}
            />

        </React.Fragment>
    )
}

export default OrderServices