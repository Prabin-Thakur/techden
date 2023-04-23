import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useAppDispatch } from "../redux/hooks";
import { auth, provider } from "../firebase";
import { EmailValidator } from "../utils";
import { showSnackBar } from "../redux/snackBar/snackBarSlice";
import { mapAuthCodeToMessage } from "../utils";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      if (
        localStorage.getItem("isLoggedIn") === "true" &&
        localStorage.getItem("userId")!.length > 0
      ) {
        return;
      }
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userId", JSON.stringify(currentUser.uid));
      return;
    }
    if (currentUser && Object.keys(currentUser).length === 0) {
      if (localStorage.getItem("isLoggedIn") === "false") {
        return;
      }
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      localStorage.removeItem("userId");
    }
  }, [currentUser]);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser?.uid) {
      window.localStorage.setItem("userId", JSON.stringify(currentUser.uid));
    }
  }, [currentUser?.uid]);

  //for deleting account
  async function deleteUserAccount() {
    const user: any = auth.currentUser;
    try {
      await user.delete();
      dispatch(
        showSnackBar({
          text: "Account deleted SuccessFully",
          type: "success",
        })
      );
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      localStorage.removeItem("userId");
      window.location.reload();
    } catch (err) {
      console.log(err);
      dispatch(
        showSnackBar({ text: "Failed to delete account", type: "error" })
      );
    }
  }

  //for handling SignUp
  async function handleSignup() {
    try {
      setLoading(true);
      await signup(email, password);
      await logout();
      dispatch(
        showSnackBar({ text: "Account Created SuccessFully", type: "success" })
      );
      navigate("/login");
      setEmail("");
      setPassword("");
      setEmailError(false);
      setPasswordError(false);
      setLoading(false);
    } catch (error) {
      if (mapAuthCodeToMessage(error)) {
        dispatch(
          showSnackBar({ text: mapAuthCodeToMessage(error), type: "error" })
        );
      } else {
        dispatch(showSnackBar({ text: "Sign Up Failed", type: "error" }));
      }
      setLoading(false);
    }
  }

  //for handling login
  async function handleLogin() {
    try {
      setLoading(true);
      await login(email, password);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      dispatch(
        showSnackBar({ text: "LoggedIn SuccessFully", type: "success" })
      );
      window.location.reload();
      setLoading(false);
    } catch (error) {
      if (mapAuthCodeToMessage(error)) {
        dispatch(
          showSnackBar({ text: mapAuthCodeToMessage(error), type: "error" })
        );
      } else {
        dispatch(showSnackBar({ text: "Logging In Failed", type: "error" }));
      }
      setLoading(false);
    }
  }

  //for formSubmitHandler and validations
  const formSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!EmailValidator(email)) {
      setEmailError(false);
    }
    if (
      email.length > 5 &&
      password.length > 5 &&
      !emailError &&
      !passwordError
    ) {
      if (window.location.pathname.includes("signup")) {
        handleSignup();
      }
      if (window.location.pathname.includes("login")) {
        handleLogin();
      }
    }
    if (email.length <= 5 && password.length <= 5) {
      dispatch(
        showSnackBar({ text: "Please Fill the form and Submit", type: "error" })
      );
      setEmailError(true);
      setPasswordError(true);
    }

    if (email.length <= 5) {
      setEmailError(true);
      dispatch(
        showSnackBar({
          text: "Must have more than 5 letters in Email",
          type: "error",
        })
      );
    }
    if (password.length <= 5) {
      setPasswordError(true);
      dispatch(
        showSnackBar({
          text: "Must have more than 5 letters in Password",
          type: "error",
        })
      );
    }
    if (!EmailValidator(email)) {
      setEmailError(true);
      dispatch(
        showSnackBar({ text: "Please Put a valid Email", type: "error" })
      );
    }
  };

  //for googleLogin
  const googleSubmitHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        setGoogleLoading(true);
        window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
        const user = result.user;
        setCurrentUser(user);
        dispatch(
          showSnackBar({
            text: "Logged in successfuly with Google",
            type: "success",
          })
        );
        setGoogleLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        dispatch(showSnackBar({ text: "Google Login Failed", type: "error" }));
        console.log(error);
        setGoogleLoading(false);
      });
  };

  //for logout
  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      window.localStorage.setItem("isLoggedIn", JSON.stringify(false));
      window.localStorage.removeItem("userId");
      window.location.reload();
      dispatch(
        showSnackBar({ text: "Logged Out successfully", type: "success" })
      );
      setLoading(false);
    } catch {
      dispatch(showSnackBar({ text: "Logout Failed", type: "error" }));
      setLoading(false);
    }
    setLoading(false);
  }

  return {
    currentUser,
    setCurrentUser,
    loading,
    setLoading,
    googleLoading,
    setGoogleLoading,
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    signup,
    login,
    logout,
    handleSignup,
    handleLogin,
    formSubmitHandler,
    googleSubmitHandler,
    handleLogout,
    deleteUserAccount,
  };
};

export default useAuth;
