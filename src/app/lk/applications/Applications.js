import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { APPLICATIONS } from '../../../middleware'; 
import LeftBar from '../../components/lk/leftBar/LeftBar'; 
import './style.scss'; import reload from '../../img/application/reload.svg'; 
import expor from '../../img/application/export.svg'; 
import ApplicationSmall from '../../components/lk/applications/ApplicationSmall'; 
import Filters from '../../components/lk/applications/Filters'; 
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';

const Application = () => { 
    const dispatch = useDispatch(); 
    const token = useSelector((state) => state.Token); 
    const data = useSelector((state) => state.applications); 
    const dateTo = useSelector((state) => state.filters.dateTo); 
    const dateFrom = useSelector((state) => state.filters.dateFrom); 
    const time = useSelector((state) => state.filters.time); 
    const citys = useSelector((state) => state.filters.city); 
    const names = useSelector((state) => state.filters.name);
    const [output, setOutput] = useState([]);
    const [output2, setOutput2] = useState([]);

    const exportToExcel = () => {
        const formattedData = data.map(application => ({
            '№ заявки': application.id,
            'Дата': application.date, 
            'Квиз': application.quizName,
            'Контакты': `${application.name} (${application.phone}) - ${application.email}`
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Заявки');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
        saveAs(dataBlob, 'заявки.xlsx');
    };
    useEffect(() => {
        const safeData = Array.isArray(data) ? [...data] : [];
        const parseDate = (str) => {
            if (!str) return null;
            const parts = str.split('.');
            if (parts.length !== 3) return null;
            const [day, month, year] = parts.map(Number);
            return new Date(year, month - 1, day);
        };
        const filteredApplications = safeData.filter(application => {
            if (!application.date) return false;

            const applicationDate = new Date(application.date);
            const startDate = parseDate(dateFrom);
            const endDate = parseDate(dateTo);


            let matchesTime = true;
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const weekAgo = new Date(today);
            weekAgo.setDate(today.getDate() - 7);
            const monthAgo = new Date(today);
            monthAgo.setMonth(today.getMonth() - 1);
            switch (time) {
                case 'today':
                    matchesTime = applicationDate.toDateString() === today.toDateString();
                    break;
                case 'yesterday':
                    matchesTime = applicationDate.toDateString() === yesterday.toDateString();
                    break;
                case 'week':
                    matchesTime = applicationDate >= weekAgo && applicationDate <= today;
                    break;
                case 'month':
                    matchesTime = applicationDate >= monthAgo && applicationDate <= today;
                    break;
                case 'all':
                default:
                    matchesTime = true;
                    break;
            }
            const matchesDate = (startDate ? applicationDate >= startDate : true) && (endDate ? applicationDate <= endDate : true);
            const matchesName = names ? application.quizName.toLowerCase().includes(names.toLowerCase()) : true;
            const matchesCity =
            citys === ''
                ? (application.position === '' || application.position === null || application.position === undefined)
                : citys
                    ? application.position === citys
                    : true;

            return matchesDate && matchesTime && matchesCity && matchesName;
        });
        const uniqueApplicationsMap = {};
        const uniqueApplications = [];
        filteredApplications.forEach(app => {
            if (!uniqueApplicationsMap[app.id]) {
                uniqueApplicationsMap[app.id] = true;
                uniqueApplications.push(app);
            }
        });
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        const filteredByLast3DaysMap = {};
        const filteredByLast3Days = safeData.filter(application => {
            if (!application.date) return false;
            const applicationDate = new Date(application.date);
            return applicationDate >= threeDaysAgo && applicationDate <= today;
        }).filter(app => {
            if (!filteredByLast3DaysMap[app.id]) {
                filteredByLast3DaysMap[app.id] = true;
                return true;
            }
            return false;
        });
        setOutput(uniqueApplications);
        setOutput2(filteredByLast3Days);
    }, [data, dateFrom, dateTo, time, citys, names]);

return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="application">
                    <div className="head">
                        <h2>Заявки</h2>
                        <div className="all">{data.length}</div>
                        <div className="new">Новые: <div>{output2.length}</div></div>
                        <button onClick={() => dispatch(APPLICATIONS(token))}><img src={reload} alt="#" />Обновить</button>
                        <button onClick={exportToExcel}><img src={expor} alt="#" />Экспорт</button>                            
                    </div>
                    <div className="content">
                        <Filters datas={output2.length}/>
                        <div className="items">
                            <div className="name">
                                <p>№ заявки</p>
                                <p>Дата</p>
                                <p>Квиз</p>
                                <p>Контакты</p>
                            </div>
                            <div className="scroll">
                            {output.length > 0 ? output.map((application, index) => (
                                <ApplicationSmall key={`${application.id}-${index}`} application={application} />
                            )) : null}  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default Application; 