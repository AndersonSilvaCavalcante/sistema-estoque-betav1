import api from "./api"

class DashboardService {

    static getDashboard() {
        return api.get(`ListDashboard`)
    }

}

export default DashboardService