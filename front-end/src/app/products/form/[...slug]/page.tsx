"use client"

/**Dependencies */
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

/**Actions */
import ProductServices from "@/actions/productServices"

/**Components */
import ContainerCustom from "@/components/Container"
import { CustomTextInput } from "@/components/CustomInputs"
import PageHeader from "@/components/PageHeader"
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material"

/**Icons */
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-toastify"
import Supplier from "@/actions/suppliers"
import { ConfirmPopup } from "@/components/Popups"
import DGrid from "@/components/DGrid"

interface IProps {
    params: {
        slug: Array<string>
    }
}

interface IErroForm {
    name: boolean,
    barcode: boolean,
    supplierId: false,
    qtdMin: false,
    qtdCurrent: false,
    costPrice: false,
    salePrice: false,
    perProfit: false
}

const ProductRegisterOrUpdate = ({ params }: IProps) => {
    const router = useRouter()
    const { slug } = params;
    const [action, setAction] = useState<string>()
    const [suppliers, setSuppliers] = useState<Array<ISupplier>>([])
    const initialProduct: IProduct = {
        id: 0,
        name: "",
        barcode: "",
        supplierId: 0,
        qtdMin: undefined,
        qtdCurrent: undefined,
        costPrice: undefined,
        salePrice: undefined,
        type: '',
        oldQtd: 0,
        qtdChange: 0,
        valueProfit: undefined,
        perProfit: undefined,
        status: ''
    }
    const [errorInput, setErrorInput] = useState<null | IErroForm>(null)

    const [product, setProduct] = useState<IProduct>(initialProduct)
    const [popupConfirmToggle, setPopupConfirmToggle] = useState<boolean>(false)
    const handleClose = () => {
        setPopupConfirmToggle(false)
    }

    const getSuppliersList = async () => {
        try {
            const { data } = await Supplier.getSuppliers()
            setSuppliers(data)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }


    const changeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        let value: any = e.target.value

        if (value !== "" && (name == "costPrice" || name == "salePrice")) {
            value = parseFloat(value)
        }

        if (value !== "" && (name == "qtdMin" || name == "qtdCurrent")) {
            value = parseInt(value)
        }

        let salePrice = 0
        let perProfit = 0

        switch (name) {
            case "qtdCurrent":
                let qtdChange = product.oldQtd - value
                let type = 'reposição'

                if (qtdChange < 0) {
                    qtdChange = qtdChange * -1
                }

                if (slug[0] === 'register') {
                    qtdChange = 0
                } else {
                    if (value < product.oldQtd) {
                        type = 'retirada'
                    }
                }
                setProduct({ ...product, qtdChange: qtdChange, type: type, [name]: value })
                break;
            case "costPrice":
                if (product.perProfit) {
                    salePrice = value + (value * (product.perProfit / 100))
                    setProduct({ ...product, [name]: value, salePrice: salePrice > 0 ? parseFloat(salePrice.toFixed(2)) : 0, valueProfit: parseFloat((salePrice - value).toFixed(2)) })
                } else {
                    setProduct({ ...product, [name]: value })
                }
                break;
            case "perProfit":
                if (product.costPrice) {
                    salePrice = product.costPrice + (product.costPrice * (value / 100))
                    setProduct({ ...product, [name]: value, salePrice: parseFloat(salePrice.toFixed(2)), valueProfit: parseFloat((salePrice - product.costPrice).toFixed(2)) })
                }
                break;
            default:
                setProduct({ ...product, [name]: value })
        }

    }

    const getProductById = async (id: IProduct["id"]) => {
        try {
            const { data } = await ProductServices.getProducts({ id: id })
            setProduct({ ...data[0], oldQtd: data[0].qtdCurrent })
        } catch (error) {
            toast.error("Algo deu errado ao exibir o Produto")
        }
    }

    const saveProduct = async () => {
        setErrorInput(null)

        let error: any = {}
        const productAny: any = product
        Object.keys(product).map(key => {
            if (
                key !== 'id' &&
                key !== 'qtdChange' &&
                key !== 'oldQtd' &&
                key !== 'status' &&
                (productAny[key] === '' || productAny[key] === 0 || productAny[key] === undefined)) {
                error = {
                    ...error, [key]: true
                }
            }
        })

        if (Object.keys(error).length !== 0) {
            return setErrorInput(error)
        }

        try {
            slug[0] == "register" ? await ProductServices.saveProduct({ ...product, type: 'cadastro' }) : null
            slug[0] == "edit" ? await ProductServices.editProduct(!product.type ? { ...product, type: 'edição' } : product) : null
            setProduct(initialProduct)
            handleClose
            toast.success("Produto Salvo com sucesso!")
            router.replace("/products")
        } catch (error) {
            toast.error("Algo deu errado ao salvar o Produto")
        }
    }

    const goBack = () => {
        router.replace("/products")
    }

    useEffect(() => {
        getSuppliersList()
    }, [])

    useEffect(() => {
        if (slug[0] == "edit") {
            setAction("Editar")
            getProductById(parseInt(slug[1]))
        } else {
            setAction("Cadastrar")
        }
    }, [slug])

    return (
        <React.Fragment>
            <PageHeader title={`${action} Produto`} />
            <ContainerCustom title="Dados do Produto">
                <DGrid>
                    <CustomTextInput fullWidth value={product?.name} label={"Nome"} name={"name"} required={true} changeFunction={changeValues} error={errorInput?.name} />
                    <CustomTextInput fullWidth value={product?.barcode} label={"Código de Barras"} name={"barcode"} required={true} changeFunction={changeValues} error={errorInput?.barcode} />
                    <FormControl variant="outlined" fullWidth size="small" error={errorInput?.supplierId}>
                        <InputLabel >Fornecedor *</InputLabel>
                        <Select
                            label="Fornecedor *"
                            value={product?.supplierId.toString()}
                            name="supplierId"
                            onChange={changeValues}
                            required={true}
                        >
                            {suppliers.map((list, index: number) => (
                                <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                            ))}
                        </Select>
                        {errorInput?.supplierId && (
                            <FormHelperText>Campo obrigatório</FormHelperText>
                        )}
                    </FormControl>
                </DGrid>
                <DGrid>
                    <CustomTextInput fullWidth value={product.qtdMin || ''} label={"Estoque Mínimo"} required={true} type={"number"} name={"qtdMin"} changeFunction={changeValues} error={errorInput?.qtdMin} />
                    <CustomTextInput fullWidth value={product.qtdCurrent || ''} label={"Estoque"} required={true} type={"number"} name={"qtdCurrent"} changeFunction={changeValues} error={errorInput?.qtdCurrent} />
                    <CustomTextInput fullWidth value={product.costPrice || ''} label={"Preço de Custo"} required={true} type={"number"} name={"costPrice"} changeFunction={changeValues} error={errorInput?.costPrice} />
                </DGrid>
                <DGrid>
                    <CustomTextInput fullWidth value={product.salePrice || ''} disabled={true} label={"Preço de Venda"} type={"number"} name={"salePrice"} changeFunction={changeValues} />
                    <CustomTextInput fullWidth value={product.perProfit || ''} adorment="percentage" disabled={!(product.costPrice && product.costPrice > 0) ? true : false} required={true} label={"Porcentagem de Lucro"} type={"number"} name={"perProfit"} changeFunction={changeValues} error={errorInput?.perProfit} />
                    <CustomTextInput fullWidth value={product.valueProfit || ''} disabled={true} label={"Valor do Lucro"} type={"number"} name={"valueProfit"} changeFunction={changeValues} />
                </DGrid>
                <Box sx={{ display: 'flex', placeContent: 'flex-end' }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="error" onClick={goBack} variant="outlined" endIcon={<CloseIcon />}>Cancelar</Button>
                        <Button color="success" onClick={() => setPopupConfirmToggle(true)} variant="contained" endIcon={<SaveIcon />}>Salvar</Button>
                    </Stack>
                </Box>
            </ContainerCustom>
            <ConfirmPopup
                toggle={popupConfirmToggle}
                title={`${action} Produto`}
                message={"Confirma esta ação?"}
                confirmAction={saveProduct}
                cancelFunction={handleClose}
            />
        </React.Fragment>
    )
}

export default ProductRegisterOrUpdate