import axios, { AxiosResponse } from "axios"
import api from "../api"

export const getSuppliers = async (filter?: any) => {
    try {
        let filterBody = null
        if (filter) {
            filter.name !== '' ? filterBody = 'name=' + filter.name : null
            filter.id ? filterBody = `&id=` + filter.id : null
        }
        const { data }: AxiosResponse<Array<ISupplier>> = await api.get(`ListSupplier?${filterBody}`)
        console.log("aqui", data)
        return data
    } catch (error) {
        return []
    }
}

export const deleteSupplierById = async (id: ISupplier["id"]) => {
    try {
        await api.delete(`DeletSupplier?id=${id}`)
    } catch (error) {

    }
}

export const editSupplier = async (supplier: ISupplier) => {
    try {
        let teste = await api.put(`EditSupplier`, supplier)
        console.log(teste)
    } catch (error) {

    }
}

export const saveSupplier = async (supplier: ISupplier) => {
    try {
        console.log("chegou aqui", supplier)
        let teste = await axios.post("https://localhost:44390/SaveSupplier", supplier)
        console.log("sjhdb",teste)
    } catch (error) {

    }
}