import {
  isRouteErrorResponse,
  useRouteError,
} from "react-router-dom";
import FullPageFeedBack from "@/route/FullPageFeedBack";

const RouteError = () => {
  const error = useRouteError();

  let res = "Hoppá, valami hiba történt, amit a rendszer nem tudott kezelni.";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 400:
        res = "Hibás kérés, ellenőrizd az adataidat. (400)";
        break;
      case 401:
        res = "Nincs jogosultságod ehhez a művelethez. (401)";
        break;
      case 403:
        res = "Hozzáférés megtagadva, nincs elég jogosultságod. (403)";
        break;
      case 404:
        res = "Az oldal nem található. (404)";
        break;
      case 405:
        res = "A kért metódus nem engedélyezett ezen az erőforráson. (405)";
        break;
      case 408:
        res = "Időtúllépés, a kérés túl sokáig tartott. (408)";
        break;
      case 409:
        res =
          "Ütközés, az adatok már létezhetnek vagy nem megfelelő állapotban vannak. (409)";
        break;
      case 410:
        res = "Ez az erőforrás véglegesen eltávolítva lett. (410)";
        break;
      case 418:
        res = "A szerver egy teáskanna, nem tud kávét főzni. (418)";
        break;
      case 429:
        res = "Túl sok kérés, próbáld újra később. (429)";
        break;
      case 500:
        res = "Belső szerverhiba, valami elromlott. (500)";
        break;
      case 502:
        res =
          "Hibás átjáró, a háttérrendszer nem válaszolt megfelelően. (502)";
        break;
      case 503:
        res = "Szolgáltatás nem elérhető, próbáld újra később. (503)";
        break;
      case 504:
        res =
          "Átjáró időtúllépés, a háttérrendszer túl lassan válaszolt. (504)";
        break;
      default:
        res = `Ismeretlen hiba történt (${error.status}), kérlek próbáld újra.`;
        break;
    }
  }

  return (
    <FullPageFeedBack content={res} />
  );
};

export default RouteError;
