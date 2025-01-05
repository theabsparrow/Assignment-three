export type TErrorSource = {
  path: number | string;
  message: string;
}[];

export type TValidationError = {
  message: string;
  statusCode: number;
  error: TErrorSource;
};
