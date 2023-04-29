import { FiTrash2 } from 'react-icons/fi';
import { EditOutlined } from '@ant-design/icons';
import { message, notification, Popconfirm } from 'antd';
import { deleteRoom } from '../../../../services/api';
const ActionExpense = ({ handleShowModalUpdateExpense, expense }) => {
    // console.log('expense', expense);
    const handleDelete = async (expense) => {
        // let res = await deleteRoom(expense.id);
        // if (res.status === 204) {
        //     message.success(`Đã xóa ${expense.name}`);
        //     fetchDataListRoom();
        // } else {
        notification.error({
            message: "Xóa chi phí không thành công",
            duration: 5
        });
        // }
    };
    return (
        <div className='edit'>
            <a className='icon btn-round' onClick={() => handleShowModalUpdateExpense(expense)}><EditOutlined /></a>
            <Popconfirm
                placement="topRight"
                title={`Xóa chi phí ${expense.name}?`}
                description='Xác nhận'
                onConfirm={() => handleDelete(expense)}
                okText="Có"
                cancelText="Không"
            >
                <a className='icon btn-round btn-delete'><FiTrash2 /></a>
            </Popconfirm>
        </div>
    );
};

export default ActionExpense;