import { ActionBtn } from "@/components/assets/Button";
import { FormInput } from "@/components/assets/Input";
import DropDown from "@/components/assets/DropDown";
import Loading from "@/components/assets/Loading";
import Logo from "@/components/assets/Logo";
import { Title, WarningBox } from "@/components/assets/TextStlye";
import FullPageFeedBack from "@/route/FullPageFeedBack";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useOrderOptions } from "@/store/orders/useOrdersMutation";
import { useOrderStore } from "@/store/orders/useOrderStore";
import { useCallback, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Registering new order for the user's order list with details as shipping, and contact data of the recipient
 * @returns JSX.Element
 */
const RegisterOrder = () => {
  const {
    amount_options,
    delivery_options,
    delivery_methods,
    setAmounts,
    setDeliveries,
    methodId,
    selectAmount,
    setDeliveryMethod,
    selectCity,
    reset,
  } = useOrderStore((o) => o);
  const { isLoading, data, error } = useOrderOptions();

  useEffect(() => {
    if (!data) return;
    setAmounts(data.amount_options);
    setDeliveries(data.delivery_options);
  }, [data, setAmounts, setDeliveries]);

  const navigate = useNavigate();

  const { user, token } = useAuthStore((s) => s);

  const amounts = amount_options.map((value) => ({
    id: String(value.id),
    content: String(value.kg + " kg"),
  }));
  const deliveries = delivery_options.map((value) => ({
    id: String(value.id),
    content: String(value.city),
  }));

  // HANDLERS
  const handleSelectAmount = useCallback(
    (id: string) => selectAmount(id),
    [selectAmount]
  );

  const handleSetDeliveryMethod = useCallback(
    (id: string) => setDeliveryMethod(id),
    [setDeliveryMethod]
  );
  const handleBack = () => {
    reset();
    navigate("/dashboard");
  };

  // AUTHGUARD
  if (!token || !user) return <Navigate to={"/unauthorized"} replace />;

  // RENDER
  if (isLoading && !error) return <Loading />;
  if (error)
    return (
      <FullPageFeedBack
        content={error.message}
        btnContent="Vissza"
        navigateTo="/dashboard"
      />
    );

  return (
    <>
      <main
        className="flex flex-col justify-start s:justify-center
      items-center gap-2 max-w-screen s:max-w-90 !mb-2"
      >
        <Logo />
        <Title content="Áfonya rendelése" />
        <section className="flex flex-col gap-2">
          <div className="profileForm flex-col s:flex-row items-center s:justify-center gap-2">
            <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
              Hány kg áfonyát szeretnél?
            </label>
            <DropDown
              contents={amounts}
              onSelect={handleSelectAmount}
            />
          </div>
          <div className="profileForm flex-col s:flex-row items-center s:justify-center gap-2">
            <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
              Átvétel módja
            </label>
            <DropDown
              contents={delivery_methods}
              onSelect={handleSetDeliveryMethod}
            />
          </div>

          {/*IF WITH DELIVERY*/}
          {methodId === "1" && (
            <>
              <div className="profileForm flex-col s:flex-row items-center s:justify-center gap-2">
                <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                  Kiszállítás települése
                </label>
                <DropDown
                  contents={deliveries}
                  onSelect={(id) => selectCity(id)}
                />
              </div>
              <div className="profileForm flex-col s:flex-row items-center s:justify-center  [&>input]:w-90">
                {/* <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                  Cím további része
                </label> */}
                <FormInput
                  name=""
                  placeholder="Cím további része"
                  onChange={() => {}}
                />
              </div>
              <WarningBox
                title={`Várható szállítási költség ${delivery_options[0]?.cost} Ft`}
                content="Helyi kistermelőként rendeléseket kizárólag a fenti listában szereplő
                  településekre áll módunkban kiszállítani. Megértésedet köszönjük!"
              />

              <div className="flex flex-col items-center justify-center [&_*]:text-indigo-600 [&_input]:max-w-[17ch] s:[&_input]:max-w-[23ch] gap-2 s:gap-0 text-sm">
                <h2 className="font-bold text-base">Átvevő elérhetőségei</h2>
                <div className="profileForm flex-row items-center s:justify-center gap-2">
                  <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                    Név:
                  </label>
                  <FormInput name="" onChange={() => {}} />
                </div>
                <div className="profileForm flex-row items-center s:justify-center gap-2">
                  <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                    Telefon:
                  </label>
                  <FormInput name="" onChange={() => {}} />
                </div>
                <div className="profileForm flex-row items-center s:justify-center gap-2">
                  <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                    E-mail:
                  </label>
                  <FormInput name="" onChange={() => {}} />
                </div>
              </div>
            </>
          )}
        </section>
      </main>
      <WarningBox
        title={`Köszönjük, hogy a Csemői Áfonyás Tanya áfonyáját választod!`}
        content="Az áfonya termése folyamatosan érik, ezért a rendelések szakaszosan, beérkezési sorrendben kerülnek kiszolgálásra. 
          Amint friss áfonyatermés elérhető, e-mailben értesítünk Téged a rendelés teljesítésének lehetőségéről."
        size="xl"
      />
      <div className="flex flex-col s:flex-row gap-4 !my-6">
        <ActionBtn content="Leadom a rendelést" onClick={() => {}} />
        <ActionBtn content="Vissza" onClick={handleBack} />
      </div>
    </>
  );
};

export default RegisterOrder;
