import './DashBoard.scss';
import { BsHouse, BsBox } from 'react-icons/bs';
import { FiPackage } from 'react-icons/fi';
import { ImWarning } from 'react-icons/im';

const DashBoard = () => {
    return (
        <div className='dashboard'>
            <header className='header'>DashBoard</header>
            <div className='content'>
                <div className='item'>
                    <div className='box box-1 '>
                        <div className='title-item'>
                            <span className='icon-home'><BsHouse /></span>
                            <span className='title'>Tổng số phòng</span>
                        </div>
                        <h3 className='text'>34</h3>
                    </div>
                </div>
                <div className='item'>
                    <div className='box box-2'>
                        <div className='title-item'>
                            <span className='icon-home'><FiPackage /></span>
                            <span className='title'>Đang thuê</span>
                        </div>
                        <h3 className='text'>30</h3>
                    </div>
                </div>
                <div className='item'>
                    <div className='box box-3'>
                        <div className='title-item'>
                            <span className='icon-home'><ImWarning /></span>
                            <span className='title'>Sắp trả</span>
                        </div>
                        <h3 className='text'>1</h3>
                    </div>
                </div>
                <div className='item'>
                    <div className='box box-4'>
                        <div className='title-item'>
                            <span className='icon-home'><BsBox /></span>
                            <span className='title'>Phòng trống</span>
                        </div>
                        <h3 className='text'>3</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;