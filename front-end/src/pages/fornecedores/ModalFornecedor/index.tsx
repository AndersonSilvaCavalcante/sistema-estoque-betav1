import { useEffect, useState } from "react";

import { Button, Form, Modal } from "react-bootstrap";

import TFornecedores from "../types/TFornecedores";
import { ServiceFornecedor } from "../service";

type TProps = {
  show: boolean;
  title: string;
  handleClose: Function;
  fornecedorSelecionado: TFornecedores;
};

const ModalFornecedor = ({
  show,
  handleClose,
  title,
  fornecedorSelecionado,
}: TProps) => {
  const [name, setName] = useState<string>("");
  const [validateForm, setValidateForm] = useState(false);

  async function handleClick() {
    try {
      setValidateForm(true);
      if (title === "Cadastrar") {
        await ServiceFornecedor.createFornecedor(name);
      }
      if (title === "Editar") {
        const payload = {
          id_Fornecedor: fornecedorSelecionado.id_Fornecedor,
          name,
        };
        await ServiceFornecedor.editFornecedor(payload);
      }
      close();
    } catch {}
  }

  const close = () => {
    handleClose();
    setName("");
    setValidateForm(false);
  };

  useEffect(() => {
    if (fornecedorSelecionado.id_Fornecedor !== "") {
      setName(fornecedorSelecionado.name);
    }
  }, [fornecedorSelecionado]);

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{title} fornecedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validateForm}>
          <Form.Label>Nome* : </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event?.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            Preencha todos os campos obrigatórios.
          </Form.Control.Feedback>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClick}>{title}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ModalFornecedor };
