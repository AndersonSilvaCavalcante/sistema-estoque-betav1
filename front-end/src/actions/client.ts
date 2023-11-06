import { IFilter } from "@/app/clients/page"
import api from "./api"

class Client {
    static getListClients(filter?: IFilter) {
        let filterBody = null
        if (filter) {
            filter.name !== '' ? filterBody = 'name=' + filter.name : null
            filter.id ? filterBody = `&id=` + filter.id : null
        }
        return api.get(`ListClient?${filterBody}`)
    }

    static saveClient(client: ICLient) {
        return api.post("/SaveClient", client)
    }

    static editClient(client: ICLient) {
        return api.put(`EditCLient?id=${client.id}`, client)
    }

}

export default Client