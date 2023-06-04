import { Button } from "@mui/material";

export const GButton = (props) => {
  const {
    label,
    type,
    form,
    variant,
    onSubmitHandler,
    icon,
    iconPosition,
    disabled,
    buttonClassName,
  } = props;
  return (
    <Button
      fullWidth={true}
      startIcon={iconPosition !== "end" ? icon : ""}
      endIcon={iconPosition === "end" ? icon : ""}
      className={buttonClassName}
      variant={variant}
      sx={{
        color: variant === "outlined" ? "#7F265B" : "white",
        fontWeight: "600",
        textTransform: "none",
        padding: "5px 10px ",
        border: variant === "outlined" ? "1px solid #7F265B" : "",
        background: disabled
          ? "#a7a4a4"
          : variant === "standard"
          ? "#7F265B"
          : "",
        "&:hover": {
          color: variant === "outlined" ? "#7F265B" : "white",
          border: variant === "outlined" ? "1px solid #7F265B" : "",
          background: variant === "standard" ? "#7F265B" : "",
        },
        "&:focus": {
          color: variant === "outlined" ? "#7F265B" : "white",

          border: variant === "outlined" ? "1px solid #7F265B" : "",
          background: variant === "standard" ? "#7F265B" : "",
        },
      }}
      // size="small"
      type={type}
      form={form}
      onClick={onSubmitHandler}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
