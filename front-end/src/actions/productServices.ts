import { IFilter } from "@/app/products/page";
import api from "./api";

class ProductServices {
    static getProducts(filter: IFilter) {
        let filterBody = null
        if (filter) {
            filter.name !== '' ? filterBody = 'name=' + filter.name : null
            filter.barcode ? filterBody = `&barcode=` + filter.barcode : null
            filter.id ? filterBody = `&id=` + filter.id : null
            filter.supplierId ? filterBody = `&supplierId=` + filter.supplierId : null
            filter.status !== 'todos' ? filterBody = `&status=` + filter.status : null
        }
        return api.get(`ListProducts?${filterBody}`)
    }

    static deleteProductById(id: IProduct["id"]) {
        return api.delete(`DeleteProducts?id=${id}`)
    }

    static saveProduct(product: IProduct) {
        return api.post("SaveProducts", product)
    }

    static editProduct(product: IProduct) {
        return api.put(`EditProducts?id=${product.id}`, product)
    }

    static alterStatusProducts(id: number) {
        return api.put(`AlterStatusProducts?id=${id}`)
    }
}

export default ProductServices