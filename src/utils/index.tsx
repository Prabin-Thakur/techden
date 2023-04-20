function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

import { validate } from "email-validator";

//takes parameter email and returns boolean checking validation
const EmailValidator = (value: string): boolean => {
  return validate(value);
};

//returns string of error message according to firebase error code
const mapAuthCodeToMessage = (error: any): string => {
  switch (error.code) {
    case "auth/invalid-password":
      return "Password provided is not correct";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/email-already-in-use":
      return "Email Already in use";

    case "auth/wrong-password":
      return "Password is not correct";

    case "auth/user-not-found":
      return "User not Found";

    default:
      return "";
  }
};

export { scrollToTop, EmailValidator, mapAuthCodeToMessage };
