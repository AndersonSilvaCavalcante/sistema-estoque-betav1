import api from "./api"

interface IPayload {
    firstDate: string,
    lastDate: string
}

class ExpenseService {
    static getListExpenseS(payload: IPayload) {
        return api.get(`ListExpenses?firstDate=${payload.firstDate}&lastDate=${payload.lastDate}`)
    }

    static saveExpense(expense: IExpense) {
        return api.post('SaveExpenses', expense)
    }
}

export default ExpenseService