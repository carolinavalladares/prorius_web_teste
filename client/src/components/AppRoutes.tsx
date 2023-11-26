import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Details from "../pages/Details";
import Edit from "../pages/Edit";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/user/:userId" element={<Details />} />
      <Route path="/user/:userId/edit" element={<Edit />} />
    </Routes>
  );
};

export default AppRoutes;
