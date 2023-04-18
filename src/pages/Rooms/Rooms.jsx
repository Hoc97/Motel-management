import './Rooms.scss';
import { Outlet } from "react-router-dom";


const Room = () => {

  return (
    <div className='manage-room'>
      <Outlet />
    </div>
  );
};

export default Room;