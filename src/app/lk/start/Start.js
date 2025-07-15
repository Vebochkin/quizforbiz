import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QUIZESALL } from '../../../middleware';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import Quizes from '../../components/lk/quizes/Quizes';

const Start = () => {
  // const isQuiz = useSelector((state) => state.isQuizes);
  // const token = useSelector((state) => state.Token);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!isQuiz) {
  //     dispatch(QUIZESALL(token)); 
  //   }
  // });
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
              <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
              <Quizes />
            </div>
        </div>
    </div>
  )
}
export default Start;