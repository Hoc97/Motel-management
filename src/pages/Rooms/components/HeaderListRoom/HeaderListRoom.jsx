import './HeaderListRoom.scss';
import { useEffect, useState } from 'react';
import { Input } from 'antd';

const HeaderListRoom = ({ setQuery, setSearch }) => {
    const [active, setActive] = useState("All");

    const handleFilter = (filter) => {
        setActive(filter);
        if (filter === "All") {
            setQuery('');
            return;
        }
        setQuery(filter);
    };

    const onSearch = (value) => {
        setSearch(value.target.value);
    };

    let arrFilter = ["All", "Đang thuê", "Sắp trả", "Phòng trống"];
    return (
        <div className='header-listroom'>
            <div className='filter'>
                <span className={`${active === arrFilter[0] ? 'active' : ''}`} onClick={() => handleFilter(arrFilter[0])}>Tất cả</span>
                <span className={`${active === arrFilter[1] ? 'active' : ''}`} onClick={() => handleFilter(arrFilter[1])}>Đang thuê</span>
                <span className={`${active === arrFilter[2] ? 'active' : ''}`} onClick={() => handleFilter(arrFilter[2])}>Sắp trả</span>
                <span className={`${active === arrFilter[3] ? 'active' : ''}`} onClick={() => handleFilter(arrFilter[3])}>Phòng trống</span>
            </div >
            <div className='input' >
                <Input onChange={onSearch} placeholder="Tìm kiếm tên phòng" allowClear />
            </div>
        </div>
    );
};

export default HeaderListRoom;