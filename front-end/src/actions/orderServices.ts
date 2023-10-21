import { IFilter } from "@/app/orderServices/page"
import api from "./api"

class OrderService {
    static getListOrderService(filter: IFilter) {
        const { status, plate, order } = filter
        let addFilter = `?status=${status}`
        
        if(plate){
            addFilter = addFilter + `&plate=${plate}`
        }

        if(order){
            addFilter = addFilter + `&order=${order}`
        }

        return api.get(`ListOrderService${addFilter}`)
    }

    static saveOrderService(payload: IOrderService) {
        return api.post('SaveOrderService', payload)
    }

    static closeOrderService(id: number) {
        return api.put(`CloseOrderService?id=${id}`)
    }
}

export default OrderService