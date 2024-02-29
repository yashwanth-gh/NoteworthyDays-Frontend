import authFunctions from "@/api/authApi/auth";
import { INewUser } from "@/types";
import {
    useMutation
} from "@tanstack/react-query";

export const useCreateNewAccount = ()=>{
    return useMutation({
        mutationFn: (userData: INewUser) => authFunctions.createNewAccount(userData)
    })
}