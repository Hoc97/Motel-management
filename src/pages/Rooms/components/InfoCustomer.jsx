import { Space, Table, message, Image, Button } from 'antd';
import avatar from '../../../assets/Image/avatar/avatar1.jpg';
import { useEffect, useState } from 'react';
import ActionInfo from './Action/Action.Info';
import UpdateInfo from '../Modal/Update.Info';
import { EyeOutlined } from '@ant-design/icons';
import { getDataUserEachRoom } from '../../../services/api';
import { FiUserPlus } from 'react-icons/fi';
import CreateInfo from '../Modal/Create.Info';


const InfoCustomer = ({ id }) => {
    const handleEdit = (key) => {
        message.info(`${key} item`);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            width: '5%',
            rowScope: 'row',
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
            align: 'center',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '20%',
            align: 'center',
        },
        {
            title: 'SDT',
            dataIndex: 'sdt',
            width: '15%',
            align: 'center',
        },
        {
            title: 'CMND',
            dataIndex: 'image',
            width: '25%',
            align: 'center',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '15%',
            align: 'center',
        },
    ];


    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [infoUpdate, setInfoUpdate] = useState({});
    const [listInfo, setListInfo] = useState([]);
    const [isOpenModalCreateUser, setIsOpenModalCreateUser] = useState(false);

    const handleShowModalUpdate = (user) => {
        setInfoUpdate(user);
        setIsOpenModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setIsOpenModalUpdate(false);
    };

    useEffect(() => {
        fetchDataListInfo();
    }, []);

    const fetchDataListInfo = async () => {
        let res = await getDataUserEachRoom(id);
        console.log('resdata', res);
        let newData = res.data.map(user => {
            return {
                key: user.id,  //unique key
                name: user.name,
                email: user.email,
                sdt: user.phoneNumber,
                image:
                    <span style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Image.PreviewGroup >
                            {user.images.map((image, index) => {
                                return <Image key={index} className='avatar' alt='abc' src={image.url}
                                    preview={{
                                        mask:
                                            (<>
                                                <EyeOutlined style={{ marginRight: '4px' }} />
                                                Xem
                                            </>),
                                    }}
                                />;
                            })}
                        </Image.PreviewGroup>
                    </span>,
                action: <ActionInfo
                    handleShowModalUpdate={handleShowModalUpdate}
                    user={user}
                    fetchDataListInfo={fetchDataListInfo}
                />
            };
        });
        setListInfo(newData);
    };

    return (
        <div className='info-user'>
            <div className='header'>
                <Button type="primary" className='btn-setup' onClick={() => setIsOpenModalCreateUser(true)}>
                    <span className='icon-create'><FiUserPlus /></span>
                    <span>Thêm khách thuê </span>
                </Button>
            </div>
            <div className='info'>
                <Table
                    style={{ borderRadius: '10px', backgroundColor: 'yellow' }}
                    columns={columns}
                    dataSource={listInfo}
                    pagination={false}
                />
            </div>
            <CreateInfo
                isOpenModalCreateUser={isOpenModalCreateUser}
                setIsOpenModalCreateUser={setIsOpenModalCreateUser}
                fetchDataListInfo={fetchDataListInfo}
                roomID={id}
            />
            <UpdateInfo
                isOpenModalUpdate={isOpenModalUpdate}
                handleCloseModalUpdate={handleCloseModalUpdate}
                fetchDataListInfo={fetchDataListInfo}
                infoUpdate={infoUpdate}
                roomID={id}
            />
        </div>
    );
};

export default InfoCustomer;