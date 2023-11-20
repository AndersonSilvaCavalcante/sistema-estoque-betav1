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
    salePrice: false
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
            case "salePrice":
                if (product.costPrice) {
                    perProfit = ((value - product.costPrice) / value) * 100
                    setProduct({ ...product, [name]: value, perProfit: parseFloat(perProfit.toFixed(2)), valueProfit: parseFloat((value - product.costPrice).toFixed(2)) })
                } else {
                    setProduct({ ...product, [name]: value })
                }
                break;
            case "costPrice":
                if (product.salePrice) {
                    perProfit = ((product.salePrice - value) / product.salePrice) * 100
                    setProduct({ ...product, [name]: value, perProfit: parseFloat(perProfit.toFixed(2)), valueProfit: parseFloat((product.salePrice - value).toFixed(2)) })
                } else {
                    setProduct({ ...product, [name]: value })
                }
                break;
            case "perProfit":
                if (product.costPrice) {
                    salePrice = ((100 * product.costPrice) / (value - 100) * -1)
                    setProduct({ ...product, [name]: value, salePrice: parseFloat(salePrice.toFixed(2)), valueProfit: parseFloat((salePrice - product.costPrice).toFixed(2)) })
                }
                break;
            case "valueProfit":
                if (product.costPrice) {
                    salePrice = product.costPrice + parseFloat(value)
                    perProfit = ((salePrice - product.costPrice) / salePrice) * 100
                    setProduct({ ...product, [name]: value, salePrice: parseFloat(salePrice.toFixed(2)), perProfit: parseFloat(perProfit.toFixed(2)) })
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
                key !== 'perProfit' &&
                key !== 'valueProfit' &&
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
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <CustomTextInput fullWidth value={product?.name} label={"Nome"} name={"name"} required={true} changeFunction={changeValues} error={errorInput?.name} />
                    <CustomTextInput fullWidth value={product?.barcode} label={"Código de Barras"} name={"barcode"} required={true} changeFunction={changeValues} error={errorInput?.barcode} />
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 250 }} size="small" error={errorInput?.supplierId}>
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
                </Stack>
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <CustomTextInput fullWidth value={product.qtdMin || ''} label={"Estoque Mínimo"} required={true} type={"number"} name={"qtdMin"} changeFunction={changeValues} error={errorInput?.qtdMin} />
                    <CustomTextInput fullWidth value={product.qtdCurrent || ''} label={"Estoque"} required={true} type={"number"} name={"qtdCurrent"} changeFunction={changeValues} error={errorInput?.qtdCurrent} />
                    <CustomTextInput fullWidth value={product.costPrice || ''} label={"Preço de Custo"} required={true} type={"number"} name={"costPrice"} changeFunction={changeValues} error={errorInput?.costPrice} />
                </Stack>
                <Stack direction="row" spacing={2} mb={2} mt={2}>
                    <CustomTextInput fullWidth value={product.salePrice || ''} label={"Preço de Venda"} required={true} type={"number"} name={"salePrice"} changeFunction={changeValues} error={errorInput?.salePrice} />
                    <CustomTextInput fullWidth value={product.perProfit || ''} disabled={!(product.costPrice && product.costPrice > 0) ? true : false} label={"Porcentagem de Lucro"} type={"number"} name={"perProfit"} changeFunction={changeValues} />
                    <CustomTextInput fullWidth value={product.valueProfit || ''} disabled={!(product.costPrice && product.costPrice > 0) ? true : false} label={"Valor do Lucro"} type={"number"} name={"valueProfit"} changeFunction={changeValues} />
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
                title={`${action} Produto`}
                message={"Confirma esta ação?"}
                confirmAction={saveProduct}
                cancelFunction={handleClose}
            />
        </React.Fragment>
    )
}

export default ProductRegisterOrUpdate