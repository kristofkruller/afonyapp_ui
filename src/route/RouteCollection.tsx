import type { JSX } from "react";
import FullPageFeedBack from "./FullPageFeedBack";
import Dash from "./Dash";
import Profile from "@/components/user/Profile";
import RegisterOrder from "@/components/user/costumer/RegisterOrder";

type RouteCollection = {
  path: string;
  element: JSX.Element;
};

/**
 * Defines the structure for a route object, including its path and the React element to render.
 * @typedef {object} RouteCollection
 */
const RouteCollection: RouteCollection[] = [
  {
    path: "dashboard",
    element: <Dash />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
  {
    path: "order",
    element: <RegisterOrder />,
  },

  // FullPageFeedBack
  {
    path: "*",
    element: <FullPageFeedBack content="Ez az útvonal nem létezik" />,
  },
  {
    path: "activated",
    element: (
      <FullPageFeedBack
        content="Sikeresen aktiváltad a regisztrációdat, kérlek jelentkezz be"
        btnContent="Vissza a bejelentkezéshez"
      />
    ),
  },
  {
    path: "registered",
    element: (
      <FullPageFeedBack
        content="Sikeres regisztráció, kérlek nézd meg az emailed"
        btnContent="Vissza a bejelentkezéshez"
      />
    ),
  },
  {
    path: "unauthorized",
    element: (
      <FullPageFeedBack
        content="Sajnos nem tudtunk azonosítani, kérlek jelentkezz be ismét"
        btnContent="Vissza a bejelentkezéshez"
      />
    ),
  },
  {
    path: "pass",
    element: (
      <FullPageFeedBack
        content="Jelszó sikeresen megváltoztatva"
        btnContent="Vissza a bejelentkezéshez"
      />
    ),
  },
  {
    path: "del",
    element: (
      <FullPageFeedBack
        content="Felhasználó és minden hozzá kapcsolódó rendelés sikeresen törölve"
        btnContent="Vissza a bejelentkezéshez"
      />
    ),
  },
];

export default RouteCollection;
