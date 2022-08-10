import axios from 'axios';
const baseUrl = 'http://localhost:2000/api/login';

const loginUser = async (user) => {
    const result = await axios.post(baseUrl,user);
    return result.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    loginUser
};