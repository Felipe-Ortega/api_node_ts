import { Request, Response } from "express";
import { ICidade } from "./dto/Cidade";
import * as yup from 'yup';
import { validation } from "../../../shared/middlewares";


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  res.send('deu certo');
};

interface IFilter {
  value?: string
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3),
    estado: yup.string().required().min(2).max(2)
  })),
  query: getSchema<IFilter>(yup.object().shape({
    value: yup.string().required().min(3),
  }))
}));
