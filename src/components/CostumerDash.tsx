// import React from 'react'

import { useAuthStore } from "@/store/auth/useAuthStore";
import Logo from "./assets/Logo";
import { Title } from "./assets/TextStlye";

const CostumerDash = () => {

  const user = useAuthStore(s => s.user);

  return (
    <section className="wrapper">
      <Logo />
      <Title content={`Üdvözlünk ${user?.nick}!`} dark={true} />
      <div>CostumerDash</div>
    
    </section>
  
  
  );
};

export default CostumerDash;