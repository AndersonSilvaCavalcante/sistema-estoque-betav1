import { api } from "../../api";
import TFornecedores from "./types/TFornecedores";

class ServiceFornecedor {
  static findAll() {
    return api.get("/api/Fornecedor");
  }

  static createFornecedor(name: string) {
    console.log("name", name);
    return api.post("/api/Fornecedor", { name });
  }

  static editFornecedor(data: TFornecedores) {
    return api.put(`/api/Fornecedor/${data.id_Fornecedor}`, data);
  }

  static handleExcluir(id: string) {
    return api.delete(`/api/Fornecedor/${id}`);
  }
}

export { ServiceFornecedor };
