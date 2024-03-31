import * as yup from "yup";

export const FilterFormSchema = yup
  .object({
    distance: yup
      .number()
      .positive()
      .integer()
      .min(1, "En az 1 km girebilirsiniz.")
      .max(20, "En fazla 20 km girebilirsiniz.")
      .required("Bu alan zorunludur!"),
    size: yup
      .number()
      .positive()
      .integer()
      .min(1, "En az 1 km girebilirsiniz.")
      .max(30, "En fazla 30 km girebilirsiniz.")
      .required("Bu alan zorunludur!")
  })
  .required();
