import { ZodObject, ZodRawShape } from 'zod';
import { Response } from 'express';
import { HttpStatusCode } from './HttpStatusCode';

export default function ValidationField(
  validation_object: ZodObject<ZodRawShape>,
  body: object,
  res: Response,
) {
  const validation = validation_object.safeParse(body);

  if (!validation.success) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      error: 'Validation Error',
      details: validation.error.format(),
    });
  }
}
