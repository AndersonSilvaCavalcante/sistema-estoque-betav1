import api from "./api"

class ExpenseService {
    static getListExpenseS() {
        return api.get(`ListExpenses`)
    }

    static saveExpense(expense: IExpense) {
        return api.post('SaveExpenses', expense)
    }
}

export default ExpenseService