export type CustomResponse<T = any> = {
    success: boolean;
    message: string;
    data: T
}