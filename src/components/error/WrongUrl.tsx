import { useNavigate } from "react-router-dom";
import { ActionBtn } from "@/components/assets/Button";

const WrongUrl = () => {
  const navigate = useNavigate();

  return (
    <section className="wrapper text-slate-400 dark:text-neutral-50 uppercase w-full">
      <span className="mb-20 text-xl !m-5">Ez az útvonal nem létezik</span>
      <ActionBtn content="Vissza a kezdőlapra" onClick={() => navigate("/")} />
    </section>
  );
};

export default WrongUrl;
