import { Space, Table, message } from 'antd';
import avatar from '../../../assets/Image/avatar/avatar1.jpg';
import { useEffect, useState } from 'react';
import ActionInfo from './Action/Action.Info';
import UpdateInfo from '../Modal/Update.Info';


const InfoCustomer = () => {
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
            width: '25%',
            align: 'center',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%',
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
            width: '10%',
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
    const handleShowModalUpdate = (room) => {
        setInfoUpdate(room);
        setIsOpenModalUpdate(true);
    };


    const handleCloseModalUpdate = () => {
        setIsOpenModalUpdate(false);
    };



    const data = [
        {
            key: '1',
            name: 'Nguyễn Văn A',
            email: 'ngvana@gmail.com',
            sdt: '0123456789',
            image: <img className='avatar' src={avatar} alt='' />,

            action: <ActionInfo
                handleShowModalUpdate={handleShowModalUpdate}
            // room={room}
            // fetchDataListRoom={fetchDataListRoom}
            />
        },
        {
            key: '2',
            name: 'Nguyễn Văn B',
            email: 'ngvanb@gmail.com',
            sdt: '0123456789',
            image: <img className='avatar' src={avatar} alt='' />,
            action: <ActionInfo
                handleShowModalUpdate={handleShowModalUpdate}
            // room={room}
            // fetchDataListRoom={fetchDataListRoom}
            />
        },
        {
            key: '3',
            name: 'Nguyễn Văn c',
            email: 'ngvanc@gmail.com',
            sdt: '0123456789',
            image: <img className='avatar' src={avatar} alt='' />,
            action: <ActionInfo
                handleShowModalUpdate={handleShowModalUpdate}
            // room={room}
            // fetchDataListRoom={fetchDataListRoom}
            />
        },
    ];

    useEffect(() => {
        fetchDataListInfo();
    }, []);

    const fetchDataListInfo = async () => {
        // let res = await getListRoom();
        // let newData = res.data.map(room => {
        //     return {
        //         id: room.id,
        //         key: room.id,  //unique key
        //         name: room.name,
        //         status: room.status,
        //         action: <ActionListRoom
        //             handleShowModalUpdate={handleShowModalUpdate}
        //             room={room}
        //             fetchDataListRoom={fetchDataListRoom}
        //         />
        //     };
        // });
        // setListInfo(newData);
    };

    return (
        <div className='info-user'>
            <div className='info'>
                <Table
                    style={{ borderRadius: '10px', backgroundColor: 'yellow' }}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
            <UpdateInfo
                isOpenModalUpdate={isOpenModalUpdate}
                infoUpdate={infoUpdate}
                handleCloseModalUpdate={handleCloseModalUpdate}
                fetchDataListInfo={fetchDataListInfo}
            />
        </div>
    );
};

export default InfoCustomer;