export const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Kötelező @ karakter, Nem enged "üres" neveket vagy domaineket (@.com, @gmail, stb.), 
// Nem enged érvénytelen karaktereket (.., @-, stb.), Elfogad pl. user.name+tag@gmail.com, 
// user@sub.domain.co, stb., Minimális hosszt és strukturáltságot elvár
export const mailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateLoginFields = (form: LoginFormState) => {
  const errors: Partial<LoginFormState> = {};

  if (!form.email) errors.email = "Email kötelező";
  else if (!mailRegex.test(form.email)) errors.email = "Hibás email formátum";

  if (!form.password) errors.password = "Jelszó kötelező";

  return errors;
};

export const validateRegisterFields = (form: FormState) => {
  const errors: Partial<FormState> = {};

  if (!form.email) errors.email = "Email kötelező";
  else if (!mailRegex.test(form.email)) errors.email = "Hibás email formátum";

  if (!form.password) errors.password = "Jelszó kötelező";
  else if (!strongPasswordRegex.test(form.password))
    errors.password = "A jelszónak tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert";

  if (!form.cpassword) errors.cpassword = "Jelszó megerősítés kötelező";
  else if (form.password !== form.cpassword) errors.cpassword = "A jelszavak nem egyeznek";

  if (form.password === form.email) errors.password = "A jelszó nem egyezhet az email címmel";

  return errors;
};