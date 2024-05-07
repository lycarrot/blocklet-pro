
import {  Outlet } from 'react-router-dom';
const SubPage1 = () => {

  return (
    <div className='bg-white  flex-grow overflow-hidden'> 
      <Outlet/>
    </div>
  );
}

export default SubPage1;
