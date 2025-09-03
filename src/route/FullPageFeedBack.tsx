import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionBtn } from "@/components/assets/Button";
import Logo from "@/components/assets/Logo";
import { Title } from "@/components/assets/TextStlye";

type Props = {
  content: string;
  btnContent?: string;
  navigateTo?: string;
};

const FullPageFeedBack = ({
  content,
  btnContent = "Vissza a kezdőlapra",
  navigateTo = "/"
}: Props) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    const timer = setTimeout(() => {
      navigate(navigateTo);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate, navigateTo]);

  const dark = document.body.classList.contains("animate-bg");

  return (
    <section className="main flexCenterCol">
      <Logo />
      <div className="wrapper text-slate-400 uppercase">
        <Title content={content}/>
        <p className={`text-sm text-center ${!dark ? "text-indigo-400" : "text-slate-300"} !my-4`}>
          Átirányítás {count} másodperc múlva...
        </p>
        <ActionBtn content={btnContent} onClick={() => navigate(navigateTo)} />
      </div>
    </section>
  );
};

export default FullPageFeedBack;
