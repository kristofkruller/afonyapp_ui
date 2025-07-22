import {
  memo,
  useId,
  useReducer,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ActionBtn } from "@/components/assets/Button";
import { mailRegex, strongPasswordRegex } from "@/helpers";

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

const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<FormAction>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof FormState, string>>>>,
  formdata: FormState
) => {
  const { name, value } = e.target;
  const field = name as keyof FormState;

  dispatch({ type: "SUBMIT", field, value });

  setErrors((prev) => ({ ...prev, [field]: "" }));

  if (field === "email") {
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, email: "Kérlek töltsd ki az email mezőt" }));
    } else if (!mailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Az email cím nem felel meg az elvárt formátumnak!",
      }));
    }
  }

  if (field === "pw") {
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, pw: "Kérlek töltsd ki a jelszó mezőt" }));
    } else if (!strongPasswordRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        pw: "A jelszónak tartalmaznia kell: nagybetű, kisbetű, szám, speciális karakter",
      }));
    } else if (formdata.email === value) {
      setErrors((prev) => ({ ...prev, pw: "Az email és jelszó nem egyezhet meg" }));
    }
  }

  if (field === "cpw") {
    if (value.length === 0) {
      setErrors((prev) => ({ ...prev, cpw: "Kérlek töltsd ki a megerősítő mezőt" }));
    } else if (formdata.pw !== value) {
      setErrors((prev) => ({
        ...prev,
        cpw: "A jelszavak nem egyeznek",
      }));
    }
  }
};

const handleSubmit = (
  e: FormEvent<HTMLFormElement>,
  form: FormState,
  setErrors: React.Dispatch<React.SetStateAction<Partial<Record<keyof FormState, string>>>>
) => {
  e.preventDefault();

  const fieldErrors: Partial<Record<keyof FormState, string>> = {};

  if (!form.email) fieldErrors.email = "Az email mező kitöltése kötelező";
  if (!form.pw) fieldErrors.pw = "A jelszó mező kitöltése kötelező";
  if (!form.cpw) fieldErrors.cpw = "A jelszó megerősítése kötelező";

  if (form.pw && form.cpw && form.pw !== form.cpw) {
    fieldErrors.cpw = "A jelszavak nem egyeznek meg";
  }

  if (form.email && !mailRegex.test(form.email)) {
    fieldErrors.email = "Helytelen email formátum";
  }

  if (form.pw && !strongPasswordRegex.test(form.pw)) {
    fieldErrors.pw = "Nem elég erős a jelszó";
  }

  if (form.email === form.pw) {
    fieldErrors.pw = "A jelszó nem egyezhet az email címmel";
  }

  if (Object.keys(fieldErrors).length > 0) {
    setErrors(fieldErrors);
    return;
  }

  setErrors({});
  console.debug("✅ Sikeres regisztráció:", form);
};


//SIGN UP
const SignUpForm = () => {
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [form, dispatch] = useReducer(formReducer, {
    email: "",
    pw: "",
    cpw: "",
  });

  const isDisabled =
    !form.email ||
    !form.pw ||
    !form.cpw ||
    Object.values(errors).some((msg) => msg && msg.length > 0) ||
    form.pw !== form.cpw;

  return (
    <form onSubmit={(e) => handleSubmit(e, form, setErrors)} className="wrapper space-y-2">
      <FormInput
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange(e, dispatch, setErrors, form)}
        placeholder="Email"
      />
      {errors.email && <p className="err">{errors.email}</p>}

      <FormInput
        name="pw"
        type="password"
        value={form.pw}
        onChange={(e) => handleChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó"
      />
      {errors.pw && <p className="err">{errors.pw}</p>}

      <FormInput
        name="cpw"
        type="password"
        value={form.cpw}
        onChange={(e) => handleChange(e, dispatch, setErrors, form)}
        placeholder="Jelszó megerősítése"
      />
      {errors.cpw && <p className="err">{errors.cpw}</p>}

      <ActionBtn type="submit" content="Regisztráció" disabled={isDisabled} />
    </form>
  );
};

//LOG IN
const LoginForm = () => {
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormState, string>>>({});
  const [form, dispatch] = useReducer(formReducer, {
    email: "",
    pw: "",
  });

  const handleLoginChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const field = name as keyof LoginFormState;

    dispatch({ type: "SUBMIT", field, value });

    setErrors((prev) => ({ ...prev, [field]: "" }));

    if (field === "email") {
      if (!value) {
        setErrors((prev) => ({ ...prev, email: "Kérlek töltsd ki az email mezőt" }));
      } else if (!mailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Az email cím formátuma hibás",
        }));
      }
    }

    if (field === "pw") {
      if (!value) {
        setErrors((prev) => ({ ...prev, pw: "Kérlek töltsd ki a jelszó mezőt" }));
      } else if (!strongPasswordRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          pw: "A jelszó formátuma nem megfelelő",
        }));
      }
    }
  };

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors: Partial<Record<keyof LoginFormState, string>> = {};
    if (!form.email) fieldErrors.email = "Email kötelező";
    if (!form.pw) fieldErrors.pw = "Jelszó kötelező";
    if (form.email && !mailRegex.test(form.email)) fieldErrors.email = "Helytelen email formátum";
    if (form.pw && !strongPasswordRegex.test(form.pw)) fieldErrors.pw = "Gyenge jelszó";

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    console.debug("✅ Sikeres bejelentkezés:", form);
  };

  const isDisabled =
    !form.email ||
    !form.pw ||
    Object.values(errors).some((msg) => msg && msg.length > 0);

  return (
    <form onSubmit={handleLoginSubmit} className="wrapper space-y-2">
      <FormInput
        name="email"
        type="text"
        value={form.email}
        onChange={handleLoginChange}
        placeholder="Email"
      />
      {errors.email && <p className="err">{errors.email}</p>}

      <FormInput
        name="pw"
        type="password"
        value={form.pw}
        onChange={handleLoginChange}
        placeholder="Jelszó"
      />
      {errors.pw && <p className="err">{errors.pw}</p>}

      <ActionBtn type="submit" content="Bejelentkezés" disabled={isDisabled} />
    </form>
  );
};

export { SignUpForm, LoginForm };
