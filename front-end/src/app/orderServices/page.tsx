'use client'

/**Dependencies */
import moment from 'moment';
import { NextPage } from 'next';
import { toast } from 'react-toastify';
import styled from "styled-components";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

/**Components */
import PageHeader from '@/components/PageHeader';
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmPopup } from '@/components/Popups';
import CircleIcon from '@mui/icons-material/Circle';
import { ButtonPlus } from '@/components/ButtonPlus';
import ContainerCustom from "@/components/Container";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Stack, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, IconButton, Menu } from "@mui/material"

/**Service */
import OrderService from "@/actions/orderServices";

/**scss */
import "../../assets/css/orderServices.scss"


const options = [
    'Editar',
    'Visualizar'
];


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
    status: string
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
    dateCreated: Date
}

const OrderServices: NextPage = () => {

    const initialFIlter: IFilter = { plate: '', order: '', status: 'started' }
    const listStatus: Array<IStatus> = [
        { label: "Todos", value: ' ', },
        { label: "Abertas", value: 'started' },
        { label: "Fechadas", value: 'closed' }
    ]

    const router = useRouter()

    const [filter, setFIlter] = useState<IFilter>(initialFIlter)
    const [listOrderService, setListOrderService] = useState<Array<ICardsListOrderService>>([])

    const [orderServiceSelected, setOrderServiceSelected] = useState<listOrderService | null>(null)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const [openFinishModal, setOpenFinishModal] = useState<boolean>(false)
    const [idFinishModal, setIdFinishModal] = useState<number>(0)

    const funcOpenFinishModal = (id: number) => {
        setIdFinishModal(id)
        setOpenFinishModal(true)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>, selected: listOrderService) => {
        setOrderServiceSelected(selected)
        setAnchorEl(event.currentTarget);
    };
    
    const handleOption = (option: string) => {
        if (option === "Editar") {
            router.push(`/orderServices/form/edit/${orderServiceSelected?.order}`)
        }
        setAnchorEl(null);
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
        setFIlter(initialFIlter)
        getListOrderService(true)
    }

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const name = e.target.name
        const value = e.target.value

        setFIlter({ ...filter, [name]: value })
    }


    useEffect(() => {
        getListOrderService()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Ordem de serviço">
                <ButtonPlus onCLick={() => router.push("/orderServices/form/register")} title="Cadastrar Ordem de Serviço" />
            </PageHeader>
            <ContainerCustom title="Filtrar">
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <TextField value={filter?.plate} onChange={changeValues} name='plate' label="Placa" size="small" variant="outlined" />
                    <TextField value={filter?.order} onChange={changeValues} name='order' type='number' label="N° da ordem" size="small" variant="outlined" />
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} size="small">
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
                </Stack>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="error" variant="outlined" endIcon={<CloseIcon />} onClick={cleanFilters} >Limpar</Button>
                        <Button color="success" variant="outlined" endIcon={<FilterListIcon />} onClick={() => getListOrderService(false)} >Filtrar</Button>
                    </Stack>
                </Box>
            </ContainerCustom>
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
                                                    <MenuItem key={option} onClick={() => handleOption(option)}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                            {list.status === 'started' ? (
                                                <CircleIcon color='success' />
                                            ) : (
                                                <CircleIcon color='error' />
                                            )}
                                        </div>

                                    </div>
                                    <p>{list.plate}</p>
                                    <div className='d-flex'>
                                        <label>Criada em: {moment(list.dateCreated).format("DD/MM/YYYY")}</label>
                                        {list.status === "started" && (
                                            <Button color="error" onClick={() => funcOpenFinishModal(list.order)} >FInalizar</Button>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </ContainerOrderService>
                    </ContainerCustom>
                )
            ))}

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