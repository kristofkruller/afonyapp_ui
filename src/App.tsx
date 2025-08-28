import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "./store/auth/useAuthStore";

import Dash from "./route/Dash";
import WelcomeForm from "./route/WelcomeForm";
import RouteLayout from "./route/RouteLayout";
import RouteError from "./components/error/RouteError";
import FullPageFeedBack from "./route/FullPageFeedBack";
import Profile from "./components/costumer/Profile";

function App() {
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      document.body.classList.add("animate-bg");
      document.body.classList.remove("white-bg");
    } else {
      document.body.classList.remove("animate-bg");
      document.body.classList.add("white-bg");
    }
    return () => {
      document.body.classList.remove("animate-bg");
      document.body.classList.remove("white-bg");
    };
  }, [user]);

  return (
    <Routes>
      <Route element={<RouteLayout />} errorElement={<RouteError />}>
        <Route index element={<WelcomeForm />} />
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
        <Route path="dashboard" element={<Dash />} />
        <Route path="profile" element={<Profile />} />

        <Route
          path="*"
          element={<FullPageFeedBack content="Ez az útvonal nem létezik" />}
        />
        <Route
          path="unauthorized"
          element={
            <FullPageFeedBack
              content="Sajnos nem tudtunk azonosítani, kérlek jelentkezz be ismét"
              btnContent="Vissza a bejelentkezéshez"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
