import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    type: '',
    createQuiz: {
        currentSection: 0,
        currentQuestion: null,
        currentQuestionIndex: 0,
        countQuestions: 0,
        currentQuizID: 0,
        isData: false,
        is_active: false,
        data: {}
    },
    quiz: {
        currentSection: 0,
        currentQuestion: null,
        currentQuestionIndex: 0,
        countQuestions: 0,
        currentQuizID: 0,
        isQuiz: false,
        data: {}
    },
    userAnswer: [],
    quizes: [],
    conversion: {},
    quizName: '',
    isQuizes: false,
    isApplications: false,
    applications: [],
    filters: {
        type: null,
        name: null,
        city: null,
        time: null,
        dateFrom: null,
        dateTo: null
    },
    application: {
        id: 0,
        data: {}
    },    
    notifications: [],
    profile: {},
    profile_rate: {},
    login: '',
    email: '',
    isAuth: false,
    isAdmin: false,    
    isProfile: false,
    balance: -1,
    balance_history: {
        deposits: [],
        writeOff: []
    },
    base: {},
    current_base: [],
    current_base_index: null,
    Token: '',
    rate: '',
    isPopUp2: true,
    leftbarLk: 2,
    leftbarConstr: 1,
    admin: {
        statistic: {},
        filters: {
            from: {
                year: 2025,
                month: 1,
                day: 1
            },
            to: {
                year: 2025,
                month: 4,
                day: 1
            }
        },
        users: [],
        blockedUsers: [],
        currentUser: {},
        deposits: [],
        bannedWords: [],
        isUser: false,
        isUsers: false,
        isBlocked: false,
        current_base: [],
        base_index: null,
        base_name: '',
        base_name_index: ''
    }
};



const RootReducer = createReducer(initialState, builder => {
    builder 
    /* Конструктор */
    .addCase('HANDLEBUTTONCLICK', (state, action) => {
        state.createQuiz.currentSection = action.payload;
    })
    .addCase('HANDLEINPUTCHANGE', (state, action) => {
        const { canvas, field, value } = action.payload;
        state.createQuiz.data[canvas][field] = value;
    })
    .addCase('CHANGE_TITLE', (state, action) => {
        state.createQuiz.data.title = action.payload; 
    })
    .addCase('HANDLEBUTTONBLUR', (state, action) => {
        const { canvas, field, value } = action.payload;
        state.createQuiz.data[canvas][field] = value;
    })
    .addCase('HANDLEREMOVEFIELD', (state, action) => {
        const { canvas, field } = action.payload;
        state.createQuiz.data[canvas][field] = null;
    })
    .addCase('HANDLEIMAGECHANGE', (state, action) => {
        const { canvas, file } = action.payload;
        if (canvas === 'canvas1') {
            state.createQuiz.data.isvideo1 = false;
        }
        if (canvas === 'canvas3') {
            state.createQuiz.data.isvideo2 = false;
        }
        state.createQuiz.data[canvas].video = null;
        state.createQuiz.data[canvas].img = file; 
    })
    .addCase('HANDLEMOBILECHANGE', (state, action) => {
        const { canvas, file } = action.payload;
        state.createQuiz.data[canvas].mobile = file; 
    })
    .addCase('HANDLEIMAGE2CHANGE', (state, action) => {
        const { canvas, file } = action.payload;
        state.createQuiz.data[canvas].logo = file; 
    })
    .addCase('HANDLEVIDEOCHANGE', (state, action) => {
        const { canvas, file } = action.payload;
        state.createQuiz.data[canvas].video = file; 
    })
    .addCase('RESETBACKGROUND', (state, action) => {
        const canvas = action.payload;
        if (canvas === 'canvas1' && state.createQuiz.data.isvideo1 === false) {
            state.createQuiz.data.isvideo1 = true;
        } else {
            state.createQuiz.data.isvideo1 = false;
        }
        if (canvas === 'canvas3' && state.createQuiz.data.isvideo2 === false) {
            state.createQuiz.data.isvideo2 = true;
        } else {
            state.createQuiz.data.isvideo2 = false;
        }
        state.createQuiz.data[canvas].video = null;
        state.createQuiz.data[canvas].img = null;
    })
    .addCase('HANDLESETCURRENTSECTION', (state, action) => {
        state.createQuiz.currentSection = action.payload;
    })
    .addCase('HANDLESETCURRENTQUESTIONINDEX', (state, action) => {
        state.createQuiz.currentQuestionIndex = action.payload;
    })
    .addCase('ADDQUESTION', (state, action) => {
        state.createQuiz.data.canvas2.push(action.payload);
        if (state.createQuiz.currentQuestionIndex === 9) {
            state.createQuiz.countQuestions = 10;
        }
    })
    .addCase('HANDLESETCURRENTQUESTION', (state, action) => {
        state.createQuiz.currentQuestion = action.payload;
    })
    .addCase('INCREMENTCOUNTQUESTION', (state) => {
        state.createQuiz.currentQuestion = null;        
        state.createQuiz.currentQuestionIndex = state.createQuiz.data.canvas2.length;
        if (state.createQuiz.currentQuestionIndex === 9) {
            state.createQuiz.countQuestions = 10;
        }
    })
    .addCase('UPDATEQUESTION', (state, action) => {
        const { index, newQuestionData } = action.payload;
        state.createQuiz.data.canvas2[index] = {
            ...state.createQuiz.data.canvas2[index], 
            ...newQuestionData 
        };
    })
    .addCase('CHANGEQUESTION', (state, action) => {
        if (state.createQuiz.currentQuestionIndex === 0 && action.payload < 0) {
            state.createQuiz.currentQuestionIndex = 0;
        } else if (state.createQuiz.currentQuestionIndex === 9) {
            state.createQuiz.countQuestions = 10;
            state.createQuiz.currentQuestionIndex = 8;
        } else {
            state.createQuiz.currentQuestionIndex += action.payload; 
        }
        const currentIndex = state.createQuiz.currentQuestionIndex;
        if (state.createQuiz.data.canvas2[currentIndex] && state.createQuiz.data.canvas2[currentIndex].name) {
            state.createQuiz.currentQuestion = state.createQuiz.data.canvas2[currentIndex].name;
        } else if (currentIndex >= 1) {
            state.createQuiz.currentQuestion = state.createQuiz.data.canvas2[currentIndex - 1].name;            
        } else {
            state.createQuiz.currentQuestion = null;
        }
    })
    .addCase('REMOVEQUESTION', (state, action) => {
        state.createQuiz.data.canvas2.splice(action.payload, 1);
        state.createQuiz.currentQuestion = null; 
    })
    .addCase('CLEAR_CANVAS2', (state) => {
        state.createQuiz.data.canvas2 = []; 
        state.createQuiz.currentQuestionIndex = 0; 
        state.createQuiz.currentQuestion = null;
        state.createQuiz.data.title = 'Заголовок страницы';
    })
    .addCase('TURNOFFCANVAS1', (state) => {
        state.createQuiz.data.canvas1.isActive = false;
        state.createQuiz.data.canvas1.video = null;
        state.createQuiz.data.canvas1.img = null;
        state.createQuiz.data.canvas1.logo = null;
        state.createQuiz.data.canvas1.mobile = null;
    })
    .addCase('TURNONCANVAS1', (state) => {
        state.createQuiz.data.canvas1.isActive = true;
    })
    .addCase('SET_ALIGN', (state, action) => {
        state.createQuiz.data.canvas1.aling = action.payload; 
    })
    .addCase('SET_ALIGN3', (state, action) => {
        state.createQuiz.data.canvas3.aling = action.payload; 
    })
    .addCase('CHANGETHEME', (state, action) => {
        state.createQuiz.data.theme.theme = action.payload; 
    })
    .addCase('CHANGEBACKGROUNDCOLOR', (state, action) => {
        state.createQuiz.data.theme.theme = 'user';
        state.createQuiz.data.theme.background_color = action.payload;
    })
    .addCase('CHANGETEXTCOLOR', (state, action) => {
        state.createQuiz.data.theme.theme = 'user';
        state.createQuiz.data.theme.text_color = action.payload;
    })
    .addCase('CHANGEBUTTONCOLOR', (state, action) => {
        state.createQuiz.data.theme.theme = 'user';
        state.createQuiz.data.theme.button_color = action.payload;
    })
    .addCase('CHANGEBUTTONTEXTCOLOR', (state, action) => {
        state.createQuiz.data.theme.theme = 'user';
        state.createQuiz.data.theme.button_text_color = action.payload;
    })
    .addCase('CHANGEFONT', (state, action) => {
        state.createQuiz.data.theme.font = action.payload;
    })
    .addCase('CHANGEBUTTONSTYLE', (state, action) => {
        state.createQuiz.data.theme.button_style = action.payload;
    })
    /* ЛК */
    .addCase('LOGIN_SUCCESS', (state, action) => {
        if (action.payload.data.isAdmin) {
            state.isAdmin = true;
            state.Token = action.payload.data.accessToken; 
        } else {
            if (action.payload.data.accessToken) {
                state.Token = action.payload.data.accessToken; 
                localStorage.setItem('access_token', state.Token); 
                state.login = 'ok';
                state.isAuth = true;
            }            
        }
    })
    .addCase('LOGIN_LK', (state, action) => {
        state.Token = action.payload.accessToken; 
        localStorage.setItem('access_token', state.Token); 
        state.login = 'ok';
        state.isAuth = true;
    })
    .addCase('LOGIN_ERROR', (state) => {
        state.login = 'error';
    })
    .addCase('LOGIN_FAILED', (state) => {
        state.login = 'no';
    })
    .addCase('LOGOUT', (state) => {
        localStorage.removeItem('access_token');
        state.isAuth = false;
        state.isAdmin = false;
        state.isQuizes = false;
        state.login = 'no';
        state.Token = '';
        const cookies = document.cookie.split("; ");
        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly; SameSite=Strict`;
        }

    })

    .addCase('SET_BALANCE', (state, action) => {
        state.balance = action.payload;
    })
    .addCase('SET_RATE', (state, action) => {
        if (action.payload === 1) {
            state.rate = 'Бесплатный';
        } else if (action.payload === 2) {
            state.rate = 'Оптимальный';
        } else if (action.payload === 3) {
            state.rate = 'Премиум';
        }
    })
    .addCase('SET_QUIZES', (state, action) => {
        state.quizes = action.payload;
    })
    .addCase('SET_APPLICATIONS', (state, action) => {
        state.isApplications = true;
        state.applications = action.payload;
    })
    .addCase('SET_APPLICATION', (state, action) => {
        state.application.data = action.payload;
    })
    .addCase('NO_APPLICATIONS', (state, action) => {
        state.isApplications = false;
    })
    .addCase('SET_PROFILE', (state, action) => {
        state.isProfile = true;
        state.profile = action.payload.user;
        state.profile_rate = action.payload.profile;
    })
    .addCase('NO_PROFILE', (state) => {
        state.isProfile = false;
    })
    .addCase('REFRESH_SUCCESS', (state, action) => {
        state.Token = action.payload.data.accessToken;
        localStorage.setItem('access_token', state.Token); 
        state.login = 'ok';
        state.isAuth = true;        
    })
    .addCase('REFRESH_ERROR', (state) => {
        localStorage.removeItem('access_token');
        state.Token = '';
        state.login = 'error';
        state.isAuth = false;
    })
    .addCase('ISQUIZES', (state) => {
        state.isQuizes = false;        
    })
    .addCase('NOQUIZES', (state) => {
        state.isQuizes = true;
    })
    .addCase('SET_CURRENT_QUIZ', (state, action) => {
        state.createQuiz.currentQuizID = action.payload;
    })
    .addCase('SET_CURRENT_QUIZ2', (state, action) => {
        state.quiz.currentQuizID = action.payload;    
    })
    .addCase('SET_QUIZ', (state, action) => {
        state.createQuiz.isData = true;
        state.createQuiz.currentSection = 0;
        state.createQuiz.currentQuestion = null;
        state.createQuiz.currentQuestionIndex = 0;
        state.createQuiz.countQuestions = 0;
        state.createQuiz.data = action.payload.params;
        state.createQuiz.is_active = action.payload.enabled;
    })
    .addCase('SET_NO_QUIZ', (state) => {
        state.createQuiz.isData = false;
        state.createQuiz.data = {};
        state.createQuiz.currentSection = 0;
        state.createQuiz.currentQuestion = null;
        state.createQuiz.currentQuestionIndex = 0;
        state.createQuiz.countQuestions = 0;
    })
    .addCase('SET_CONVERSION', (state, action) => {
        state.conversion = action.payload;
    })
    .addCase('DELETE_CONVERSION', (state) => {
        state.conversion = {};
        state.quizName = '';
    })
    .addCase('DELETE_APPLICATION', (state) => {
        state.application.data = {};
        state.application.id = '';
    })
    .addCase('SET_NAME_QUIZ', (state, action) => {
        state.quizName = action.payload;
    })
    .addCase('SET_ID_APPLICATION', (state, action) => {
        state.application.id = action.payload;
    })
    .addCase('SET_QUIZ2', (state, action) => {
        state.quiz.data = action.payload;
    })
    .addCase('SET_LEFTBAR', (state, action) => {
        state.leftbarLk = action.payload;
    })
    .addCase('SET_LEFTBAR2', (state, action) => {
        state.leftbarConstr = action.payload;
    })
    .addCase('SET_ANSWER', (state, action) => {
        state.userAnswer.push(action.payload);
    })
    .addCase('CHANGE_ANSWER', (state, action) => {
        const { id, data } = action.payload;
        state.userAnswer[id] = data;
    })

    .addCase('SET_CITY', (state, action) => {
        state.filters.city = action.payload;
    })
    .addCase('SET_TIME', (state, action) => {
        state.filters.time = action.payload;
    })
    .addCase('SET_DATE_TO', (state, action) => {
        state.filters.dateTo = action.payload;
    })
    .addCase('SET_DATE_FROM', (state, action) => {
        state.filters.dateFrom = action.payload;
    })
    .addCase('SET_TYPE', (state, action) => {
        state.filters.type = action.payload;
    })
    .addCase('SET_NAME', (state, action) => {
        state.filters.name = action.payload;
    })
    .addCase('SET_NOTIFICATIONS', (state, action) => {
        state.notifications = action.payload;
    })
    .addCase('SET_HISTORY', (state, action) => {
        const deposits = [];
        const writeOff = [];
        action.payload.forEach(transaction => {
            if (transaction.operation === 'minus') {
                writeOff.push(transaction);
            } else {
                deposits.push(transaction); 
            }
        });
        state.balance_history.deposits = deposits;
        state.balance_history.writeOff = writeOff;
    })
    .addCase('NO_POPUP2', (state) => {
        state.isPopUp2 = false;
    })
    .addCase('SET_COUNT_BASE', (state, action) => {
        state.base = action.payload;
    })
    .addCase('SET_BASE', (state, action) => {
        state.current_base = action.payload;
    })
    .addCase('SET_CURRENT_BASE', (state, action) => {
        state.current_base_index = action.payload;
    })
    /* admin */
    .addCase('SET_STATIST', (state, action) => {
        state.admin.statistic = action.payload;
    })
    .addCase('SET_USERS', (state, action) => {
        state.admin.users = action.payload;
    })
    .addCase('SET_USER', (state, action) => {
        state.admin.currentUser = action.payload;
    })
    .addCase('SET_DEPOSITS', (state, action) => {
        state.admin.deposits = action.payload;
    })
    .addCase('SET_BANNEDWORDS', (state, action) => {
        state.admin.bannedWords = action.payload;
    })
    .addCase('SET_BANNEDUSERS', (state, action) => {
        state.admin.blockedUsers = action.payload;
    })
    .addCase('IS_USERS', (state) => {
        state.admin.isUsers = true;
    })
    .addCase('IS_USER', (state) => {
        state.admin.isUser = true;
    })
    .addCase('NO_USERS', (state) => {
        state.admin.isUsers = false;
    })
    .addCase('NO_USER', (state) => {
        state.admin.isUser = false;
    })
    .addCase('NO_DATA_USER', (state) => {
        state.admin.currentUser = {};
    })
    .addCase('NO_BANNED', (state) => {
        state.admin.isBlocked = false;
    })
    .addCase('IS_BANNED', (state) => {
        state.admin.isBlocked = true;
    })

    .addCase('SET_BASE_NAME', (state, action) => {
        state.admin.base_name = action.payload;
            switch (action.payload) {
        case 'Оплата':
            state.admin.base_name_index = 1;
            break;
        case 'Наполнение квиза':
            state.admin.base_name_index = 7;
            break;
        case 'Настройка квиза':
            state.admin.base_name_index = 2;
            break;
        case 'Интеграция с сайтом':
            state.admin.base_name_index = 3;
            break;
        case 'Интеграция с сервисами':
            state.admin.base_name_index = 4;
            break;
        case 'Аналитика':
            state.admin.base_name_index = 5;
            break;
        case 'Реклама':
            state.admin.base_name_index = 6;
            break;
        default:
            state.admin.base_name_index = null;
            break;
    }
    })
    .addCase('SET_BASE_INDEX', (state, action) => {
        state.admin.base_index = action.payload;
    })
    .addCase('SET_BASE_ADMIN', (state, action) => {
        console.log(action.payload);
        state.admin.current_base = action.payload;
    })
});

export default RootReducer;