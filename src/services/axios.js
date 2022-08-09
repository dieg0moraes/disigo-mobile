import axios from "axios";

export class Axios {

   interceptors;

    constructor(config) {
        return axios.create(config);
    }
}
