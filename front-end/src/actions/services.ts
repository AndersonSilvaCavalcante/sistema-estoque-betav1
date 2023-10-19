import api from "./api"

class Services {
    static getListServices() {
        return api.get(`ListServices`)
    }
}

export default Services