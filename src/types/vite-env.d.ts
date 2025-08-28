/// <reference types="vite/client" />

interface ErrorResponse {
  message: string;
}

// BTN
type BtnProp = {
  content: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// FORM
interface FormState {
  email: string;
  password: string;
  cpassword?: string;
}
type LoginFormState = {
  email: string;
  password: string;
};
type FormAction =
  | { type: "SUBMIT"; field: keyof FormState; value: string }
  | { type: "RESET"; payload: FormState };

type InputProps = {
  name: Extract<keyof FormState, string> | string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
};
