import CreateRoom from '../Modal/CreateRoom';
import UpdateRoom from '../Modal/UpdateRoom';
import { Button, Table, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import HeaderListRoom from './HeaderListRoom/HeaderListRoom';
import Action from './Action/Action';
import { getListRoom, postCreateRoom } from '../../../services/api';
import { useDebounce } from '../../../components/common/Common';
import { useNavigate } from 'react-router-dom';


const ListRoom = () => {
    const nav = useNavigate();
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
                return <span key={id} onClick={() => nav(`/rooms/${id}`, { state: { name: text } })}>{text}</span>;
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (text) => {
                let color = 'black';
                if (text === "Đang thuê") {
                    color = '#2c8949';
                }
                if (text === "Sắp trả") {
                    color = '#dc3545';
                }
                if (text === "Phòng trống") {
                    color = '#a36de4';
                }
                return (
                    <Tag color={color} key={text}>
                        {text.toUpperCase()}
                    </Tag>
                );
            },
            width: '15%',

        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
        },
    ];

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [roomUpdate, setRoomUpdate] = useState({});
    const [query, setQuery] = useState('');
    const [listRoom, setListRoom] = useState([]);
    const [search, setSearch] = useState('');
    const debouncedValue = useDebounce(search, 500);

    const handleShowModalCreate = () => {
        setIsOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setIsOpenModalCreate(false);
    };


    const handleShowModalUpdate = (room) => {
        setRoomUpdate(room);
        setIsOpenModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setIsOpenModalUpdate(false);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let res = await getListRoom();
        let newData = res.data.map(room => {
            return {
                id: room.id,
                key: room.id,  //unique key
                name: room.name,
                status: room.status,
                action: <Action
                    handleShowModalUpdate={handleShowModalUpdate}
                    room={room}
                    roomUpdate={roomUpdate}
                />
            };
        });
        setListRoom(newData);
    };
    return (
        <>
            <header className='header'>
                <div className='header-content'>
                    Danh sách phòng
                </div>
                <Button className='btn-create' onClick={handleShowModalCreate}>
                    <span className='icon-create'><PlusCircleOutlined /></span>
                    <span>Tạo loại phòng</span>
                </Button>
            </header>
            <div className='content'>
                <div className='list-room'>
                    <Table
                        columns={columns}
                        dataSource={listRoom
                            .filter(room => room.status.includes(query))
                            .filter(item => item.name.toLowerCase().includes(debouncedValue.toLowerCase()))
                        }
                        bordered
                        pagination={false}
                        title={() => <HeaderListRoom
                            setQuery={setQuery}
                            setSearch={setSearch}
                        />}
                    />

                </div>
            </div>
            <CreateRoom
                isOpenModalCreate={isOpenModalCreate}
                handleCloseModalCreate={handleCloseModalCreate}
            />
            <UpdateRoom
                roomUpdate={roomUpdate}
                isOpenModalUpdate={isOpenModalUpdate}
                handleCloseModalUpdate={handleCloseModalUpdate}
            />
        </>
    );
};

export default ListRoom;