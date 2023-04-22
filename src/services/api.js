import axios from '../utils/axios-customize';

// export const callRegister = (fullName, email, password, phone) => {
//     return axios.post('/api/v1/user/register', { fullName, email, password, phone })
// }

const callLogin = (username, password) => {
    return axios.post('/api/auth/sign-in', { username, password });

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

const postCreateRoom = (name, quantity) => {
    return axios.post('/api/v1/rooms', { name },
        {
            headers: {
                "quantity": quantity
            }
        });
};

const getDashBoard = () => {
    return axios.get('/api/v1/rooms/summary-room');
};


export {
    getListRoom,
    getDashBoard,
    postCreateRoom,
    callLogin
};