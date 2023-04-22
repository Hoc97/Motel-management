import './DashBoard.scss';
import { BsHouse, BsBox } from 'react-icons/bs';
import { FiPackage } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';
import { getDashBoard } from '../../services/api';
import { useEffect, useState } from 'react';

const DashBoard = () => {
    const [dataDashBoard, setDataDashBoard] = useState([]);
    useEffect(() => {
        fetchDataDashBoard();
    }, []);

    const fetchDataDashBoard = async () => {
        let res = await getDashBoard();
        let currentlyRenting = res.data.currentlyRenting;
        let soonToBeReturn = res.data.soonToBeReturn;
        let roomAvailable = res.data.roomAvailable;
        let newData = {
            totalRoom: currentlyRenting + soonToBeReturn + roomAvailable,
            currentlyRenting,
            soonToBeReturn,
            roomAvailable
        };
        setDataDashBoard(newData);
    };
    const arrayIcon = [<BsHouse />, <FiPackage />, <ImWarning />, <BsBox />];
    const arrayTitle = ['Tổng số phòng', 'Đang thuê', 'Sắp trả', 'Phòng trống'];
    console.log('dataDashBoard', dataDashBoard, Object.keys(dataDashBoard));
    return (
        <div className='dashboard'>
            <header className='header'>DashBoard</header>
            <div className='content'>
                {Object.keys(dataDashBoard).length > 0 && (
                    Object.keys(dataDashBoard).map((item, index) => {
                        console.log('item', item);
                        return (
                            <div key={index} className='item'>
                                <div className={`box box-${index + 1}`}>
                                    <div className='title-item'>
                                        <span className='icon-home'>{arrayIcon[index]}</span>
                                        <span className='title'>{arrayTitle[index]}</span>
                                    </div>
                                    <h3 className='text'>{dataDashBoard[item]}</h3>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DashBoard;