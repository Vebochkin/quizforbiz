import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import Whistory from '../../components/lk/history/Whistory';

const WriteOff = () => {
    const writeOffs = useSelector((state) => state.balance_history.writeOff);
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="write_off">
                    <h2>История списаний</h2>
                    <div className="history">
                        <div className="filt">
                            <p>#ID Заявки</p>
                            <p>Дата списания</p>
                            <p>Сумма списания</p>                            
                        </div>
                        <div className="items">
                            {writeOffs.length > 0 ? writeOffs.map(writeOff => (
                                <Whistory data={writeOff}/>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default WriteOff;