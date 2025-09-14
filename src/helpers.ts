// REGEX
/**
 * Regex for validating strong passwords.
 * Requires at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.
 */
export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Kötelező @ karakter, Nem enged "üres" neveket vagy domaineket (@.com, @gmail, stb.),
// Nem enged érvénytelen karaktereket (.., @-, stb.), Elfogad pl. user.name+tag@gmail.com,
// user@sub.domain.co, stb., Minimális hosszt és strukturáltságot elvár
export const mailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Regex for validating nicknames.
 * Allows Hungarian letters, English letters, numbers, and has a length constraint of 3 to 24 characters.
 */
export const nickRegex = /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9]{3,24}$/;

/**
 * Regex for validating Hungarian phone numbers.
 * Supports formats starting with +36 or 06, with optional hyphens or spaces, and various digit groupings.
 * Examples: +36 20 123 4567, 06-30-123-4567, 06201234567.
 */
export const phoneRegex =
  /^(?:\+?36|06)[-\s]?(\d{1,2})[-\s]?(\d{3})[-\s]?(\d{3,4})$/;

// HELPERS
/**
 * Formats a date string from "YYYY-MM-DDTHH:MM:SS.sssZ" to "YYYY.MM.DD HH:MM".
 *
 * @param {string} date - The date string to format.
 * @returns {string} The formatted date string.
 */
export const formattedDate = (date: string) => {
  return date.replace(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
    "$1.$2.$3 $4:$5"
  );
};

/**
 * Validates the fields of a login form.
 * @param {LoginFormState} form - The login form data.
 * @returns {Partial<LoginFormState>} An object containing validation errors, if any.
 */
export const validateLoginFields = (form: LoginFormState) => {
  const errors: Partial<LoginFormState> = {};

  if (!form.email) errors.email = "Email kötelező";
  else if (!mailRegex.test(form.email)) errors.email = "Hibás email formátum";

  if (!form.password) errors.password = "Jelszó kötelező";

  return errors;
};

/**
 * Validates the fields of a registration form.
 * @param {FormState} form - The registration form data.
 * @returns {Partial<FormState>} An object containing validation errors, if any.
 */
export const validateRegisterFields = (form: FormState) => {
  const errors: Partial<FormState> = {};

  if (!form.email) errors.email = "Email kötelező";
  else if (!mailRegex.test(form.email)) errors.email = "Hibás email formátum";

  if (!form.password) errors.password = "Jelszó kötelező";
  else if (!strongPasswordRegex.test(form.password))
    errors.password =
      "A jelszónak tartalmaznia kell kisbetűt, nagybetűt, számot és speciális karaktert";

  if (!form.cpassword) errors.cpassword = "Jelszó megerősítés kötelező";
  else if (form.password !== form.cpassword)
    errors.cpassword = "A jelszavak nem egyeznek";

  if (form.password === form.email)
    errors.password = "A jelszó nem egyezhet az email címmel";

  return errors;
};
