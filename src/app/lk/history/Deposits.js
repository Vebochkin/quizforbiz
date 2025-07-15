import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import Dprocess from '../../components/lk/history/Dprocess';
import Dpaid from '../../components/lk/history/Dpaid';
import Derror from '../../components/lk/history/Derror';
import Drefund from '../../components/lk/history/Drefund';
import Dreferal from '../../components/lk/history/Dreferal';

const Deposits = () => {
    const deposit = useSelector((state) => state.balance_history.deposits);
    const renderStatusComponent = (item) => {
        switch (item.status) {
            case 'process':
                return <Dprocess data={item}/>;
            case 'paid':
                return <Dpaid data={item}/>;
            case 'error':
                return <Derror data={item}/>;
            case 'refund':
                return <Drefund data={item}/>;
            case 'referral':
                return <Dreferal data={item}/>;
            default:
                return null;
        }
    };
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="deposits">
                    <h2>История платежей</h2>
                    <div className="history pc">
                        <div className="filt">
                            <p>№ / #ID</p>
                            <p>Дата</p>
                            <p>Стоимость</p>
                            <p>Статус</p>                            
                        </div>
                        <div className="items">
                            {deposit.length > 0 ? deposit.map(item => (renderStatusComponent(item))) : null}
                        </div>
                    </div>
                    <div className="history mobile">
                        <div>
                            <div className="filt">
                                <p>№ / #ID</p>
                                <p>Дата</p>
                                <p>Стоимость</p>
                                <p>Статус</p>                            
                            </div>
                            <div className="items">
                                {deposit.length > 0 ? deposit.map(item => (renderStatusComponent(item))) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Deposits;