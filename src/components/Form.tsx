import {
  memo,
  useId,
  useReducer,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { ActionBtn } from "@/components/assets/Button";
import { strongPasswordRegex } from "@/helpers";

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
  dispatch: React.ActionDispatch<[action: FormAction]>,
  setErrors: React.Dispatch<React.SetStateAction<{ err: string }>>
) => {
  dispatch({
    type: "SUBMIT",
    field: e.target.name as keyof FormState,
    value: e.target.value,
  });

  if (e.target.name === "pw") {
    const value = e.target.value;

    if (value.length === 0) {
      // üres jelszómező — ne legyen hiba
      setErrors((prev) => ({ ...prev, err: "" }));
    } else if (!strongPasswordRegex.test(e.target.value)) {
      setErrors((prev) => ({
        ...prev,
        // pw: 'The password must be az least 8 characters long and must contain one uppercase letter, one lowercase letter, one number and one special character',
        err: "A jelszó 8 karakter hosszú kell legyen, szerepelnie kell nagybetűnek, kisbetűnek, számnak és speciális karakternek",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        err: "",
      }));
    }
  }
};

const handleSubmit = (e: FormEvent<HTMLFormElement>, form: FormState) => {
  e.preventDefault();
  if (form.pw !== form.cpw) {
    alert("A jelszavak nem egyeznek!");
    return;
  } else if (form.pw == form.email) {
    alert("A jelszó nem egyezhet más regisztrációs adattal!");
    return;
  }
  alert(`Regisztráció sikeres mint: ${JSON.stringify(form, null, 2)}`);
};

//SIGN UP
const SignUpForm = () => {
  const [errors, setErrors] = useState({
    err: "",
  });
  const [form, dispatch] = useReducer(formReducer, {
    email: "",
    pw: "",
    cpw: "",
  });

  return (
    <form onSubmit={(s) => handleSubmit(s, form)} className="wrapper">
      <FormInput
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => handleChange(e, dispatch, setErrors)}
        placeholder="Email"
      />
      <FormInput
        name="pw"
        type="password"
        value={form.pw}
        onChange={(e) => handleChange(e, dispatch, setErrors)}
        placeholder="Jelszó"
      />
      <FormInput
        name="cpw"
        type="password"
        value={form.cpw}
        onChange={(e) => handleChange(e, dispatch, setErrors)}
        placeholder="Jelszó megerősítése"
      />
      {form.pw.length > 0 && errors.err && (
        <p className="mt-1 text-xs text-fuchsia-800/70">{errors.err}</p>
      )}
      <ActionBtn
        type="submit"
        content="Regisztráció"
        disabled={
          (form.pw.length > 0 && errors.err !== "") ||
          form.pw.length < 8 ||
          form.email.length < 5
        }
      />
    </form>
  );
};

//LOG IN
const LoginForm = () => {
  const [errors, setErrors] = useState({
    err: "",
  });
  const [form, dispatch] = useReducer(formReducer, {
    email: "",
    pw: "",
  });

  return (
    <form onSubmit={(s) => handleSubmit(s, form)} className="wrapper">
      <FormInput
        name="email"
        type="text"
        value={form.email}
        onChange={(e) => handleChange(e, dispatch, setErrors)}
        placeholder="Email"
      />
      <FormInput
        name="pw"
        type="password"
        value={form.pw}
        onChange={(e) => handleChange(e, dispatch, setErrors)}
        placeholder="Jelszó"
      />
      {form.pw.length > 0 && errors.err && (
        <p className="mt-1 text-xs text-fuchsia-800/70">{errors.err}</p>
      )}
      <ActionBtn type="submit" content="bejelentkezés" />
    </form>
  );
};

export { SignUpForm, LoginForm };
