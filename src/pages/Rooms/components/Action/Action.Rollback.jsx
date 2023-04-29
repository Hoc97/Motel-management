import { EditOutlined } from '@ant-design/icons';
import { Popconfirm, message, notification } from 'antd';
import { patchRollbackRoom } from '../../../../services/api';
const ActionRollback = ({
    room, fetchDataListRollback
}) => {
    const handleRollback = async (room) => {
        let res = await patchRollbackRoom(room.id);
        if (res.status === 204) {
            message.success(`Khôi phục ${room.name} thành công`);
            fetchDataListRollback();
        } else {
            notification.error({
                message: `Khôi phục ${room.name} không thành công`,
                duration: 5
            });
        }
    };

    return (
        <div className='edit'>
            <Popconfirm
                placement="topRight"
                title={`Bạn muốn khôi phục ${room.name}?`}
                description='Xác nhận'
                onConfirm={() => handleRollback(room)}
                okText="Có"
                cancelText="Không"
            >
                <a className='icon btn-round' ><EditOutlined /></a>
            </Popconfirm>
        </div>
    );
};

export default ActionRollback;