import './Action.scss';
import { FiTrash2 } from 'react-icons/fi';
import { EditOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';
const Action = ({ handleShowModalUpdate, room }) => {
    const handleUpdate = () => {
        handleShowModalUpdate(room);
    };

    const handleDelete = (room) => {
        console.log(room);
        message.success(`Đã xóa ${room.name}`);
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