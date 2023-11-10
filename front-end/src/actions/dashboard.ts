import api from "./api"

class DashboardService {

    static getDashboard() {
        return api.get(`ListDashboard`)
    }

    static getNoticeProducts() {
        return api.get(`ListNoticeProducts`)
    }

}

export default DashboardService