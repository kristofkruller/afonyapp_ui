import { ActionBtn } from "@/components/assets/Button";
import { FormInput, InputError } from "@/components/assets/Input";
import DropDown from "@/components/assets/DropDown";
import Loading from "@/components/assets/Loading";
import Logo from "@/components/assets/Logo";
import { Title, WarningBox } from "@/components/assets/TextStlye";
import FullPageFeedBack from "@/route/FullPageFeedBack";
import { useAuthStore } from "@/store/auth/useAuthStore";
import {
  useOrderOptions,
  useRegisterNewOrder,
} from "@/store/orders/useOrdersMutation";
import { useOrderStore } from "@/store/orders/useOrderStore";
import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { mailRegex, nickRegex, phoneRegex } from "@/helpers";
import { useUiStore } from "@/store/ui/useUiStore";
import type { PopUpProps } from "@/components/assets/PopUp";
import PopUp from "@/components/assets/PopUp";

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

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const handleDeliveryAddress = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setDeliveryAddress(e.target.value),
    []
  );
  const [name, setName] = useState("");
  const handleSetName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );
  const [phone, setPhone] = useState("");
  const handleSetPhone = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value),
    []
  );
  const [email, setEmail] = useState("");
  const handleSetEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const validateName = (value: string) =>
    value.length < 1
      ? "Üres név mező"
      : !nickRegex.test(value)
      ? "Hibás név formátum"
      : "";
  const validatePhone = (value: string) =>
    value.length < 1
      ? "Üres telefon mező"
      : !phoneRegex.test(value)
      ? "Hibás telefonszám formátum"
      : "";
  const validateEmail = (value: string) =>
    value.length < 1
      ? "Üres email mező"
      : !mailRegex.test(value)
      ? "Hibás email formátum"
      : "";
  const checkAddress = (value: string) =>
    value.length > 255
      ? "Túl hosszú cím"
      : value.length < 6 && methodId === "1"
      ? "Nem adtál meg címet (min. 6 karakter)"
      : "";
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
    deliveryAddress: "",
  });

  const resetState = () => {
    // setDeliveryAddress("");
    // setName("");
    // setPhone("");
    // setEmail("");
    setFormErrors({
      name: "",
      phone: "",
      email: "",
      deliveryAddress: "",
    });
  };

  const registerNewOrder = useRegisterNewOrder();

  const handleSubmitOrder = () => {
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    const emailError = validateEmail(email);
    const deliveryAddressError = checkAddress(deliveryAddress);
    if (nameError || phoneError || emailError || deliveryAddressError) {
      togglePopUp();
      setFormErrors({
        name: nameError,
        phone: phoneError,
        email: emailError,
        deliveryAddress: deliveryAddressError,
      });

      setTimeout(() => {
        resetState();
      }, 4000);

      return;
    }
    registerNewOrder.mutate({
      cropid: 1, // 1 by reg, admin func will dispatch to crop
      deliverytype: delivery_methods[0].content,
      deliveryCity: methodId === "1" ? delivery_options[0].id : 1,
      deliveryAddress: deliveryAddress,
      name: name,
      telephone: phone,
      amount: amount_options[0].id, // amountid
      status: "Beérkezett",
    });

    setPopUp(initialPopUpState);
    togglePopUp();
    navigate("/orderComplete");
  };

  // POPUP
  const initialPopUpState = {
    title: "",
    content: "",
    btnContent: [],
    sign: "",
  };
  const [popUp, setPopUp] = useState<PopUpProps>(initialPopUpState);
  const { togglePopUp } = useUiStore();
  const handleSubmitContent = () => {
    setPopUp(confirmSubmitContent);
    togglePopUp();
  };
  const handleCancel = () => {
    setPopUp(initialPopUpState);
    togglePopUp();
  };
  const confirmSubmitContent = {
    title: "Rendelés elküldése",
    content: `A rendelés elküldését követően feldolgozzuk a rendelésed.
      A rendelések feldolgozása érkezési sorrendben történik, az áfonya 
      természetes érési üteméhez igazodva. Amint rendelkezésünkre áll 
      a megfelelő mennyiségű friss termés a rendelésed teljesítéséhez, 
      e-mailben értesítünk a kiszállítás időpontjáról, illetve a 
      személyes átvétel lehetőségéről.`,
    btnContent: [
      {
        content: "Megerősítés",
        onClick: handleSubmitOrder,
      },
      {
        content: "Mégse",
        onClick: handleCancel,
      },
    ],
    sign: "alert_sign",
  };
  // AUTHGUARD
  if (!token || !user) return <Navigate to={"/unauthorized"} replace />;

  // RENDER
  if (isLoading && !error) return <Loading />;
  if (error)
    return <FullPageFeedBack content={error.message} btnContent="Vissza" />;

  return (
    <>
      <PopUp
        title={popUp.title}
        content={popUp.content}
        btnContent={popUp.btnContent}
        sign={popUp.sign}
      />
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
            <DropDown contents={amounts} onSelect={handleSelectAmount} />
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
                  name="deliveryaddress"
                  value={deliveryAddress}
                  placeholder="Cím további része"
                  onChange={handleDeliveryAddress}
                />
              </div>
            </>
          )}
          <WarningBox
            title={
              methodId === "1"
                ? `Várható szállítási költség ${delivery_options[0]?.cost} Ft`
                : "Vásárlók fogadása"
            }
            content={
              methodId === "1"
                ? `Helyi kistermelőként rendeléseket kizárólag a fenti listában szereplő
                  településekre áll módunkban kiszállítani. Megértésedet köszönjük!`
                : `Az átvétel pontos időpontjáról e-mailben fogunk értesítést küldeni, amint a termés átvehető. Kizárólag az e-mailben megjelölt időpontban tudunk vásárlókat fogadni, mivel a tanyán nem működik állandó nyitvatartás vagy kiszolgálóhely.`
            }
          />
          <div className="flex flex-col items-center justify-center [&_*]:text-indigo-600 [&_input]:max-w-[17ch] s:[&_input]:max-w-[23ch] gap-2 s:gap-0 text-sm [&>p]:text-center">
            <h2 className="font-bold text-base">
              {methodId === "1" ? "Átvevő " : "Megrendelő "}elérhetőségei
            </h2>
            <div className="profileForm flex-row items-center s:justify-center gap-2">
              <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                Név:
              </label>
              <FormInput name="name" value={name} onChange={handleSetName} />
            </div>
            <InputError error={formErrors.name} />

            <div className="profileForm flex-row items-center s:justify-center gap-2">
              <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                Telefon:
              </label>
              <FormInput name="phone" value={phone} onChange={handleSetPhone} />
            </div>
            <InputError error={formErrors.phone} />

            <div className="profileForm flex-row items-center s:justify-center gap-2">
              <label className="whitespace-nowrap s:!pl-4 s:!pr-1 s:!py-2">
                E-mail:
              </label>
              <FormInput
                type="email"
                name="email"
                value={email}
                onChange={handleSetEmail}
              />
            </div>
            <InputError error={formErrors.email} />
          </div>
        </section>
      </main>
      <h1 className="bg-indigo-200/60 w-screen !py-2 !mb-8 !mt-6 text-xl font-extrabold text-center">
        A rendelésed értéke {amount_options[0]?.cost} Ft
      </h1>
      <WarningBox
        title={`Köszönjük, hogy a Csemői Áfonyás Tanya áfonyáját választod!`}
        content="Az áfonya termése folyamatosan érik, ezért a rendelések szakaszosan, beérkezési sorrendben kerülnek kiszolgálásra. 
          Amint friss áfonyatermés elérhető, e-mailben értesítünk Téged a rendelés teljesítésének lehetőségéről."
        size="xl"
      />
      <div className="flex flex-col s:flex-row gap-4 !my-6">
        <ActionBtn content="Leadom a rendelést" onClick={handleSubmitContent} />
        <ActionBtn content="Vissza" onClick={handleBack} />
      </div>
    </>
  );
};

export default RegisterOrder;
