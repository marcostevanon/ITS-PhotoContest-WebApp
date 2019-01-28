export class LoginResponse {
    message: string
    status: number
    token: string
    expiresIn: number
    user: { id: number, username: string }
}