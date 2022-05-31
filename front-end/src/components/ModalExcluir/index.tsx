import { Button, Modal } from "react-bootstrap";
import { LottieCustom } from "../LottieCustom";

type TProps = {
  show: boolean;
  handleClose: Function;
  handleExcluir: Function;
};

const ModalExcluir = ({ show, handleClose, handleExcluir }: TProps) => {
  return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Body>
        <div>
          <LottieCustom name="close" width="139px" height="133px" />
          Certeza que deseja excluir este item?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleExcluir()}>Excluir</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ModalExcluir };
