import { useEffect, useState } from 'react';
import { getExpenseDetail } from '../../../services/api';
import { Table } from 'antd';
import ActionExpenseDetail from './Action/Action.ExpenseDetail';
import { numberWithCommas } from '../../../components/common/Common';
import iconDisabled from '../../../assets/Image/icon/disabled.png';
import UpdateExpenseDetail from '../Modal/Update.ExpenseDetail';

const ExpenseDetail = ({ id }) => {
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

    const handleShowModalUpdateExpense = (expense) => {
        setExpenseUpdate(expense);
        setIsOpenModalUpdateExpense(true);
    };

    useEffect(() => {
        fetchDataExpenseDetail();
    }, []);

    const fetchDataExpenseDetail = async () => {
        let res = await getExpenseDetail(id);
        let newData = res.data.map(expense => {
            return {
                id: expense.id,
                key: expense.id,  //unique key
                name: expense.name,
                money: !expense.unitPriceFlag ? numberWithCommas(expense.price) : <img className='icon-disabled' src={iconDisabled} alt='' />,
                unitprice: expense.unitPriceFlag ? `${numberWithCommas(expense.price)}${expense.unit.replace('VNĐ', '')}` : <img className='icon-disabled' src={iconDisabled} alt='' />,
                action: <ActionExpenseDetail
                    handleShowModalUpdateExpense={handleShowModalUpdateExpense}
                    expense={expense}
                />
            };
        });
        setListExpense(newData);
    };
    return (
        <div className='expense-detail'>
            <Table
                columns={columns}
                dataSource={listExpense}
                bordered
                pagination={false}
            />
            <UpdateExpenseDetail
                expenseUpdate={expenseUpdate}
                isOpenModalUpdateExpense={isOpenModalUpdateExpense}
                setIsOpenModalUpdateExpense={setIsOpenModalUpdateExpense}
                fetchDataExpenseDetail={fetchDataExpenseDetail}
                roomID={id}
            />
        </div>
    );
};

export default ExpenseDetail;