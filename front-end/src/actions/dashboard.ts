import api from "./api"

class DashboardService {

    static getDashboard() {
        return api.get(`ListDashboard`)
    }

    static getNoticeProducts() {
        return api.get(`ListNoticeProducts`)
    }

    static getRecordStock() {
        return api.get(`ListRecordStock`)
    }
}

export default DashboardService