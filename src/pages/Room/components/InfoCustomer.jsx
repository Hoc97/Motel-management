import { Space, Table, message } from 'antd';
import avatar from '../../../assets/Image/avatar/avatar1.jpg';
import { useEffect } from 'react';


const InfoCustomer = () => {
    const handleEdit = (key) => {
        message.info(`${key} item`);
    };
    const columns = [
        {
            title: 'Index',
            dataIndex: 'key',
            key: 'key',
            width: '5%',
            rowScope: 'row',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
        },
        {
            title: 'SDT',
            dataIndex: 'sdt',
            key: 'sdt',
            width: '15%',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '10%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '20%',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit('sửa tên')}>Sửa tên</a>
                    <a onClick={() => handleEdit('xóa tên')}>Xóa</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            email: 'JohnBrown@gmail.com',
            sdt: '0123456789',
            image: <img className='avatar' src={avatar} alt='' />
        },
        {
            key: '2',
            name: 'Jim Green',
            email: 'JohnBrown@gmail.com',
            sdt: '0123456789',
            image: <img className='avatar' src={avatar} alt='' />
        },
        {
            key: '3',
            name: 'Joe Black',
            email: 'JohnBrown@gmail.com',
            sdt: '0123456789',
            image: <img className='avatar' src={avatar} alt='' />
        },
    ];
    const a = () => { };

    return (
        <div className='info-user'>
            <div className='info'>
                <Table columns={columns} dataSource={data} pagination={false}
                />
            </div>
        </div>
    );
};

export default InfoCustomer;