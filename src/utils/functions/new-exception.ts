import { HttpException, HttpStatus } from "@nestjs/common";
import { NODE_ENV } from "../constants/node-env";

type NewExceptionProps = {
    error?: any,
    exceptionDescription?: string;
    exceptionStatus?: HttpStatus
}

export function NewException({ error, exceptionDescription, exceptionStatus }: NewExceptionProps) {
    const { response: { data: { status, message } } } = error
    const verifyStatus = status || exceptionStatus
    const verifyMessage = message || exceptionDescription
    const newStatus = error ? verifyStatus : exceptionStatus
    const newDescription = error ? verifyMessage : exceptionDescription
    if (NODE_ENV === 'development') {
        console.log(error, 'error')
    }
    throw new HttpException(newDescription, newStatus)
}