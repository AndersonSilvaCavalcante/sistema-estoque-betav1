'use client'

/**Dependencies */
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react'

/**Components */
import PageHeader from "@/components/PageHeader"
import TableCustom from "@/components/TableCustom";
import { ConfirmPopup, CustomPopup } from "@/components/Popups";
import ContainerCustom from "@/components/Container";
import { ButtonPlus } from "@/components/ButtonPlus";
import { CustomTextInput } from "@/components/CustomInputs";
import { Box, Button, Stack, TextField, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem, FormHelperText, Autocomplete } from "@mui/material"

/**Icons */
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

/**Service */
import Client from "@/actions/client";
import SalesService from "@/actions/sales";
import ProductServices from "@/actions/productServices";


interface IErroForm {
    clientId?: boolean,
    produtoId?: boolean,
    quantidade?: boolean
    discount?: boolean
}

const SalesForm = () => {

    const titles: Array<ITitles> = [
        { label: "Produto", value: 'productName' },
        { label: "Quantidade", value: 'qtdChange' },
        { label: "Preço Unitário", value: 'currentPrice', valuePrefix: "currency" },
        { label: "Total", value: 'totalCurrentPrice', valuePrefix: "currency" }
    ]

    const initialSale: ISale = {
        id: 0,
        products: [],
        qtd: '',
        clientId: '',
        value: 0,
        clientName: "",
        discount: 0,
        dateCreated: new Date(),
        valueBeforeDIscount: 0
    }


    const router = useRouter()

    const [sale, setSale] = useState<ISale>(initialSale)

    const [openAddSale, setOpenSale] = useState<boolean>(false)
    const [errorInput, setErrorInput] = useState<null | IErroForm>(null)

    const [listClients, setClients] = useState<Array<ICLient>>([])

    const [products, setProducts] = useState<Array<IProduct>>([])
    const [productSelecioned, setProductSelecioned] = useState<IProduct | null>(null)

    const [openAddDiscount, setOpenAddDiscount] = useState<boolean>(false)

    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value

        setSale({ ...sale, [name]: value })
    }

    const changeProductSelecioned = (newProduct: IProduct | null) => {
        const exist = sale.products.filter(p => p.id === newProduct?.id)

        if (exist.length > 0) {
            return toast.info("Produto já adicionado")
        }

        setProductSelecioned(newProduct)
    }

    const deleteProducList = (id: number) => {
        setSale({ ...sale, products: sale.products.filter(p => p.id !== id) })
    }

    const addSale = async () => {
        try {
            await SalesService.saveSale({
                ...sale,
                valueBeforeDIscount: sale.value,
                value: sale.value - sale.discount,
            })
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

    const closeAddDiscount = () => {
        setOpenAddDiscount(false)
        setSale({ ...sale, discount: 0 })
    }

    const getProductsList = async () => {
        try {
            const { data } = await ProductServices.getProducts({ name: '', barcode: '' })
            setProducts(data)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const edtProductList = (product: IProductSale) => {
        setProductSelecioned(products.filter(p => p.id === product.id)[0])
        setSale({ ...sale, qtd: product.qtdChange, products: sale.products.filter(p => p.id !== product.id) })

    }

    const addDiscount = () => {
        setErrorInput(null)

        if (sale.discount === 0) {
            return setErrorInput({ ...errorInput, discount: true })
        }

        setOpenAddDiscount(false)
    }

    const addProductList = () => {
        setErrorInput(null)

        let error: IErroForm = {}


        if (sale.clientId === '') {
            error = { ...error, clientId: true }
        }

        if (sale.qtd === 0 || sale.qtd === '') {
            error = { ...error, quantidade: true }
        }

        if (!productSelecioned) {
            error = { ...error, produtoId: true }
        }

        if (productSelecioned && (productSelecioned.qtdCurrent < parseInt(sale.qtd.toString()))) {
            return toast.info(`Só existe ${productSelecioned.qtdCurrent} unidades de ${productSelecioned.name} no estoque`)
        }

        if (Object.keys(error).length !== 0) {
            return setErrorInput(error)
        }

        const valueTotalCurrentPrice = productSelecioned?.salePrice ? productSelecioned?.salePrice * parseInt(sale.qtd.toString()) : 0
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
                    totalCurrentPrice: valueTotalCurrentPrice,
                    currentPrice: productSelecioned?.salePrice ?? 0
                }],
            value: sale.value + valueTotalCurrentPrice
        })

        setProductSelecioned(null)
    }

    useEffect(() => {
        getListClients()
        getProductsList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Realizar Venda">
            </PageHeader>
            <ContainerCustom>
                <Stack
                    direction="row"
                    spacing={2}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 220 }} size="small" error={errorInput?.clientId}>
                        <InputLabel id="demo-simple-select-standard-label">Cliente *</InputLabel>
                        <Select
                            label="Cliente *"
                            value={sale?.clientId?.toString()}
                            name="clientId"
                            onChange={changeValues}
                            disabled={sale.products.length > 0}
                            error={errorInput?.clientId}

                        >
                            {listClients.map((list, index: number) => (
                                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                            ))}
                        </Select>
                        {(errorInput?.clientId) && (
                            <FormHelperText>Campo obrigatório!</FormHelperText>
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
                            <FormControl variant="outlined" sx={{ minWidth: 220 }} size="small" error={errorInput?.produtoId} >
                                <TextField
                                    {...params}
                                    error={errorInput?.produtoId}
                                    label="Produto *"
                                />
                                {(errorInput?.produtoId) && (
                                    <FormHelperText>Campo obrigatório!</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />
                    <CustomTextInput value={sale?.qtd} label={"Quantidade *"} name={"qtd"} changeFunction={changeValues} error={errorInput?.quantidade} />
                    <FormControl>
                        <ButtonPlus onCLick={addProductList} title="Adicionar" />
                    </FormControl>
                </Stack>
            </ContainerCustom>
            {sale.products.length > 0 && (
                <ContainerCustom>
                    <TableCustom
                        data={sale.products}
                        titles={titles}
                        remove={true}
                        removeFunction={deleteProducList}
                        edit={true}
                        editFunction={edtProductList}
                        sum={true}
                        subValue={sale.discount}
                    />
                    <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                        <Stack direction="row" spacing={2}>
                            <Button color="error" variant="outlined" endIcon={<CloseIcon />} onClick={goBack} >Cancelar</Button>
                            <Button color="info" variant="contained" endIcon={<AddIcon />} onClick={() => setOpenAddDiscount(true)} >Adicionar Desconto</Button>
                            <Button color="success" variant="contained" onClick={() => setOpenSale(true)} endIcon={<SaveIcon />}>FInalizar Venda</Button>
                        </Stack>
                    </Box>
                </ContainerCustom>
            )}
            <ConfirmPopup
                toggle={openAddSale}
                title={"Cadastrar venda"}
                message={"Deseja confirma venda?"}
                confirmAction={addSale}
                cancelFunction={() => setOpenSale(false)}
            />

            <CustomPopup
                toggle={openAddDiscount}
                title={"Adicionar Desconto"}
                confirmButtonTitle="Salvar"
                confirmButtonIcon={<SaveIcon />}
                confirmAction={addDiscount}
                cancelFunction={closeAddDiscount}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gridGap: 20
                }}>
                    <CustomTextInput value={sale?.discount} label={"Desconto *"} name={"discount"} changeFunction={changeValues} error={errorInput?.discount} />
                </Box>
            </CustomPopup>
        </React.Fragment>
    )
}

export default SalesForm
