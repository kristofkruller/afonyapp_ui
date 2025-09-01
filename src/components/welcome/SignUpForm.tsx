import { useReducer, useState, type FormEvent } from "react";
import type { AxiosError } from "axios";

import { formReducer, handleFormChange } from "./authForm";
import { useRegister } from "@/store/auth/useAuthMutation";
import { validateRegisterFields } from "@/helpers";
import { ActionBtn, FormInput } from "@/components/assets/Button";
import Loading from "@/components/assets/Loading";
import { InputError } from "@/components/error/DashError";

const SignUpForm = () => {
  const initialForm: FormState = {
    email: "",
    password: "",
    cpassword: "",
  };
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const registerMutation = useRegister();

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterFields(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerMutation.mutate(
      {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      },
      {
        onSuccess: () => {
          console.debug(`reg ✅`);
          dispatch({ type: "RESET", payload: initialForm });
        },
        onError: (error: AxiosError<ErrorResponse>) => {
          setErrors({
            email: error?.response?.data?.message || "Ismeretlen hiba",
          });
          dispatch({ type: "RESET", payload: initialForm });
        },
      }
    );
  };

  const isDisabled =
    registerMutation.isPending ||
    Object.values(errors).some(Boolean) ||
    !form.email ||
    !form.password ||
    !form.cpassword;

  return registerMutation.isPending ? (
    <Loading />
  ) : (
    <form onSubmit={handleRegisterSubmit} className="wrapper space-y-2">
      <FormInput
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => handleFormChange(e, dispatch, setErrors, form)}
        placeholder="Email"
      />
      <InputError error={errors.email} />

      <FormInput
        name="password"
        type="password"
        value={form.password}
        onChange={(e) => handleFormChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó"
      />
      <InputError error={errors.password} />

      <FormInput
        name="cpassword"
        type="password"
        value={form.cpassword}
        onChange={(e) => handleFormChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó megerősítése"
      />
      <InputError error={errors.cpassword} />

      <ActionBtn type="submit" content="Regisztráció" disabled={isDisabled} />
    </form>
  );
};

export default SignUpForm;
