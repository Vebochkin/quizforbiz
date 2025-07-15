import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { REFRESH } from '../middleware.js';
import { islog } from '../actions.js';
import './App.scss';
import Auth from './Auth.js';
import Start from './lk/start/Start.js';
import User from './lk/rate/Rate.js';
import Application from './lk/applications/Applications.js';
import Notifications from './lk/notifications/Notifications.js';
import Base from './lk/base/Base.js';
import Advert from './lk/base/advert/Advert.js';
import Analytics from './lk/base/analytics/Analytics.js';
import Content from './lk/base/content/Content.js';
import Payment from './lk/base/payment/Payment.js';
import Settings from './lk/base/settings/Settings.js';
import IntegServ from './lk/base/integrations/servises/Servises.js';
import IntegSites from './lk/base/integrations/sites/Sites.js';
import Conversion from './lk/conversion/Conversion.js';
import Profile from './lk/profile/Profile.js';
import Balance from './lk/balance/Balance.js';
import Deposits from './lk/history/Deposits.js';
import WriteOff from './lk/history/WriteOff.js';
import Answer from './lk/answer/Answer.js';
import CreateQuizes from './constructor/CreateQuizes.js';
import CreateNew from './constructor/new/CreateNew.js';
import Install from './constructor/install/Install.js';
import Setting from './constructor/settings/Settings.js';
import Referal from './lk/referal/Referal.js';
import Integrations from './constructor/integ/Integrations.js';
import PrivateRoute from './PrivateRoute.js';
import Register from './Register.js';
import PrevievQuizPc from './constructor/previevQuizPc/PrevievQuizPc.js';
import Forgot from './Forgot.js';
import Reset from './Reset.js';
import Design from './constructor/design/Design.js';
import Plugins from './constructor/plugins/Plugins.js';
import StartAd from './constructor/startad/StartAd.js';
import PrevievQuizMob from './constructor/previevQuizMob/PrevievQuizMob.js';
import QUIZ from './QUIZ.js';
import Article from './components/lk/base/Article.js';

/* admin */
import Users from './admin/pages/Users';
import BlockedUsers from './admin/pages/BlockedUsers';
import UserAdmin from './admin/pages/User';
import Statist from './admin/pages/Statist';
import Deposit from './admin/pages/Deposit';
import WriteOffAdmin from './admin/pages/WriteOff';
import WriteOffError from './admin/pages/WriteOffError';
import BannedWords from './admin/pages/BannedWords';
import WriteOffRequest from './admin/pages/WriteOffRequest.js';
import BaseAdmin from './admin/pages/Base.js';
import ArticlesAdmin from './admin/pages/Articles.js';
import ArticleAdmin from './admin/pages/Article.js';


import NOTFOUND from './NOTFOUND.js';
import UserToken from './UserToken.js';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuth);    
  const isAdmin = useSelector((state) => state.isAdmin);    
  const currentBase = useSelector((state) => state.current_base_index);   
  const currentQuiz = useSelector((state) => state.createQuiz.currentQuizID);  
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    dispatch(REFRESH(token));
  }, [isAuthenticated]);  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="*" element={<NOTFOUND />} />

        <Route path="/reg" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:resetId" element={<Reset />} />
        <Route path="/quiz/:quizId" element={<QUIZ />} />

        <Route path="/user/:userToken" element={<UserToken />} />

        <Route path="/user" element={<PrivateRoute element={<Start />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/rates" element={<PrivateRoute element={<User  />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/referal" element={<PrivateRoute element={<Referal />} isAuthenticated={isAuthenticated} />} />
        
        <Route path="/user/applications" element={<PrivateRoute element={<Application />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/applications/answer/:answerID" element={<PrivateRoute element={<Answer />} isAuthenticated={isAuthenticated} />} />

        <Route path="/user/notifications" element={<PrivateRoute element={<Notifications />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base" element={<PrivateRoute element={<Base />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/base/${currentBase}`} element={<PrivateRoute element={<Article />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/advert" element={<PrivateRoute element={<Advert />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/analytics" element={<PrivateRoute element={<Analytics />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/content" element={<PrivateRoute element={<Content />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/integrations/sites" element={<PrivateRoute element={<IntegSites />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/integrations/servises" element={<PrivateRoute element={<IntegServ />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/payment" element={<PrivateRoute element={<Payment />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/base/settings" element={<PrivateRoute element={<Settings />} isAuthenticated={isAuthenticated} />} />

        <Route path="/user/profile" element={<PrivateRoute element={<Profile />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/balance" element={<PrivateRoute element={<Balance />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/deposits" element={<PrivateRoute element={<Deposits />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/writeoff" element={<PrivateRoute element={<WriteOff />} isAuthenticated={isAuthenticated} />} />
        <Route path="/user/createquizes" element={<PrivateRoute element={<CreateQuizes />} isAuthenticated={isAuthenticated} />} />

        <Route path={`/user/quiz/${currentQuiz}`} element={<PrivateRoute element={<CreateNew />} isAuthenticated={isAuthenticated} />} />    

        <Route path={`/user/quiz/${currentQuiz}/conversion`} element={<PrivateRoute element={<Conversion />} isAuthenticated={isAuthenticated} />} />

        <Route path={`/user/quiz/${currentQuiz}/previev/pc`} element={<PrivateRoute element={<PrevievQuizPc />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/previev/mob`} element={<PrivateRoute element={<PrevievQuizMob />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/install`} element={<PrivateRoute element={<Install />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/settings`} element={<PrivateRoute element={<Setting />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/integrations`} element={<PrivateRoute element={<Integrations />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/design`} element={<PrivateRoute element={<Design />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/plugins`} element={<PrivateRoute element={<Plugins />} isAuthenticated={isAuthenticated} />} />
        <Route path={`/user/quiz/${currentQuiz}/startadvert`} element={<PrivateRoute element={<StartAd />} isAuthenticated={isAuthenticated} />} />



        {/* admin */}
        <Route path="/admin/users" element={<PrivateRoute element={<Users />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/base" element={<PrivateRoute element={<BaseAdmin />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/base/:baseId" element={<PrivateRoute element={<ArticleAdmin />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/article/:articleID" element={<PrivateRoute element={<ArticlesAdmin />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/user/:userID" element={<PrivateRoute element={<UserAdmin />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/statist" element={<PrivateRoute element={<Statist />} isAuthenticated={isAdmin} />} />  
        <Route path="/admin/deposits" element={<PrivateRoute element={<Deposit />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/bannedUsers" element={<PrivateRoute element={<BlockedUsers />} isAuthenticated={isAdmin} />} />
        <Route path="/admin/writeOff" element={<PrivateRoute element={<WriteOffAdmin />} isAuthenticated={isAdmin} />} />    
        <Route path="/admin/writeOffError" element={<PrivateRoute element={<WriteOffError />} isAuthenticated={isAdmin} />} />   
        <Route path="/admin/request_writeOff" element={<PrivateRoute element={<WriteOffRequest />} isAuthenticated={isAdmin} />} /> 
        <Route path="/admin/bannedWodrs" element={<PrivateRoute element={<BannedWords />} isAuthenticated={isAdmin} />} /> 
      </Routes>
    </BrowserRouter>
  );    
}

export default App;
