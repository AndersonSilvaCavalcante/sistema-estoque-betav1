import api from "./api"

class Client {
    static getListClients() {
        return api.get(`ListClient`)
    }

    static editClient(client: ICLient) {
        return api.put(`EditCLient?id=${client.id}`, client)
    }

}

export default Client