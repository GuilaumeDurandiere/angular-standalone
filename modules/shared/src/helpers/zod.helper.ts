import { MonoTypeOperatorFunction, tap } from "rxjs";
import { ZodType } from "zod";

export function parseResponse<T>(schema: ZodType): MonoTypeOperatorFunction<T> {
    return tap({
      next: (value: any) => {
        // If we are in development mode, we want to throw an error if the schema is not valid
        // if (true) {
          schema.parse(value);
          return;
        // }
  
        // If we are not in development mode, we want to log the error to the console
        // const parsed = schema.safeParse(value);
        // if (!parsed.success) {
        //   console.error(parsed.error);
        // }
      },
    });
  }