import { IFilter } from "@/app/orderServices/page"
import api from "./api"

class OrderService {
    static getListOrderService(filter: IFilter) {
        const { status, plate, order, clientId } = filter
        let addFilter = `?status=${status}`

        if (plate) {
            addFilter = addFilter + `&plate=${plate}`
        }

        if (order) {
            addFilter = addFilter + `&order=${order}`
        }

        if (clientId) {
            addFilter = addFilter + `&clientId=${clientId}`
        }


        return api.get(`ListOrderService${addFilter}`)
    }

    static saveOrderService(payload: IOrderService) {
        return api.post('SaveOrderService', payload)
    }

    static editOrderService(id: string, payload: IOrderService) {
        return api.put(`EditOrderService?id=${id}`, payload)
    }

    static closeOrderService(id: number) {
        return api.put(`CloseOrderService?id=${id}`)
    }
}

export default OrderService