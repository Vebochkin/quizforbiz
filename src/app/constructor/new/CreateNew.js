import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QUIZ } from '../../../middleware';
import LeftBar from '../../components/constructor/leftbar/LeftBar';
import Constructor from '../../components/constructor/Constructor';

const CreateNew = () => {
  const dispatch = useDispatch();
  const isData = useSelector((state) => state.createQuiz.isData);
  const token = useSelector((state) => state.Token);
  const currentQuizID = useSelector((state) => state.createQuiz.currentQuizID);
  useEffect(() => {
    if (!isData) {
      dispatch(QUIZ(currentQuizID, token));
    }
  })
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
              <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
              {isData ? <Constructor /> : null}
              
            </div>
        </div>
    </div>
  )
}


export default CreateNew;