import { useNavigate } from "react-router-dom";
import { ActionBtn } from "@/components/assets/Button";

type Props = {
  content: string;
  btnContent?: string;
  navigateTo?: string;
}

const FullPageFeedBack = ({ content, btnContent = "Vissza a kezdőlapra", navigateTo = "/" }: Props) => {
  const navigate = useNavigate();

  return (
    <section className="wrapper text-slate-400 dark:text-neutral-50 uppercase w-full">
      <span className="mb-20 text-xl !m-5">{content}</span>
      <ActionBtn content={btnContent} onClick={() => navigate(navigateTo)} />
    </section>
  );
};

export default FullPageFeedBack;
