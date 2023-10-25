import api from "./api"

class SalesService {
    static getListSales(id: number | string) {
        let filter = ''
        if (id !== '') {
            filter = `?id=${id}`
        }
        return api.get(`ListSales${filter}`)
    }
}

export default SalesService