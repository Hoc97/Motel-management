import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
                {/* <Button className='expense' >Xem chi phí</Button> */}
                <span className='icon' onClick={() => handleEdit('sửa')}><EditOutlined /></span>
                <span className='icon' onClick={() => handleEdit('xóa')}><DeleteOutlined /></span>
            </div>
        </>
    );
};

export default RoomItem;;