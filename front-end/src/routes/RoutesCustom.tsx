import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../contains/Layout";

const RoutesCustom = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RoutesCustom };
