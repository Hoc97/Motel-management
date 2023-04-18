import CreateRoom from '../Modal/CreateRoom';
import RoomItem from './RoomItem';
import { Input, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useLayoutEffect, useState } from 'react';
const ListRoom = () => {
    const { Search } = Input;
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [query, setQuery] = useState('');
    const onSearch = (value) => {
        setQuery(value);
        console.log(value);
    };

    const handleShowModalCreate = () => {
        setIsOpenModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setIsOpenModalCreate(false);
    };



    return (
        <>
            <header className='header'>
                <div className='header-content'>
                    Danh sách phòng
                </div>
                <Search
                    className='search'
                    placeholder="Search"
                    onSearch={onSearch}
                    style={{
                        width: 200,
                    }}
                    enterButton
                />
                <Button className='btn-create' onClick={handleShowModalCreate}>
                    <span className='icon-create'><PlusCircleOutlined /></span>
                    <span>Tạo loại phòng</span>
                </Button>
            </header>
            <div className='content'>
                <div className='list-room'>
                    {[...Array(10)]
                        .filter((item, index) => index.toString().includes(query))
                        .map((item, index) => {
                            return (
                                <div key={index} className='room'>
                                    <RoomItem
                                        index={index}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <CreateRoom
                isOpenModalCreate={isOpenModalCreate}
                handleCloseModalCreate={handleCloseModalCreate}
            />
        </>
    );
};

export default ListRoom;