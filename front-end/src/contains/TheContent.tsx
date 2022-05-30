import { Route, Routes } from "react-router-dom";
import { basePages } from "../basePages";

const TheContent = () => {
  return (
    <div>
      <Routes>
        {basePages.map((base, index) => (
          <Route key={index} path={base.patch} element={base.element} />
        ))}
      </Routes>
    </div>
  );
};

export { TheContent };
