import { setQuizes, setBalance, setProfile, setQuiz, setCurrentQuiz, noQuizes, logOut, isQuizes, setQuiz2, setApllications, noApplications, setStatist, setUsers, setUser, setDeposits, setBannedWords, setBannedUsers, isUser, isUsers, noUser, noUsers, isBlocked, noBlocked, setRate, setConverion, setApllication, setNotifications, setHistory, setCountBase, setBase, setBaseAdmin, noProfile } from './actions'; 
const url = 'https://api.quizforbiz.ru';

export const REGISTER = (formData) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/register`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        if (data.success === true) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } else {
            dispatch({ type: 'LOGIN_FAILED', payload: data });
        }
    } catch (error) {       
        dispatch({ type: 'LOGIN_ERROR'});
        console.error("Error occurred:", error); 
    }
};
export const LOGIN = (formData) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        if (data.success === true) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } else {
            dispatch({ type: 'LOGIN_FAILED', payload: data });
        }
    } catch (error) {       
        dispatch({ type: 'LOGIN_ERROR'});
        console.error("Error occurred:", error); 
    }
};
export const LOGOUT = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/logout`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})

        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(logOut());
    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const FORGOT = (formData) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/forgot`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

        console.log('ok')

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const RESET = (formData) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/reset`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const RESETPASSWORD = (formData) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/me/change/password`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const REFRESH = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/refresh-token`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({}),
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        if (data.success === true) {
            dispatch({ type: 'REFRESH_SUCCESS', payload: data });
        } else {
            dispatch({ type: 'REFRESH_FAILED', payload: data });
        }
    } catch (error) { 
        dispatch({ type: 'REFRESH_ERROR'});
        console.error("Error occurred:", error); 
    }
};


export const BALANCE = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/balance`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setBalance(data.count)); 
        dispatch(setRate(data.rate)); 
        dispatch(noQuizes());

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const PROFILE = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/me`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setProfile(data.data)); 
    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const PUTPROFILE = (token, datas) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/me/change/profile`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datas)
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        dispatch(noProfile());
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};

export const QUIZ = (id, token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setQuiz(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const QUIZESALL = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setQuizes(data)); 
        dispatch(noQuizes());

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const PUTQUIZNAME = (ID, newName, token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name: newName, id: ID})
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(isQuizes());

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const PUTQUIZ = (ID, token, datas) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id: ID, params: datas})
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(isQuizes());

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const POSTQUIZ = (newName, token, createQuizData) => async (dispatch) => { 
    try {
        const response = await fetch(`http://quizforbiz.ru:8001/api/quiz`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: newName, 
                params: createQuizData
            })
        });
        
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Fetch failed with status:', response.status, 'Error:', errorData); 
            throw new Error(errorData.message || 'Failed to create quiz');
        }
        
        const data = await response.json();
        dispatch(setCurrentQuiz(data.id));
        dispatch(isQuizes());
        return data;
        
    } catch (error) {       
        console.error("Error occurred:", error);
        throw error;
    }
};
export const DELETEQUIZ = (id, token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(isQuizes());

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};

export const APPLICATIONS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/application/0/9999999999999`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setApllications(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const APPLICATION = (token, ID) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/application/${ID}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setApllication(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const DELETEAPPLICATION = (id, token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/application/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const CONVERSION = (id, token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/${id}/conversion`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setConverion(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const SENDDATA = (userData) => async (dispatch) => {
    try {
        const response = await fetch(`${url}/api/application`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
    } catch (error) {       
        console.error('Error occurred:', error); 
    }
};
export const QUIZ2 = (id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setQuiz2(data.params)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};

export const TURNOFFQUIZ = (token, ID) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/enabled`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id: ID, enabled: 0})
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const TURNONQUIZ = (token, ID) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/enabled`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id: ID, enabled: 1})
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const STATUS = (id, quiz_id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/quiz/counter`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'quiz_id': quiz_id, 'operation_id': id})
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error('Error occurred:', error); 
    }
};  

export const NOTIFICATIONS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/notification`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setNotifications(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const HISTORY = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/balance_history`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setHistory(data.balance_history)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const DELETEHISTORY = (token, id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/balance_history/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const COUNTBASE = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/articles/counter`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setCountBase(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const BASE = (token, id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/article/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setBase(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
/* admin */
export const STATIS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/statist`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setStatist(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const DEPOSITS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/deposits`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setDeposits(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};

export const USERS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/users/0/0/9999999999999`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setUsers(data)); 
        dispatch(isUsers()); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const BANNEDUSERS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/users/1/0/9999999999999`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(isBlocked());
        dispatch(setBannedUsers(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const USER = (token, id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/user/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setUser(data)); 
        dispatch(isUser()); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const USERDEPOSIT = (token, datas) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/user/deposit`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datas)
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(noUser()); 

    } catch (error) {      
        console.error("Error occurred:", error); 
    }
};
export const USERCHANGERATE = (token, id, rates) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/user/rate`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({user_id: id, rate_id: rates})
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(noUser()); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const USERBANNED = (token, datas) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/user/banned`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datas)
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(noUser()); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};


export const BANNEDWORDS = (token) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/word`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        dispatch(setBannedWords(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const DELETEWORD = (token, wordID) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/word/${wordID}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const POSTWORD = (token, word) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/word`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(word)

        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const PUTWORD = (token, word) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/word`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(word)

        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};

export const BASEADMIN = (token, id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/article/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();
        console.log(data);
        dispatch(setBaseAdmin(data)); 

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const ARTICLEPOST = (token, datas) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/article`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datas)
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const ARTICLEPUT = (token, datas) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/article`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datas)
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};
export const ARTICLEDELETE = (token, id) => async (dispatch) => { 
    try {
        const response = await fetch(`${url}/api/admin/article/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            dispatch(logOut());
            return;
        }
        if (!response.ok) {
            console.error('Fetch failed with status:', response.status); 
            return;
        }
        const data = await response.json();

    } catch (error) {       
        console.error("Error occurred:", error); 
    }
};


