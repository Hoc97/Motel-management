import './DetailRoom.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Tabs, Breadcrumb } from 'antd';
import { BsHouseAdd } from 'react-icons/bs';
import InfoCustomer from './InfoCustomer';
import Expense from './Expense';
const DetailRoom = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `Khách thuê phòng`,
            children: <InfoCustomer />,
        },
        {
            key: '2',
            label: `Chi phí`,
            children: <Expense />,
        },
    ];
    return (
        <div>
            <header className='header-detailroom'>
                <Breadcrumb
                    items={[
                        {
                            title: <Link to='/rooms'>Rooms</Link>,
                        },
                        {
                            title: 'Detail Room',
                        },
                    ]}
                />
            </header>
            <div className='content-detailroom'>
                <h3>Phòng trọ số {id}</h3>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} size={'large'} centered />
            </div>
        </div>
    );
};

export default DetailRoom;