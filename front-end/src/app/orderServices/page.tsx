'use client'

import React, { useState, useEffect } from 'react'
import styled from "styled-components";

import CircleIcon from '@mui/icons-material/Circle';
import OrderService from "@/actions/orderServices";
import ContainerCustom from "@/components/Container";
import FilterListIcon from '@mui/icons-material/FilterList';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { Box, Button, Stack, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material"
import { NextPage } from 'next';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import moment from 'moment';

import "../../assets/css/orderServices.scss"
import { toast } from 'react-toastify';

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
    plateOrOrder: string,
    status: string
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

    const initialFIlter: IFilter = { plateOrOrder: ' ', status: 'started' }
    const listStatus: Array<IStatus> = [
        { label: "Todos", value: ' ', },
        { label: "Abertas", value: 'started' },
        { label: "Fechadas", value: 'closed' }
    ]

    const [filter, setFIlter] = useState<IFilter>(initialFIlter)
    const [listOrderService, setListOrderService] = useState<Array<listOrderService>>([])

    const getListOrderService = async (clean?: boolean) => {
        try {
            const { data } = await OrderService.getListOrderService(clean ? initialFIlter : filter)

            setListOrderService(data)
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
                <Link href="/orderServices/register" >
                    <Button color="success" variant="contained" endIcon={<SaveIcon />}>Cadastrar Ordem de Serviço</Button>
                </Link>
            </PageHeader>
            <ContainerCustom title="Filtrar">
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <TextField value={filter?.plateOrOrder} onChange={changeValues} id="outlined-basic" name='plateOrOrder' label="Placa ou n° da ordem" size="small" variant="outlined" />
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
            <ContainerCustom title="Abertas">
                <ContainerOrderService>
                    {listOrderService.map((list, index: number) => (
                        <Card key={index} className='cardOrderService' >
                            <div className='d-flex'>
                                <label>nº {list.order}</label>
                                {list.status === 'started' ? (
                                    <CircleIcon color='success' />
                                ) : (
                                    <CircleIcon color='error' />
                                )}
                            </div>
                            <p>{list.plate}</p>
                            <div className='d-flex'>
                                <label>Criada em: {moment(list.dateCreated).format("DD/MM/YYYY")}</label>
                                {list.status === "started" && (
                                    <Button color="error" onClick={() => closeOrderService(list.order)} >FInalizar</Button>
                                )}
                            </div>
                        </Card>
                    ))}
                </ContainerOrderService>
            </ContainerCustom>
        </React.Fragment>
    )
}

export default OrderServices