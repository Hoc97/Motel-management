import { FiTrash2 } from 'react-icons/fi';
import { EditOutlined } from '@ant-design/icons';
import { message, notification, Popconfirm } from 'antd';
const ActionInfo = ({
    handleShowModalUpdate
    , user, fetchDataListInfo
}) => {
    const handleDelete = async (user) => {
        // let res = await deleteRoom(expense.id);
        // if (res.status === 204) {
        //     message.success(`Đã xóa ${expense.name}`);
        //     fetchDataListInfo();
        // } else {
        notification.error({
            message: "Xóa khách thuê không thành công",
            duration: 5
        });
        // }
    };
    return (
        <div className='edit'>
            <a className='icon btn-round'
                onClick={() => handleShowModalUpdate(user)}
            ><EditOutlined /></a>
            <Popconfirm
                placement="topRight"
                title={`Bạn muốn xóa ${user.name}?`}
                description='Xác nhận'
                onConfirm={() => handleDelete(user)}
                okText="Có"
                cancelText="Không"
            >
                <a className='icon btn-round btn-delete'><FiTrash2 /></a>
            </Popconfirm>
        </div>
    );
};

export default ActionInfo;