import { useState } from "react";

import SignUpForm from "@/components/welcome/SignUpForm";
import LoginForm from "@/components/welcome/LoginForm";
import { ActionBtn } from "@/components/assets/Button";
import Logo from "@/components/assets/Logo";

const WelcomeForm = () => {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => setSignUp(!signUp);

  /**
   * Renders the appropriate form (SignUpForm or LoginForm) based on the `signUp` state.
   * Also renders a button to toggle between the two forms.
   */
  return (
    <main className="main flexCenterCol">
      <Logo navigate={false} />
      {signUp ? <SignUpForm /> : <LoginForm />}
      <ActionBtn
        content={signUp ? "Vissza" : "Regisztráció"}
        onClick={handleSignUp}
      />
    </main>
  );
};

export default WelcomeForm;
