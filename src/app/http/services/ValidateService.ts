import { Schema } from 'zod';
import { APIError } from '../../../utils/Error';
import { HttpStatusCode } from '../../../utils/HttpStatusCode';

// ValidationService.ts
export class ValidationService {
  validate(data: object, schema: Schema): void {
    const validation = schema.safeParse(data);

    if (!validation.success)
      throw new APIError(
        'Erro na validação dos dados',
        HttpStatusCode.BAD_REQUEST,
        true,
        `Validation Error: ${JSON.stringify(validation.error.format())}`,
      );
  }
}
