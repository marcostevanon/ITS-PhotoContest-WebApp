import { User } from './user.model';

export class LoginResponse {
    message: string
    status: number
    token: string
    expiresIn: number
    user: User
}