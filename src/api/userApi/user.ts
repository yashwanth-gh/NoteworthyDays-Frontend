import { conf } from "@/conf/conf";
import { axiosRequest } from "@/lib/utils";
import { backendResponse } from "@/types";
import { AxiosRequestConfig } from "axios";
import authFunctions from "../authApi/auth";


export class UserFunctions {
    endpoint;
    constructor() {
        this.endpoint = conf.serverEndpoint;
    }

    async getUserDetails() {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/api/v1/auth/getuser`
        };

        const response = await axiosRequest(config);
        const responseData: backendResponse = response.data;

        if (response.statusCode === 401) {
            // access token is expired , refresh access token
            return {success: false,data:null, message: "REFRESH ACCESS TOKEN"}
        } else if (response.statusCode === 400) {
            // Bad request, redirect to signin page
            // maybe no cookie found, or token are invalid
            return {success: false,data:null, message: "REDIRECT TO SIGNIN"}
        } else if (response.statusCode === 404){
            // 404 user Not found, redirect to signUp page
            return {success: false,data:null, message: "REDIRECT TO SIGNUP"}
        }

        return { success: true, data: responseData?.data, message: responseData?.message };
    }

}

const userFunctions = new UserFunctions();

export default userFunctions;