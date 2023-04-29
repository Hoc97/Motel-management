import { FiTrash2 } from 'react-icons/fi';
import { EditOutlined } from '@ant-design/icons';
import { message, notification, Popconfirm } from 'antd';
import { deleteRoom } from '../../../../services/api';
const ActionExpenseDetail = ({ handleShowModalUpdateExpense, expense }) => {
    // console.log('expense', expense);

    return (
        <div className='edit'>
            <a className='icon btn-round' onClick={() => handleShowModalUpdateExpense(expense)}><EditOutlined /></a>
        </div>
    );
};

export default ActionExpenseDetail;