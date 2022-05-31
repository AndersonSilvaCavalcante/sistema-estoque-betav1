import { Route, Routes } from "react-router-dom";
import { basePages } from "../basePages";

import "./styles.scss";

const TheContent = () => {
  return (
    <div className="theContent">
      <Routes>
        {basePages.map((base, index) => (
          <Route key={index} path={base.patch} element={base.element} />
        ))}
      </Routes>
    </div>
  );
};

export { TheContent };
