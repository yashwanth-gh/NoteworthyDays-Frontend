import authFunctions from "@/api/authApi/auth";
import userFunctions from "@/api/userApi/user";
import { IExistingUser, INewUser } from "@/types";
import {
    useMutation, useQuery
} from "@tanstack/react-query";

// *******************MUTATIONS******************

export const useCreateNewAccount = () => {
    return useMutation({
        mutationFn: (userData: INewUser) => authFunctions.createNewAccount(userData)
    })
}
export const useLoginIntoExistingAccount = () => {
    return useMutation({
        mutationFn: (loginData: IExistingUser) => authFunctions.login(loginData)
    })
}
export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: ({ email, otp }: { email: string, otp: string }) => authFunctions.verifySentOtp({ email, otp })
    })
}
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => authFunctions.forgotPassword(email)
    })
}
export const useResetforgottenPassword = () => {
    return useMutation({
        mutationFn: ({ resetToken, password }: { resetToken: string, password: string }) => authFunctions.resetforgottenPassword({ resetToken, password })
    })
}
export const useLogoutOfAccount = () => {
    return useMutation({
        mutationFn: () => authFunctions.logout()
    })
}

export const useCreateNewAdminAccount = () => {
    return useMutation({
        mutationFn: (userData: INewUser) => authFunctions.createNewAdminAccount(userData)
    })
}

export const useAdminLogin = () => {
    return useMutation({
        mutationFn: (loginData: IExistingUser) => authFunctions.adminLogin(loginData)
    })
}
