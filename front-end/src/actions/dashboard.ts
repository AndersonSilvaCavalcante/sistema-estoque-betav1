import api from "./api"

class DashboardService {
    static getNoticeProducts() {
        return api.get(`ListNoticeProducts`)
    }

    static getRecordStock() {
        return api.get(`ListRecordStock`)
    }

    static getResumeDay() {
        return api.get(`ResumeDay`)
    }

    static getResumeMonth() {
        return api.get(`ResumeMonth`)
    }

}

export default DashboardService