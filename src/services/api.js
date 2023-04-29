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
//     return axios.post('/api/v1/auth/logout');
// };

const getListRoom = () => {
    return axios.get('/api/v1/rooms');
};

const patchEditRoom = (id, name, status) => {
    return axios.patch(`/api/v1/rooms/${id}`, { name, status });
};

const deleteRoom = (id) => {
    return axios.delete(`/api/v1/rooms/${id}`);
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

const getListExpense = () => {
    return axios.get('/api/v1/expenses');
};

const postCreateExpense = (name, paymentMethod, roomIds, applyAllRooms) => {
    return axios.post('/api/v1/expenses', { name, paymentMethod, roomIds, applyAllRooms });
};

const patchEditExpense = (id, name, paymentMethod, roomIds, applyAllRooms) => {
    return axios.patch(`/api/v1/expenses/${id}`, { name, paymentMethod, roomIds, applyAllRooms });
};

const getListRollBack = () => {
    return axios.get('/api/v1/rooms?status=Phòng đã xóa');
};

const patchRollbackRoom = (id) => {
    return axios.patch(`/api/v1/rooms/${id}/rollback`);
};


const getExpenseDetail = (id) => {
    return axios.get(`/api/v1/rooms/${id}/expenses`);
};


const patchEditExpensedetail = (roomID, expenseID, price) => {
    return axios.patch(`/api/v1/rooms/${roomID}/expenses/${expenseID}`, { price });
};








export {
    getListRoom,
    getDashBoard,
    postCreateRoom,
    callLogin,
    patchEditRoom,
    deleteRoom,
    getListExpense,
    postCreateExpense,
    patchEditExpense,
    getListRollBack,
    patchRollbackRoom,
    getExpenseDetail,
    patchEditExpensedetail
};