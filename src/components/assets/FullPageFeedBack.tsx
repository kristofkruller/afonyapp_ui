import { useNavigate } from "react-router-dom";
import { ActionBtn } from "@/components/assets/Button";
import Logo from "./Logo";

type Props = {
  content: string;
  btnContent?: string;
  navigateTo?: string;
}

const FullPageFeedBack = ({ content, btnContent = "Vissza a kezdőlapra", navigateTo = "/" }: Props) => {
  const navigate = useNavigate();

  return (
    <section className="main">
    <Logo />
    <div className="wrapper text-slate-400 dark:text-neutral-50 uppercase">
      <span className="!mb-2 !mx-2 min-w-35 lg:min-w-40 text-m text-center text-white font-semibold uppercase tracking-widest">{content}</span>
      <ActionBtn content={btnContent} onClick={() => navigate(navigateTo)} />
    </div>
    </section>
  );
};

export default FullPageFeedBack;
