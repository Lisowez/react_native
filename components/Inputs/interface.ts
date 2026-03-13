import type { AuthFormValues } from "@/types/forms";
import type { FormikProps } from "formik";

export interface InputProps
  extends Pick<FormikProps<AuthFormValues>, "handleChange" | "handleBlur" | "values"> {
  values: AuthFormValues;
  valueType: "phone" | "password" | "repeatPassword";
  label: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}
