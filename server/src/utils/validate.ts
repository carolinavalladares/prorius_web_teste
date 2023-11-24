import Joi from "joi";
import { IRegisterData } from "../types";

export const validateRegisterData = (data: IRegisterData) => {
  const pattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).regex(pattern).required(),
    confirmPassword: Joi.ref("password"),
    role: Joi.string()
      .regex(/ADMIN|USER/)
      .required(),
  });

  return schema.validate(data);
};
