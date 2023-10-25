"use client"

/**Dependencies */
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**Actions */
import ProductServices from "@/actions/productServices";

/**Components */
import PageHeader from "@/components/PageHeader";
import { Button } from "@mui/material";
import Filter from "@/components/Filter";
import { CustomTextInput } from "@/components/CustomInputs";
import ContainerCustom from "@/components/Container";
import TableCustom from "@/components/TableCustom";
import { toast } from "react-toastify";
import Link from "next/link";

/**Icons */
import AddIcon from '@mui/icons-material/Add';

const titles: Array<ITitles> = [
    { label: "Nome", value: 'name' },
    { label: "Fornecedor", value: 'supplierId' },
    { label: "Estoque Mínimo", value: 'qtdMin' },
    { label: "Estoque Atual", value: 'qtdCurrent' },
    { label: "Preço de Custo", value: 'costPrice', valuePrefix: "currency" },
    { label: "Preço de Venda", value: 'salePrice', valuePrefix: "currency" },
]

export interface IFilter {
    id?: number
    name?: string,
    barcode?: string,
}

const Products: NextPage = () => {
    const router = useRouter()
    const initialFIlter: IFilter = { name: '', barcode: '' }
    const [filter, setFilter] = useState<IFilter>(initialFIlter)
    const [products, setProducts] = useState<Array<IProduct>>([])

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

    const editProductPage = (data: IProduct)=>{
        router.replace(`/products/form/edit/${data.id}`)
    }

    const cleanFilters = () => {
        setFilter(initialFIlter)
        getProductsList(true)
    }

    const changeFilterValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name
        const value = e.target.value
        setFilter({ ...filter, [name]: value })
    }

    useEffect(() => {
        getProductsList()
    }, [])

    return (
        <React.Fragment>
            <PageHeader title="Produtos">
                <Link href="/products/form/register">
                    <Button color="success" variant="contained" endIcon={<AddIcon />}>Cadastrar Produto</Button>
                </Link>
            </PageHeader>
            <Filter cleanFunction={cleanFilters} filterFucntion={() => getProductsList(false)}>
                <CustomTextInput value={filter?.name} label={"Nome"} name={"name"} changeFunction={changeFilterValues} />
                <CustomTextInput value={filter?.barcode} label={"Código de Barras"} name={"barcode"} changeFunction={changeFilterValues} />
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