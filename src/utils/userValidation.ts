import axios from "axios";

const validateUrl = "http://localhost:3000/v1/auth/validate";

export const userValidation = async (token: string) => {

    const reqUrl = `${validateUrl}/${token}`;

    try {

        const response = await axios.get(reqUrl);
        console.log(response.data.message);
    } catch(error: any) {

        console.log(error.response.data.message)
    };
};