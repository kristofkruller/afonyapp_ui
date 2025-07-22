import { memo, useId, useReducer, useState, type FormEvent } from "react";
import { ActionBtn } from "@/components/assets/Button";
import {
  mailRegex,
  strongPasswordRegex,
  validateLoginFields,
  validateRegisterFields,
} from "@/helpers";
import { useLogin, useRegister } from "@/store/auth/useAuthMutation";
import { useAuthStore } from "@/store/auth/useAuthStore";

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

// --- Input mező komponens (memozott!) ---
const FormInput = memo(
  ({ name, type = "text", value, onChange, placeholder }: InputProps) => {
    const inputId = useId();

    return (
      <input
        className="bg-white/20 !p-2 rounded-[10px]"
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={true}
        placeholder={placeholder}
      />
    );
  }
);

FormInput.displayName = "FormInput"; // memóhoz

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

    if (field === "pw") {
      if (!value) newErrors.pw = "A jelszó mező kötelező";
      else if (!strongPasswordRegex.test(value)) {
        newErrors.pw =
          `A minimum 8 karakteres jelszónak tartalmaznia kell nagybetűt, kisbetűt, 
          számot és speciális karaktert`;
      }
    }

    if (field === "cpw") {
      if (!value) newErrors.cpw = "A jelszó megerősítése kötelező";
      else if (value !== form.pw) {
        newErrors.cpw = "A jelszavak nem egyeznek";
      }
    }

    return newErrors;
  });
};

const InputError = ({ error }: { error?: string }) =>
  error ? <p className="err">{error}</p> : null;

//SIGN UP
const SignUpForm = () => {
  const [form, dispatch] = useReducer(formReducer, {
    email: "",
    pw: "",
    cpw: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const registerMutation = useRegister();
  const setToken = useAuthStore((s) => s.setToken);

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterFields(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    registerMutation.mutate(
      { email: form.email, pw: form.pw },
      {
        onSuccess: (data) => {
          if (data?.token) {
            setToken(data.token);
            console.debug("✅ Regisztráció sikeres, token mentve.");
          } else if (data?.message) {
            setErrors({ email: data.message });
          }
        },
        onError: (error: any) => {
          setErrors({
            email: error?.response?.data?.message || "Ismeretlen hiba",
          });
        },
      }
    );
  };

  const isDisabled =
    registerMutation.isPending ||
    Object.values(errors).some(Boolean) ||
    !form.email ||
    !form.pw ||
    !form.cpw;

  return (
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
        name="pw"
        type="password"
        value={form.pw}
        onChange={(e) => handleFormChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó"
      />
      <InputError error={errors.pw} />

      <FormInput
        name="cpw"
        type="password"
        value={form.cpw}
        onChange={(e) => handleFormChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó megerősítése"
      />
      <InputError error={errors.cpw} />

      <ActionBtn type="submit" content="Regisztráció" disabled={isDisabled} />
    </form>
  );
};

//LOG IN

const LoginForm = () => {
  const [form, dispatch] = useReducer(formReducer, { email: "", pw: "" });
  const [errors, setErrors] = useState<Partial<LoginFormState>>({});

  const loginMutation = useLogin();
  const setToken = useAuthStore((s) => s.setToken);

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginFields(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    loginMutation.mutate(
      { email: form.email, pw: form.pw },
      {
        onSuccess: (data) => {
          if (data?.token) {
            setToken(data.token);
          } else if (data?.message) {
            setErrors({ email: data.message });
          }
        },
        onError: (error: any) => {
          setErrors({
            email: error?.response?.data?.message || "Ismeretlen hiba",
          });
        },
      }
    );
  };

  const isDisabled =
    loginMutation.isPending ||
    Object.values(errors).some(Boolean) ||
    !form.email ||
    !form.pw;

  return (
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
        name="pw"
        type="password"
        value={form.pw}
        onChange={(e) => handleFormChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó"
      />
      <InputError error={errors.pw} />

      <ActionBtn type="submit" content="Bejelentkezés" disabled={isDisabled} />
    </form>
  );
};

export { SignUpForm, LoginForm };
