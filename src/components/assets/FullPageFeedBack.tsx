import { useNavigate } from "react-router-dom";
import { ActionBtn } from "@/components/assets/Button";
import Logo from "./Logo";
import { useEffect, useState } from "react";

type Props = {
  content: string;
  btnContent?: string;
  navigateTo?: string;
}

const FullPageFeedBack = ({ content, btnContent = "Vissza a kezdőlapra", navigateTo = "/" }: Props) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);


  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);
    const timer = setTimeout(() => {
      navigate(navigateTo);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    }
  }, [navigate, navigateTo])
  

  return (
    <section className="main">
    <Logo />
    <div className="wrapper text-slate-400 dark:text-neutral-50 uppercase">
      <span className="!mb-2 !mx-2 min-w-35 lg:min-w-40 text-m text-center text-white font-semibold uppercase tracking-widest">
        {content}
      </span>
      <p className="text-sm text-center text-slate-300 dark:text-neutral-300 !my-2">
        Átirányítás {count} másodperc múlva...
      </p>
      <ActionBtn content={btnContent} onClick={() => navigate(navigateTo)} />
    </div>
    </section>
  );
};

export default FullPageFeedBack;
