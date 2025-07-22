import { Routes, Route } from "react-router-dom";

import WelcomeForm from "./route/WelcomeForm";

import RouteLayout from "./route/RouteLayout";
import AdminForm from "./route/AdminForm";
import CostumerForm from "./route/CostumerForm";

import RouteError from "./components/error/RouteError";
import WrongUrl from "./components/error/WrongUrl";

function App() {
  return (
    <Routes>
      <Route element={<RouteLayout />} errorElement={<RouteError />}>
        <Route index element={<WelcomeForm />} />
        <Route path="admin" element={<AdminForm />} />
        <Route path="costumer" element={<CostumerForm />} />
        <Route path="*" element={<WrongUrl />} />
      </Route>
    </Routes>
  );
}

export default App;
