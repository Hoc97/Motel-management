import axios from '../utils/axios-customize';

// export const callRegister = (fullName, email, password, phone) => {
//     return axios.post('/api/v1/user/register', { fullName, email, password, phone })
// }

const callLogin = (username, password) => {
    return axios.post('/api/auth/signin', { username, password });
};

// export const callFetchAccount = () => {
//     return axios.get('/api/v1/auth/account')
// }

// export const callLogout = () => {
//     return axios.post('/api/v1/auth/logout')
// }

const getListRoom = () => {
    return axios.get('/api/v1/rooms');
};

const postCreateRoom = () => {
    // return axios.post('/api/v1/rooms');
};

const getDashBoard = () => {
    return axios.get('/api/v1/dashboard');
};


export {
    getListRoom,
    getDashBoard,
    postCreateRoom,
    callLogin
};