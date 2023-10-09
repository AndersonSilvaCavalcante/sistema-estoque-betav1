import axios, { AxiosResponse } from "axios"

export const getSuppliers = async () => {
    try {
        const { data }: AxiosResponse<Array<ISupplier>> = await axios.get("https://localhost:44390/ListSupplier")
        console.log("aqui", data)
        return data
    } catch (error) {
        return []
    }
}

export const deleteSupplierById = async (id: ISupplier["id"]) => {
    try {
        await axios.delete(`https://localhost:44390/DeletSupplier?id=${id}`)
    } catch (error) {

    }
}

export const editSupplier = async (supplier: ISupplier)=>{
    try {
       let teste = await axios.put(`https://localhost:44390/EditSupplier`, supplier)
       console.log(teste)
    } catch (error) {
        
    }
}

export const saveSupplier = async (supplier: ISupplier)=>{
    try {
        let teste = await axios.post("https://localhost:44390/SaveSupplier", supplier)
        console.log(teste)
    } catch (error) {
        
    }
}