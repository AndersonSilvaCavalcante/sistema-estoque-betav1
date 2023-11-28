import api from "./api"

class ExpenseService {
    static getListExpenseS(id: number | undefined) {
        let filter = ''
        if (id) {
            filter = `?id=${id}`
        }
        return api.get(`ListSales${filter}`)
    }

    static saveExpense(expense: IExpense) {
        return api.post('SaveExpenses', expense)
    }
}

export default ExpenseService