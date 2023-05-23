import type { ApiResponse } from '@/services/typescript-api-services../types';

export function formHandleApiResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: ApiResponse<any>,
  setFormErrors: (errors: string[] | ((prev: string[]) => string[])) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (res: ApiResponse<any>) => void
) {
  if (res.error) {
    if (!!res.errorFields && res.errorFields.size > 0) {
      res.errorFields.forEach((error: string) => {
        setFormErrors((prev: string[]) => [...prev, error]);
      });
    } else {
      setFormErrors([res.message]);
    }
  } else {
    if (onSuccess) onSuccess(res);
  }
}
