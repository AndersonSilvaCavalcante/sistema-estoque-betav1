import api from "./api"

class OrderService {
    static getListOrderService() {
        return api.get(``)
    }
}

export default OrderService