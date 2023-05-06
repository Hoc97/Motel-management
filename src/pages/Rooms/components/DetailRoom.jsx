import './DetailRoom.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Tabs, Breadcrumb } from 'antd';
import InfoCustomer from './InfoCustomer';
import ExpenseDetail from './ExpenseDetail';
const DetailRoom = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const onChange = (key) => {
        // console.log('key', key);
    };
    const items = [
        {
            key: '1',
            label: `Khách thuê phòng`,
            children: <InfoCustomer id={id} />,
        },
        {
            key: '2',
            label: `Chi phí`,
            children: <ExpenseDetail id={id} />,
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
                <h2>{state?.name}</h2>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} size={'large'} centered />
            </div>
        </div>
    );
};

export default DetailRoom;