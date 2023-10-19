import { IFilter } from "@/app/orderServices/page"
import api from "./api"

class OrderService {
    static getListOrderService(filter: IFilter) {
        const { status, plateOrOrder } = filter
        return api.get(`ListOrderService?status=${status}&plateOrOrder=${plateOrOrder}`)
    }

    static saveOrderService(payload: IOrderService) {
        return api.post('SaveOrderService', payload)
    }

    static closeOrderService(id: number) {
        return api.put(`CloseOrderService?id=${id}`)
    }
}

export default OrderService