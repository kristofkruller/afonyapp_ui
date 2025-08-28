import { useState } from "react";

import SignUpForm from "@/components/welcome/SignUpForm";
import LoginForm from "@/components/welcome/LoginForm";
import { ActionBtn } from "@/components/assets/Button";
import Logo from "@/components/assets/Logo";

const WelcomeForm = () => {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => setSignUp(!signUp);

  return (
    <main className="main flexCenterCol">
      <Logo />
      {signUp ? <SignUpForm /> : <LoginForm />}
      <ActionBtn
        content={signUp ? "Vissza" : "Regisztráció"}
        onClick={handleSignUp}
      />
    </main>
  );
};

export default WelcomeForm;
