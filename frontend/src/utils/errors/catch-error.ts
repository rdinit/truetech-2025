import { HandleableError } from "./handleable-error";

export const catchError = <T, E extends new (message: string) => Error>(
  promise: Promise<T>
): Promise<[undefined, T] | [InstanceType<E> | HandleableError]> =>
  promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => {
      if (error instanceof HandleableError) {
        error.handle();
        return [error];
      }
      throw error;
    });
