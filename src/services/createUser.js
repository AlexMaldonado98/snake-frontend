import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async (newUser) => {
    
    const result = await axios.post(baseUrl,newUser);
    return result.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createUser
}