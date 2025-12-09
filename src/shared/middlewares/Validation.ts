import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Schema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T>(schema: Schema<T>) => Schema<T> 


type TAllSchemas = Record<TProperty, Schema<unknown>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getSchemas: TGetAllSchemas) => RequestHandler;

export function validationErrors(yupError: ValidationError) {
  const validationErrors: Record<string, string> = {};
  yupError.inner.forEach(e => {
    if (!e.path) return;
    validationErrors[e.path] = e.message;
  });
  return validationErrors;
}
export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema)

  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as TProperty], { abortEarly: false });
      // return next();
    } catch (error) {
      errorsResult[key] = validationErrors(error as ValidationError);
    }

  });

  if(Object.entries(errorsResult).length === 0){
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({errors: errorsResult});
};
