import { useEffect, useReducer, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { useLogin } from "@/store/auth/useAuthMutation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { formReducer, handleFormChange } from "./authForm";
import { validateLoginFields } from "@/helpers";
import Loading from "@/components/assets/Loading";
import { ActionBtn } from "@/components/assets/Button";
import { FormInput, InputError } from "@/components/assets/Input";

const LoginForm = () => {
  const initialForm: LoginFormState = {
    email: "",
    password: "",
  };
  const [form, dispatch] = useReducer(formReducer, initialForm);
  const [errors, setErrors] = useState<Partial<LoginFormState>>({});

  const loginMutation = useLogin();
  const setToken = useAuthStore((s) => s.setToken);
  const isTokenValid = useAuthStore((s) => s.isTokenValid);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) navigate("/dashboard");
  }, [isTokenValid, navigate]);

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    // console.log(e)
    e.preventDefault();
    const validationErrors = validateLoginFields(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    loginMutation.mutate(
      {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      },
      {
        onSuccess: (data) => {
          if (data?.token) {
            setToken(data.token);
            dispatch({ type: "RESET", payload: initialForm });
          }
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
    loginMutation.isPending ||
    Object.values(errors).some(Boolean) ||
    !form.email ||
    !form.password;

  const [pending, setPending] = useState(false);

  useEffect(() => {
    let tId: number;

    if (loginMutation.isPending) {
      setPending(true);
      tId = setTimeout(() => {
        setPending(false);
      }, 650);
    } else {
      // ha a mutation befejeződik mielőtt letelne a timeout
      setPending(false);
    }

    return () => {
      if (tId) clearTimeout(tId);
    };
  }, [loginMutation.isPending]);

  return pending ? (
    <Loading />
  ) : (
    <form onSubmit={handleLoginSubmit} className="wrapper space-y-2">
      <FormInput
        name="email"
        type="text"
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

      <ActionBtn type="submit" content="Bejelentkezés" disabled={isDisabled} />
    </form>
  );
};

export default LoginForm;
