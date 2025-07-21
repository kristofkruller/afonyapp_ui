import { useState } from "react";
import { LoginForm, SignUpForm } from "@/components/Form";
import { ActionBtn } from "@/components/assets/Button";

const WelcomeForm = () => {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => setSignUp(!signUp);

  return (
    <main className="main">
      {signUp ? <SignUpForm /> : <LoginForm />}
      <ActionBtn
        content={signUp ? "Vissza" : "Regisztráció"}
        onClick={handleSignUp}
      />
    </main>
  );
};

export default WelcomeForm;
