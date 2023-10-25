import { IFilter } from "@/app/suppliers/page";
import api from "./api";

class Supplier {
    static getSuppliers(filter?: IFilter) {
        let filterBody = null
        if (filter) {
            filter.name !== '' ? filterBody = 'name=' + filter.name : null
            filter.id ? filterBody = `&id=` + filter.id : null
        }
        return api.get(`ListSupplier?${filterBody}`)
    }

    static deleteSupplierById(id: ISupplier["id"]) {
        return api.delete(`DeletSupplier?id=${id}`)
    }

    static editSupplier(supplier: ISupplier) {
        return api.put(`EditSupplier?id=${supplier.id}`, supplier)
    }

    static saveSupplier(supplier: ISupplier) {
        return api.post("SaveSupplier", supplier)
    }
}

export default Supplier