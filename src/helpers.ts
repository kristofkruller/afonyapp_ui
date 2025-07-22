export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Kötelező @ karakter, Nem enged "üres" neveket vagy domaineket (@.com, @gmail, stb.), 
// Nem enged érvénytelen karaktereket (.., @-, stb.), Elfogad pl. user.name+tag@gmail.com, 
// user@sub.domain.co, stb., Minimális hosszt és strukturáltságot elvár
export const mailRegex = /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
