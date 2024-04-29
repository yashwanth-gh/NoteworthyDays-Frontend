import { conf } from "@/conf/conf";
import { axiosRequest } from "@/lib/utils";
import { backendResponse } from "@/types";
import { AxiosRequestConfig } from "axios";

export class AdminFunctions {
    endpoint;
    constructor() {
        this.endpoint = conf.serverEndpoint;
    }

    async getAdminDetails() {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `/api/v1/admin/getadmin-details`
        };

        const response = await axiosRequest(config);
        const responseData: backendResponse = response.data;

        if (response.statusCode === 401) {
            // access token is expired , refresh access token
            return { success: false, statusCode: response.statusCode, data: null, message: "REFRESH ACCESS TOKEN" }
        } else if (response.statusCode === 400) {
            // Bad request, redirect to signin page
            // maybe no cookie found, or token are invalid
            return { success: false, statusCode: response.statusCode, data: null, message: "REDIRECT TO SIGNIN" }
        } else if (response.statusCode === 403) {
            return { success: false, statusCode: response.statusCode, data: null, message: "NO ACCESS TO ADMIN PRIVILEGES" }
        } else if (response.statusCode === 404) {
            // 404 user Not found, redirect to signUp page
            return { success: false, statusCode: response.statusCode, data: null, message: "REDIRECT TO SIGNUP" }
        }

        return { success: true, statusCode: response.statusCode, data: responseData?.data, message: responseData?.message };
    }
}

const adminFunctions = new AdminFunctions();
export default adminFunctions;