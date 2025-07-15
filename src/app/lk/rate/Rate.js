import React from 'react';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import Rate from '../../components/lk/rates/Rates';

const User = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <Rate />
            </div>
        </div>
    </div>
  )
}
export default User;