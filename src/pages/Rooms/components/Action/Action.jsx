import './Action.scss';
import { FiTrash2 } from 'react-icons/fi';
import { EditOutlined } from '@ant-design/icons';
import { message, notification, Popconfirm } from 'antd';
import { deleteRoom } from '../../../../services/api';
const Action = ({ handleShowModalUpdate, room, fetchDataListRoom }) => {
    const handleUpdate = () => {
        handleShowModalUpdate(room);
    };

    const handleDelete = async (room) => {
        let res = await deleteRoom(room.id);
        if (res.status === 204) {
            message.success(`Đã xóa ${room.name}`);
            fetchDataListRoom();
        } else {
            notification.error({
                message: "Xóa phòng không thành công",
                duration: 5
            });
        }
    };
    return (
        <div className='edit'>
            <span className='icon btn-round' onClick={() => handleUpdate()}><EditOutlined /></span>
            <Popconfirm
                placement="topRight"
                title={`Bạn muốn xóa ${room.name}?`}
                description='Xác nhận'
                onConfirm={() => handleDelete(room)}
                okText="Có"
                cancelText="Không"
            >
                <span className='icon  btn-round btn-delete'><FiTrash2 /></span>
            </Popconfirm>
        </div>
    );
};

export default Action;