import { Routes, Route } from "react-router-dom";

import WelcomeForm from "./route/WelcomeForm";

import RouteLayout from "./route/RouteLayout";
import AdminForm from "./route/AdminForm";
import CostumerForm from "./route/CostumerForm";

import RouteError from "./components/error/RouteError";
import FullPageFeedBack from "./components/assets/FullPageFeedBack";

function App() {
  return (
    <Routes>
      <Route element={<RouteLayout />} errorElement={<RouteError />}>
        <Route index element={<WelcomeForm />} />
        <Route path="admin" element={<AdminForm />} />
        <Route path="costumer" element={<CostumerForm />} />
        <Route
          path="activated"
          element={
            <FullPageFeedBack
              content="Sikeresen aktiváltad a regisztrációdat, kérlek jelentkezz be"
              btnContent="Vissza a bejelentkezéshez"
            />
          }
        />
        <Route
          path="registered"
          element={
            <FullPageFeedBack
              content="Sikeres regisztráció, kérlek nézd meg az emailed"
              btnContent="Vissza a bejelentkezéshez"
            />
          }
        />
        <Route
          path="*"
          element={
            <FullPageFeedBack
              content="Ez az útvonal nem létezik"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
