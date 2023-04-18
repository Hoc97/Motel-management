import React from 'react';
// import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { Button, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const RoomItem = ({ index }) => {
    const nav = useNavigate();
    const handleEdit = (key) => {
        message.info(`${key} item`);
    };
    const numberRoom = index + 1;
    return (
        <>
            <Button
                className='room-detail'
                onClick={() => nav(`/rooms/${numberRoom}`)}
            >Phòng trọ số {numberRoom}</Button>
            <div className='edit'>
                <span className='icon btn-round' onClick={() => handleEdit('sửa')}><EditOutlined /></span>
                <span className='icon  btn-round btn-delete' onClick={() => handleEdit('xóa')}><FiTrash2 /></span>
            </div>
        </>
    );
};

export default RoomItem;;