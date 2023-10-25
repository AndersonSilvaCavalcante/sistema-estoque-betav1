import api from "./api"

class SalesService {
    static getListSales(id: number | string) {
        let filter = ''
        if (id !== '') {
            filter = `?id=${id}`
        }
        return api.get(`ListSales${filter}`)
    }

    static saveSale(sale: ISale) {
        return api.post('SaveSales', sale)
    }
}

export default SalesService