import { useEffect, useReducer, useState, type FormEvent } from "react";
import type { AxiosError } from "axios";

import { ActionBtn, FormInput } from "@/components/assets/Button";
import Loading from "@/components/assets/Loading";
import { InputError } from "@/components/error/DashError";
import {
  mailRegex,
  strongPasswordRegex,
  validateLoginFields,
  validateRegisterFields,
} from "@/helpers";
import { useLogin, useRegister } from "@/store/auth/useAuthMutation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.payload; // payload = initial state
    default:
      return state;
  }
};

type HandleFormChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<FormAction>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormState>>>,
  form: FormState
) => void;

const handleFormChange: HandleFormChange = (e, dispatch, setErrors, form) => {
  const { name, value } = e.target;
  const field = name as keyof FormState;

  dispatch({ type: "SUBMIT", field, value });

  setErrors((prev) => {
    const newErrors = { ...prev };
    delete newErrors[field];

    if (field === "email") {
      if (!value) newErrors.email = "Az email mező kötelező";
      else if (!mailRegex.test(value)) newErrors.email = "Hibás email formátum";
    }

    if (field === "password") {
      if (!value) newErrors.password = "A jelszó mező kötelező";
      else if (!strongPasswordRegex.test(value)) {
        newErrors.password = `A minimum 8 karakteres jelszónak tartalmaznia kell nagybetűt, kisbetűt, 
          számot és speciális karaktert`;
      }
    }

    if (field === "cpassword") {
      if (!value) newErrors.cpassword = "A jelszó megerősítése kötelező";
      else if (value !== form.password) {
        newErrors.cpassword = "A jelszavak nem egyeznek";
      }
    }

    return newErrors;
  });
};

//SIGN UP
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

//LOG IN
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

export { SignUpForm, LoginForm };
