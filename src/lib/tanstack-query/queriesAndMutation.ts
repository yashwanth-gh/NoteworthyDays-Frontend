import authFunctions from "@/api/authApi/auth";
import { IExistingUser, INewUser } from "@/types";
import {
    useMutation
} from "@tanstack/react-query";

export const useCreateNewAccount = ()=>{
    return useMutation({
        mutationFn: (userData: INewUser) => authFunctions.createNewAccount(userData)
    })
}
export const useLoginIntoExistingAccount = ()=>{
    return useMutation({
        mutationFn: (loginData: IExistingUser) => authFunctions.login(loginData)
    })
}