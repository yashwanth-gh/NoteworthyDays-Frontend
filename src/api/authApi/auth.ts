import { conf } from "@/conf/conf";
import { axiosRequest } from "@/lib/utils";
import { IExistingUser, INewUser, backendResponse } from "@/types";
import { AxiosRequestConfig } from 'axios';
// import { string } from "zod";

/* This is the class For writing all the functions required To authenticate user
A object is already created. Now the object is exported. And you can just Use 
whatever functionalities that you want to use just by Calling the Method That 
belong in the class . This comment is generated by a voice assistant feature of
 vs code that I recently tried. So grammatical mistakes should be pardoned.  
  */

export class AuthFuctions {
    endpoint;
    constructor() {
        this.endpoint = conf.serverEndpoint;
    }

    async createNewAccount(userData: INewUser) {

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/api/v1/users/signup',
            data: userData
        };

        // Make a POST request to the '/signup' endpoint using the axiosRequest wrapper
        const response = await axiosRequest(config);

        // Handle the response data
        const newUser: backendResponse = response.data;
        if (newUser.statusCode >= 400 && newUser.statusCode <= 500) {
            return { success: false, message: newUser.message };
        }

        // Send OTP to user
        const receivedEmailFromServer: string = newUser.data.email;
        const isOtpSent = await this.sendOtpToVerifyNewAccount(receivedEmailFromServer);
        if (!isOtpSent.success) {
            return { success: false, message: isOtpSent.message };
        }

        return { success: true, message: isOtpSent.message };
    }


    async sendOtpToVerifyNewAccount(email: string) {

        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/api/v1/users/send-otp-to-mail',
            data: { email }
        };

        const response = await axiosRequest(config);
        const responseData: backendResponse = response.data;

        if (responseData.statusCode >= 400 && responseData.statusCode <= 500) {
            return { success: false, message: responseData.message }
        }

        return { success: true, message: responseData.message }
    }

    async verifySentOtp({ email, otp }: { email: string, otp: string }) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/api/v1/users/verify-otp',
            data: { email, otp }
        };

        const response = await axiosRequest(config);
        const responseData: backendResponse = response.data;

        if (responseData.statusCode >= 400 && responseData.statusCode <= 500) {
            return { success: false, message: response.data.message }
        }
        return { success: true, message: response.data.message }
    }

    async forgotPassword(email:string){
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: '/api/v1/users/forgot-password',
            data: { email }
        };

        const response = await axiosRequest(config);

        const responseData: backendResponse = response.data;

        if (responseData.statusCode >= 400 && responseData.statusCode <= 500) {
            return { success: false, message: responseData.message }
        }
        return { success: true, message: responseData.message }
    }

    async resetforgottenPassword({ resetToken, password }: { resetToken: string, password: string }) {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `/api/v1/users/forgot-reset-password?resetToken=${resetToken}`,
            data: { password }
        };

        const response = await axiosRequest(config);
        const responseData: backendResponse = response.data;

        if (responseData.statusCode >= 400 && responseData.statusCode <= 500) {
            return { success: false, message: responseData.message }
        }
        return { success: true, message: responseData.message }
    }

        async login(loginData: IExistingUser) {

        }


}

const authFunctions = new AuthFuctions();
export default authFunctions;