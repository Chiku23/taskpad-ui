export type LoginPayload = {
    emailInput: string,
    passwordInput: string
}

export type LoginResponse = {
    status: string;
    message: string;
    data?: {
        token: string;
        name: string;
        email: string;
    }
}

export type RegisterPayload = {
    nameInput: string,
    emailInput: string,
    passwordInput: string,
    confirmpasswordInput: string
}

export type RegisterResponse = {
    status: string,
    message: string
}