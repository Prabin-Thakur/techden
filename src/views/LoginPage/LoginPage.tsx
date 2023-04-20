import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../customHooks/useAuth";
import "./LoginPage.scss";
import google from "../../assets/svgs/google.svg";

interface LoginPageProps {
  bigText: string;
  buttonText: string;
  googlebuttonText: string;
  linkBeforeText: string;
  linkText: string;
}

const LoginPage: React.FC<LoginPageProps> = ({
  bigText,
  buttonText,
  googlebuttonText,
  linkBeforeText,
  linkText,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    loading,
    googleLoading,
    formSubmitHandler,
    googleSubmitHandler,
  } = useAuth();

  const handleGoBack = () => {
    if (window.location.pathname === "/signup") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="login_page_container"
    >
      <p className="login_page_big_text">{bigText}</p>
      <div className="login_page_line" />
      <form
        className="login_page_form"
        noValidate
        autoComplete="off"
        onSubmit={formSubmitHandler}
      >
        <TextField
          type="email"
          autoFocus={window.innerWidth > 1000}
          required
          value={email}
          error={emailError}
          onChange={(e) => {
            setEmail(e.target.value);
            if (email.length >= 8) setEmailError(false);
            if (email.length <= 1) setEmailError(false);
          }}
          label="Email"
          variant="outlined"
          sx={{ width: "20rem" }}
          inputProps={{ maxLength: 30 }}
        />
        <div className="login_page_password">
          <TextField
            value={password}
            type={showPassword ? "text" : "password"}
            error={passwordError}
            required
            onChange={(e) => {
              setPassword(e.target.value.toString());
              if (e.target.value.toString().length < 1) {
                setShowPassword(false);
              }
              if (password.length > 4) setPasswordError(false);
              if (password.length <= 1) setPasswordError(false);
            }}
            label="Password"
            variant="outlined"
            sx={{ width: "20rem" }}
            inputProps={{ maxLength: 20 }}
          />
          {showPassword && password?.toString().length >= 1 ? (
            <VisibilityRoundedIcon
              className="login_page_password_icon"
              onClick={() => setShowPassword(false)}
            />
          ) : !showPassword && password?.toString().length >= 1 ? (
            <VisibilityOffRoundedIcon
              className="login_page_password_icon"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            ""
          )}
        </div>
        {loading ? (
          <CircularProgress className="progress_button" />
        ) : (
          <button
            onClick={formSubmitHandler}
            type="submit"
            className="login_page_button"
            disabled={loading}
          >
            {buttonText}
          </button>
        )}
      </form>
      {googleLoading ? (
        <CircularProgress className="progress_button" />
      ) : (
        <button
          disabled={loading}
          className="signin_google_icon_button"
          onClick={googleSubmitHandler}
          // onClick={() => {
          //   setEmail("");
          //   setPassword("");
          //   googleSubmitHandler();
          // }}
        >
          {googlebuttonText}&nbsp;
          <div className="google_icon">
            <img src={google} alt="google_img" />
          </div>
        </button>
      )}
      <div className="login_page_redirecting">
        {linkBeforeText}&nbsp;
        {window.location.pathname.includes("login") ? (
          <span
            onClick={() => {
              navigate("/signup");
              setEmail("");
              setPassword("");
              setEmailError(false);
              setPasswordError(false);
            }}
          >
            &nbsp;{linkText}
          </span>
        ) : (
          <span
            onClick={() => {
              navigate("/login");
              setEmail("");
              setPassword("");
              setEmailError(false);
              setPasswordError(false);
            }}
          >
            &nbsp;{linkText}
          </span>
        )}
      </div>

      <div className="login_page_policy">
        Privacy Policy&nbsp;&nbsp; &nbsp;• &nbsp;&nbsp;&nbsp;Terms & conditions
      </div>
    </Stack>
  );
};

export default LoginPage;
