import './RollbackPage.scss';
import { Breadcrumb, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getListRollBack } from '../../../services/api';
import ActionRollback from './Action/Action.Rollback';
const RollbackPage = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
            align: 'center',
        },
        {
            title: 'Tên phòng',
            dataIndex: 'name',
            className: 'column-name',
            render: (text, { id }) => {
                return <span key={id} >{text}</span>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text) => {
                let color = 'red';
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                    </Tag>
                );
            },
            width: '20%',

        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
            align: 'center',
        },
    ];

    const [listRollback, setListRollback] = useState([]);
    useEffect(() => {
        fetchDataListRollback();
    }, []);

    const fetchDataListRollback = async () => {
        let res = await getListRollBack();
        let newData = res.data.map(room => {
            return {
                id: room.id,
                key: room.id,  //unique key
                name: room.name,
                status: room.status,
                action: <ActionRollback
                    room={room}
                    fetchDataListRollback={fetchDataListRollback}
                />
            };
        });
        setListRollback(newData);
    };

    return (
        <div>
            <header className='header-rollback'>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to='/rooms'>Rooms</Link>,
                        },
                        {
                            title: 'Rollback',
                        },
                    ]}
                />
            </header>
            <div className='content-rollback'>
                <h3 className='header-content'>Danh sách các phòng đã xóa</h3>
                <div className='list-rollback'>
                    <Table
                        columns={columns}
                        dataSource={listRollback}
                        bordered
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default RollbackPage;