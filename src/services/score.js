import axios from 'axios';

const baseUrl = 'http://localhost:2000/api/scores';
let tokenFormat = null;

const setFormatToken = (tokenWithoutFormat) => {
    tokenFormat = `beare ${tokenWithoutFormat}`;
}

const getScore = async () => {
    const result = await axios.get(baseUrl);
    return result.data;
};

const create = async (score) => {
    const config = {
        headers: {authorization: tokenFormat}
    }
    const newScore = {
        score: score,
        date: new Date().toLocaleString()
    }
    const result = await axios.post(`${baseUrl}`,newScore,config);
    return result.data
    
}

const putScore = async (id,score) => {
    const newScore = {
        score: score,
        date: new Date().toLocaleString()
    }
    const result = await axios.put(`${baseUrl}/${id}`,newScore)
    return result.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getScore,
    create,
    setFormatToken,
    putScore
}
