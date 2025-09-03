import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "./store/auth/useAuthStore";

import WelcomeForm from "./route/WelcomeForm";
import RouteLayout from "./route/RouteLayout";
import RouteError from "./components/error/RouteError";

import RouteCollection from "./route/RouteCollection";

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
        {RouteCollection.map(({ path, element }) => (
          <Route path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
