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

/**
 * Handles changes in form input fields, updates the form state, and performs client-side validation.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
 * @param {React.Dispatch<FormAction>} dispatch - The dispatch function from `useReducer` to update the form state.
 * @param {React.Dispatch<React.SetStateAction<Partial<FormState>>>} setErrors - The state setter for form errors.
 * @param {FormState} form - The current state of the form.
 */
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