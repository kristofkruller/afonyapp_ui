import {
  mailRegex,
  strongPasswordRegex
} from "@/helpers";

export const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SUBMIT":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return action.payload; // payload = initial state
    default:
      return state;
  }
};

export type HandleFormChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: React.Dispatch<FormAction>,
  setErrors: React.Dispatch<React.SetStateAction<Partial<FormState>>>,
  form: FormState
) => void;

export const handleFormChange: HandleFormChange = (e, dispatch, setErrors, form) => {
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