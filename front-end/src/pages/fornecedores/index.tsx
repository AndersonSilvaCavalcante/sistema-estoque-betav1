import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { BsFillTrash2Fill, BsFillPencilFill } from "react-icons/bs";
import { ModalExcluir } from "../../components/ModalExcluir";
import { ModalFornecedor } from "./ModalFornecedor";

import { ServiceFornecedor } from "./service";
import TFornecedores from "./types/TFornecedores";

const fornecedorSelecionadooInicial = {
  id_Fornecedor: "",
  name: "",
};

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState<TFornecedores[]>([]);
  const [fornecedorSelecionadoo, setFornecedorSelecionadoo] =
    useState<TFornecedores>(fornecedorSelecionadooInicial);

  const [openModalFornecedor, setOpenMOdalFornecedor] =
    useState<boolean>(false);
  const [openModalExcluir, setOpenModalExcluir] = useState<boolean>(false);

  const [titleModal, setTitleModal] = useState<string>("");

  async function findAllFornecedores() {
    try {
      const { data } = await ServiceFornecedor.findAll();
      setFornecedores(data);
    } catch {}
  }

  async function handleExcluir() {
    try {
      await ServiceFornecedor.handleExcluir(
        fornecedorSelecionadoo.id_Fornecedor
      );
      cloneModalExcluir();
    } catch {}
  }

  function editar(data: TFornecedores) {
    setFornecedorSelecionadoo(data);
    setOpenMOdalFornecedor(true);
    setTitleModal("Editar");
  }

  function cadastrar() {
    setOpenMOdalFornecedor(true);
    setTitleModal("Cadastrar");
  }

  function opennModalExcluir(data: TFornecedores) {
    setFornecedorSelecionadoo(data);
    setOpenModalExcluir(true);
  }

  const cloneModalFornecedor = () => {
    setOpenMOdalFornecedor(false);
    setFornecedorSelecionadoo(fornecedorSelecionadooInicial);
  };

  const cloneModalExcluir = () => {
    setOpenModalExcluir(false);
    setFornecedorSelecionadoo(fornecedorSelecionadooInicial);
  };

  useEffect(() => {
    findAllFornecedores();
  }, [openModalFornecedor, openModalExcluir]);

  return (
    <div>
      <div className="justify-space-between d-flex mb-5">
        <h4>Forncedores</h4>
        <Button onClick={cadastrar}>Cadastrar</Button>
      </div>
      <div>
        <table className="w-100">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="w-25">Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor, index) => (
              <tr key={index}>
                <td>{fornecedor.name}</td>
                <td>
                  <BsFillPencilFill
                    className="mr-2 icon"
                    onClick={() => editar(fornecedor)}
                  />
                  <BsFillTrash2Fill
                    className="icon"
                    onClick={() => opennModalExcluir(fornecedor)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalFornecedor
        show={openModalFornecedor}
        handleClose={cloneModalFornecedor}
        title={titleModal}
        fornecedorSelecionado={fornecedorSelecionadoo}
      />

      <ModalExcluir
        show={openModalExcluir}
        handleClose={cloneModalExcluir}
        handleExcluir={handleExcluir}
      />
    </div>
  );
};

export { Fornecedores };
