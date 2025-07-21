/// <reference types="vite/client" />

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
  pw: string;
  cpw?: string;
}
type FormAction = {
  type: "SUBMIT";
  field: keyof FormState;
  value: string;
};
type InputProps = {
  name: Extract<keyof FormState, string>;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};
