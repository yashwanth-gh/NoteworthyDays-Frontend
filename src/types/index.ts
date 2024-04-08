
export type INewUser = {
    fullName : string;
    email : string;
    password : string;
}
export type  IExistingUser = {
    email : string;
    password : string;
}

export type backendResponse = {
    statusCode: number;
    data: Record<string, any>; // Specify data can have any properties
    success: boolean;
    message: string;
}

export type ApiResponse = {
    success: boolean;
    data: null;
    message: string;
} | {
    success: boolean;
    data: Record<string, any>;
    message: string;
}