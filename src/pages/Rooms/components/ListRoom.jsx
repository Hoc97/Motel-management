import CreateRoom from '../Modal/Create.Room';
import UpdateRoom from '../Modal/Update.Room';
import { Button, Table, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { SlNote } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import HeaderListRoom from './HeaderListRoom/HeaderListRoom';
import ActionListRoom from './Action/Action.ListRoom';
import { getListRoom, postCreateRoom } from '../../../services/api';
import { useDebounce } from '../../../components/common/Common';
import { useNavigate } from 'react-router-dom';
import SetupExpense from '../Modal/Setup.Expense';


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
                if (text === "Đang cho thuê") {
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
            width: '18%',

        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '10%',
        },
    ];

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
    const [isOpenModalSetupExpense, setIsOpenModalSetupExpense] = useState(false);
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

    const handleShowModalSetupExpense = () => {
        setIsOpenModalSetupExpense(true);
    };

    const handleCloseModalSetupExpense = () => {
        setIsOpenModalSetupExpense(false);
    };

    const handleShowModalUpdate = (room) => {
        setRoomUpdate(room);
        setIsOpenModalUpdate(true);
    };

    const handleCloseModalUpdate = () => {
        setIsOpenModalUpdate(false);
    };

    useEffect(() => {
        fetchDataListRoom();
    }, []);

    const fetchDataListRoom = async () => {
        let res = await getListRoom();
        let newData = res.data.map(room => {
            return {
                id: room.id,
                key: room.id,  //unique key
                name: room.name,
                status: room.status,
                action: <ActionListRoom
                    handleShowModalUpdate={handleShowModalUpdate}
                    room={room}
                    fetchDataListRoom={fetchDataListRoom}
                />
            };
        });
        setListRoom(newData);
    };

    const dataSource = listRoom
        .filter(room => room.status.includes(query))
        .filter(item => item.name.toLowerCase().includes(debouncedValue.toLowerCase()));
    return (
        <>
            <header className='header'>
                <div className='header-content'>
                    Danh sách phòng
                </div>
                <div className='menu-item'>
                    <Button className='btn-create' onClick={handleShowModalCreate}>
                        <span className='icon-create'><PlusCircleOutlined /></span>
                        <span>Tạo phòng</span>
                    </Button>
                    <Button className='btn-setup' onClick={handleShowModalSetupExpense}>
                        <span className='icon-create'><SlNote /></span>
                        <span>Cài đặt chi phí</span>
                    </Button>
                </div>
            </header>
            <div className='content'>
                <div className='list-room'>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        bordered
                        pagination={false}
                        title={() => <HeaderListRoom
                            setQuery={setQuery}
                            setSearch={setSearch}
                            currentFilterRoom={dataSource.length}
                        />}
                    />

                </div>
            </div>
            <CreateRoom
                isOpenModalCreate={isOpenModalCreate}
                handleCloseModalCreate={handleCloseModalCreate}
                fetchDataListRoom={fetchDataListRoom}
            />
            <SetupExpense
                isOpenModalSetupExpense={isOpenModalSetupExpense}
                handleCloseModalSetupExpense={handleCloseModalSetupExpense}
                listRoom={listRoom}

            />
            <UpdateRoom
                roomUpdate={roomUpdate}
                isOpenModalUpdate={isOpenModalUpdate}
                handleCloseModalUpdate={handleCloseModalUpdate}
                fetchDataListRoom={fetchDataListRoom}
            />
        </>
    );
};

export default ListRoom;