import { Request, Response } from "express";
import { ICidade } from "./dto/Cidade";
import * as yup from 'yup';

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;
  try {
    validatedData = await bodyValidation.validate(req.body);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors:{
        default: yupError.message,
      }
    });
  }
  console.log(validatedData);
  return res.send(validatedData);
};