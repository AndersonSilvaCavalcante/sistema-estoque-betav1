"use client"

/**Dependencies */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**Actions */
import ProductServices from "@/actions/productServices";
import Supplier from "@/actions/suppliers";

/**Components */
import PageHeader from "@/components/PageHeader";
import { Autocomplete, FormControl, TextField } from "@mui/material";
import Filter from "@/components/Filter";
import { CustomTextInput } from "@/components/CustomInputs";
import ContainerCustom from "@/components/Container";
import TableCustom from "@/components/TableCustom";
import { toast } from "react-toastify";
import { ButtonPlus } from "@/components/ButtonPlus";

const titles: Array<ITitles> = [
    { label: "Nome", value: 'name' },
    { label: "Fornecedor", value: 'supplierName' },
    { label: "Estoque Mínimo", value: 'qtdMin' },
    { label: "Estoque Atual", value: 'qtdCurrent' },
    { label: "Preço de Custo", value: 'costPrice', valuePrefix: "currency" },
    { label: "Preço de Venda", value: 'salePrice', valuePrefix: "currency" },
]

export interface IFilter {
    id?: number
    name?: string,
    barcode?: string,
    supplierId?: number
}

const Products: NextPage = () => {
    const router = useRouter()
    const initialFIlter: IFilter = { name: '', barcode: '' }
    const [filter, setFilter] = useState<IFilter>(initialFIlter)
    const [products, setProducts] = useState<Array<IProduct> | null>(null)
    const [suppliers, setSuppliers] = useState<Array<ISupplier>>([])
    const initialSupplier: ISupplier = { id: 0, name: "", contact: "" }
    const [supplier, setSupplier] = useState<ISupplier>(initialSupplier)
    
    const getSuppliersList = async () => {
        try {
            const { data } = await Supplier.getSuppliers()
            setSuppliers(data)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const getProductsList = async (clean?: boolean) => {
        try {
            const { data } = await ProductServices.getProducts(clean ? initialFIlter : filter)
            setProducts(data)
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const deleteProduct = async (id: IProduct["id"]) => {
        try {
            await ProductServices.deleteProductById(id)
            toast.success("Produto deletado com sucesso!")
            getProductsList()
        } catch (error) {
            toast.error("Algo deu errado")
        }
    }

    const editProductPage = (data: IProduct) => {
        router.replace(`/products/form/edit/${data.id}`)
    }

    const cleanFilters = () => {
        setFilter(initialFIlter)
        setSupplier(initialSupplier)
        getProductsList(true)
    }

    const changeSupplierFilter = (supplier: ISupplier | null) => {
        supplier ? setFilter({ ...filter, supplierId: supplier.id }) : null
        supplier ? setSupplier(supplier) : null
    }

    const changeFilterValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFilter({ ...filter, [name]: value })
    }

    useEffect(() => {
        getSuppliersList()
        getProductsList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Produtos">
                <ButtonPlus onCLick={() => router.push("/products/form/register")} title="Cadastrar Produto" />
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getProductsList(false)}>
                <CustomTextInput value={filter?.name} label={"Nome"} name={"name"} changeFunction={changeFilterValues} />
                <CustomTextInput value={filter?.barcode} label={"Código de Barras"} name={"barcode"} changeFunction={changeFilterValues} />
                <Autocomplete
                    size="small"
                    disablePortal
                    options={suppliers}
                    disableClearable
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    onChange={(event, newValue) => changeSupplierFilter(newValue)}
                    value={supplier}
                    renderInput={(params) => (
                        <FormControl variant="outlined" sx={{ minWidth: 220 }} size="small">
                            <TextField
                                {...params}
                                name="supplierId"
                                label="Fornecedor *"
                            />
                        </FormControl>
                    )}
                />
            </Filter>
            <ContainerCustom>
                <TableCustom
                    titles={titles}
                    data={products}
                    edit={true}
                    editFunction={editProductPage}
                    remove={true}
                    removeFunction={deleteProduct}
                />
            </ContainerCustom>
        </React.Fragment>
    )
}

export default Products