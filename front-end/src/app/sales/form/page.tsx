'use client'


import PageHeader from "@/components/PageHeader"
import React, { useState, useEffect } from 'react'
import ContainerCustom from "@/components/Container";
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { Box, Button, Stack, TextField, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, FormHelperText, Autocomplete } from "@mui/material"

import TableCustom from "@/components/TableCustom";
import { toast } from "react-toastify";
import Client from "@/actions/client";
import { useRouter} from "next/navigation";

import ProductServices from "@/actions/productServices";
import SalesService from "@/actions/sales";

const SalesForm = () => {

    const titles: Array<ITitles> = [
        { label: "Produto", value: 'productName' },
        { label: "Quantidade", value: 'qtdChange' },
        { label: "Total", value: 'totalCurrentPrice' },
    ]

    const initialSale: ISale = {
        id: 0,
        products: [],
        qtd: '',
        clientId: '',
        value: 0,
        clientName: "",
        discount: 0,
        dateCreated: new Date
    }


    const router = useRouter()

    const [sale, setSale] = useState<ISale>(initialSale)

    const [listClients, setClients] = useState<Array<ICLient>>([])

    const [productSelecioned, setProductSelecioned] = useState<IProduct | null>(null)

    const [msgErro, setMsgErro] = useState<string>("")

    const [products, setProducts] = useState<Array<IProduct>>([])

    const [errorInput, setErrorInput] = useState<boolean>(false)

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        setSale({ ...sale, [name]: value })
    }

    const changeProductSelecioned = (newProduct: IProduct | null) => {
        setMsgErro('')
        const exist = sale.products.filter(p => p.id === newProduct?.id)

        if (exist.length > 0) {
            return setMsgErro("Produto já adicionado")
        }

        setProductSelecioned(newProduct)
    }

    const deleteProducList = (id: number) => {
        setSale({ ...sale, products: sale.products.filter(p => p.id !== id) })
    }

    const addSale = async () => {
        setErrorInput(false)

        try {
            await SalesService.saveSale(sale)
            toast.success("Sucesso ao realizar venda!")
            goBack()
        } catch {
            toast.error("Erro ao realizar venda!")
        }
    }

    const getListClients = async () => {
        try {
            const { data } = await Client.getListClients()
            setClients(data)
        } catch { }
    }

    const goBack = () => {
        router.back()
    }

    const getProductsList = async () => {
        try {
            const { data } = await ProductServices.getProducts({ name: '', barcode: '' })
            setProducts(data)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const edtProductList = (product: IProduct) => {
        setProductSelecioned(products.filter(p => p.id === product.id)[0])
        setSale({ ...sale, qtd: product.qtdChange, products: sale.products.filter(p => p.id !== product.id)  })

    }

    const addProductList = () => {

        setErrorInput(false)
        setMsgErro('')

        const exist = sale.products.filter(p => p.id === productSelecioned?.id)

        if (exist.length > 0) {
            setErrorInput(true)
            return setMsgErro("Produto já adicionado")
        }

        if (sale.clientId === '' || sale.qtd === 0 || sale.qtd === '' || !productSelecioned) {
            return setErrorInput(true)
        }


        setSale({
            ...sale,
            qtd: '',
            products: [
                ...sale.products,
                {
                    id: productSelecioned?.id ?? 0,
                    productName: productSelecioned?.name ?? "",
                    productId: productSelecioned?.id ?? 0,
                    newQtd: productSelecioned?.qtdCurrent ? productSelecioned?.qtdCurrent - parseInt(sale.qtd.toString()) : 0,
                    qtdChange: sale.qtd,
                    totalCostPrice: productSelecioned?.costPrice ? productSelecioned?.costPrice * parseInt(sale.qtd.toString()) : 0,
                    totalCurrentPrice: productSelecioned?.qtdCurrent ? productSelecioned?.qtdCurrent * parseInt(sale.qtd.toString()) : 0,
                }]
        })

        setProductSelecioned(null)
    }

    useEffect(() => {
        getListClients()
        getProductsList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Cadastrar Venda">
            </PageHeader>

            <ContainerCustom>
                <Stack
                    direction="row"
                    spacing={2}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 220 }} size="small" error={errorInput}>
                        <InputLabel id="demo-simple-select-standard-label">Cliente *</InputLabel>
                        <Select
                            label="Cliente *"
                            value={sale?.clientId?.toString()}
                            name="clientId"
                            onChange={changeValues}
                            disabled={sale.products.length > 0}
                        >
                            {listClients.map((list, index: number) => (
                                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                            ))}
                        </Select>
                        {(errorInput) && (
                            <FormHelperText>Campo obrigatório</FormHelperText>
                        )}
                    </FormControl>
                    <Autocomplete
                        size="small"
                        disablePortal
                        options={products}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            );
                        }}
                        onChange={(event, newValue) => changeProductSelecioned(newValue)}
                        value={productSelecioned}
                        renderInput={(params) => (
                            <FormControl variant="outlined" sx={{ minWidth: 220 }} size="small" error={errorInput} >
                                <TextField
                                    {...params}
                                    error={errorInput}
                                    label="Produto *"
                                />
                                {(errorInput) && (
                                    <FormHelperText>Campo obrigatório</FormHelperText>
                                )}
                            </FormControl>
                        )
                        }
                    />
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 220 }} size="small" error={errorInput} >
                        <TextField value={sale?.qtd} onChange={changeValues} name='qtd' label="Quantidade *" size="small" variant="outlined" error={errorInput} />
                        {errorInput && (
                            <FormHelperText>Campo obrigatório</FormHelperText>
                        )}
                    </FormControl>
                    <FormControl>
                        <Button color="success" variant="outlined" onClick={addProductList} endIcon={<SaveIcon />}>Adicionar</Button>
                    </FormControl>

                </Stack>
            </ContainerCustom>
            <ContainerCustom>
                <TableCustom
                    data={sale.products}
                    titles={titles}
                    remove={true}
                    removeFunction={deleteProducList}
                    edit={true}
                    editFunction={edtProductList}
                    sum={true}
                />
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="error" variant="outlined" endIcon={<CloseIcon />} onClick={goBack} >Cancelar</Button>
                        <Button color="success" variant="outlined" onClick={addSale} endIcon={<SaveIcon />}>Salvar</Button>
                    </Stack>
                </Box>
            </ContainerCustom>

        </React.Fragment>
    )
}

export default SalesForm
