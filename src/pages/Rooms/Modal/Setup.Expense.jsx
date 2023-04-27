import { Space, Table, Tag, Modal, Button, Form, Input, InputNumber, Typography, Popconfirm } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { FileAddOutlined } from '@ant-design/icons';
// import { postCreateRoom } from '../../../services/api';
import ActionExpense from '../components/Action/Action.Expense';
import { numberWithCommas } from '../../../components/common/Common';
import iconDisabled from '../../../assets/Image/icon/disabled.png';
import CreateExpense from './Create.Expense';
import { getListExpense } from '../../../services/api';
import UpdateExpense from './Update.Expense';

const SetupExpense = ({
    isOpenModalSetupExpense,
    handleCloseModalSetupExpense,
    listRoom
}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            align: 'center',
        },
        {
            title: 'Danh mục',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            align: 'center',
        },
        {
            title: 'Thành tiền (VNĐ)',
            dataIndex: 'money',
            key: 'money',
            width: '22.5%',
            align: 'center',
        },
        {
            title: 'Đơn giá (VNĐ/đơn vị)',
            dataIndex: 'unitprice',
            key: 'unitprice',
            width: '22.5%',
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '15%',
            align: 'center',
        },
    ];

    const [listExpense, setListExpense] = useState([]);
    const [isOpenModalUpdateExpense, setIsOpenModalUpdateExpense] = useState(false);
    const [expenseUpdate, setExpenseUpdate] = useState({});
    const [isOpenModalCreateExpense, setIsOpenModalCreateExpense] = useState(false);
    const [listRoomName, setListRoomName] = useState([]);

    const handleShowModalUpdateExpense = (expense) => {
        setExpenseUpdate(expense);
        setIsOpenModalUpdateExpense(true);
    };

    useEffect(() => {
        let listRoomName = listRoom.map(item => (item.name));
        setListRoomName(listRoomName);
    }, [listRoom]);
    useEffect(() => {
        if (listRoomName.length) {
            fetchDataExpense();
        }
    }, [listRoomName]);


    const fetchDataExpense = useCallback(async () => {
        let res = await getListExpense();
        let newData = res.data.map(expense => {
            return {
                id: expense.id,
                key: expense.id,  //unique key
                name: <span>{expense.name}<br /> <span className='status-numberroom'>Áp dụng cho {listRoomName.length === expense.rooms.length ? <b className='all'>Tất cả</b> : expense.rooms.length} phòng</span></span>,
                money: !expense.unitPriceFlag ? numberWithCommas(expense.price) : <img className='icon-disabled' src={iconDisabled} alt='' />,
                unitprice: expense.unitPriceFlag ? `${numberWithCommas(expense.price)}${expense.unit.replace('VNĐ', '')}` : <img className='icon-disabled' src={iconDisabled} alt='' />,
                action: <ActionExpense
                    handleShowModalUpdateExpense={handleShowModalUpdateExpense}
                    expense={expense}
                />
            };
        });
        setListExpense(newData);
    }, [listRoomName]);
    return (
        <Modal
            maskClosable={false}
            forceRender
            className='modal-expense'
            title="Cài đặt chi phí"
            width={1000}
            bodyStyle={{ padding: '20px' }}
            open={isOpenModalSetupExpense}
            onCancel={handleCloseModalSetupExpense}
            footer={[
                <Button
                    key="close-expense"
                    type="primary"
                    onClick={handleCloseModalSetupExpense}
                >Đóng</Button>
            ]}
        >
            <div className='header'>
                <Button type="primary" className='btn-setup' onClick={() => setIsOpenModalCreateExpense(true)}>
                    <span className='icon-create'><FileAddOutlined /></span>
                    <span>Tạo chi phí mới</span>
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listExpense}
                bordered
                pagination={false}
            />
            <CreateExpense
                isOpenModalCreateExpense={isOpenModalCreateExpense}
                setIsOpenModalCreateExpense={setIsOpenModalCreateExpense}
                fetchDataExpense={fetchDataExpense}
                listRoomName={listRoomName}
                listRoom={listRoom}
            />
            <UpdateExpense
                expenseUpdate={expenseUpdate}
                isOpenModalUpdateExpense={isOpenModalUpdateExpense}
                setIsOpenModalUpdateExpense={setIsOpenModalUpdateExpense}
                fetchDataExpense={fetchDataExpense}
                listRoomName={listRoomName}
                listRoom={listRoom}
            />
        </Modal>
    );
};

export default SetupExpense;