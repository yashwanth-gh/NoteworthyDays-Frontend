import { conf } from "@/conf/conf";
import { IExistingUser, INewUser } from "@/types";
import axios from 'axios';

export class AuthFuctions {
    endpoint;
    constructor() {
        this.endpoint = conf.serverEndpoint;
    }
    async createNewAccount(userData: INewUser) {
        try {
            const response = await axios.post(`${this.endpoint}/api/v1/users/signup`, userData);
            //TODO:  CHECK FOR NO RESPONSE
            return response.data;
        } catch (error) {
            console.error('ERROR:: class AuthFunctions :: createNewAccount :: failed to create new account');
        }
    }
    async login(loginData: IExistingUser) {
        try {
            const response = await axios.post(`${this.endpoint}/api/v1/users/signup`, loginData);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('ERROR:: class AuthFunctions :: login :: failed to login to account');
        }
    }
}

const authFunctions = new AuthFuctions();
export default authFunctions;