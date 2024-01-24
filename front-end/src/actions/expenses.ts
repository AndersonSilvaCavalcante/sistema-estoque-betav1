import api from "./api"

interface IPayload {
    firstDate: string,
    lastDate: string
}

class ExpenseService {
    static getListExpenses(payload: IPayload) {
        return api.get(`ListExpenses?firstDate=${payload.firstDate}&lastDate=${payload.lastDate}`)
    }

    static getExpense(id: IExpense["id"]) {
        return api.get(`ListExpenses?id=${id}`)
    }

    static saveExpense(expense: IExpense) {
        return api.post('SaveExpenses', expense)
    }

    static edittExpense(expense: IExpense) {
        return api.put(`EditExpense?id=${expense.id}`, expense)
    }

    static deleteExpense(id: IExpense["id"]) {
        return api.delete(`DeleteExpense?id=${id}`)
    }
}

export default ExpenseService