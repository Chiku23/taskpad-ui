export type LoginPayload = {
    email: string,
    password: string
}

export type LoginResponse = {
    status: string;
    message: string;
    data?: {
        name: string;
        email: string;
    }
}

export type RegisterPayload = {
    name: string,
    email: string,
    password: string,
    confirmpassword: string
}

export type RegisterResponse = {
    status: string,
    message: string
}

export type UserProfileResponse = {
    status: string;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
    }
}

export type LogoutResponse = {
    status: string;
    message: string;
}