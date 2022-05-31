import { Link } from "react-router-dom";
import "./styles.scss";
import { TheContent } from "./TheContent";

const Layout = () => {
  return (
    <div className="d-flex">
      <div className="menu">
        <Link to="/fornecedores" className="link">
          Fornecedores
        </Link>
      </div>
      <div className="conteudo">
        <TheContent />
      </div>
    </div>
  );
};

export { Layout };
