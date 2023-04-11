import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { hideSnackBar } from "../../redux/snackBar/snackBarSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const snackBarData = useAppSelector((state) => state.snackBar);

  if (snackBarData.showing) {
    return (
      <>
        <Snackbar
          open={snackBarData.showing}
          autoHideDuration={2000}
          onClose={() => dispatch(hideSnackBar())}
        >
          <Alert
            variant="filled"
            onClose={() => dispatch(hideSnackBar())}
            sx={{ width: "100%" }}
            severity={snackBarData.type}
          >
            {snackBarData.text} !
          </Alert>
        </Snackbar>
      </>
    );
  } else return <></>;
};

export default SnackBar;
