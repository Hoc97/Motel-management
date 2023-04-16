import CreateRoom from '../Modal/CreateRoom';
import RoomItem from './RoomItem';
import { Input, Button } from 'antd';
import { useState } from 'react';
const ListRoom = () => {
    const { Search } = Input;
    const [isModalCreate, setIsModalCreate] = useState(false);
    const onSearch = (value) => console.log(value);

    const handleShowModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleCloseModalCreate = () => {
        setIsModalCreate(false);
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
                <Button className='btn-create' onClick={handleShowModalCreate}>Tạo loại phòng</Button>
            </header>
            <div className='content'>
                <div className='list-room'>
                    {
                        [...Array(10)].map((item, index) => {
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
                isModalCreate={isModalCreate}
                handleCloseModalCreate={handleCloseModalCreate}
            />
        </>
    );
};

export default ListRoom;