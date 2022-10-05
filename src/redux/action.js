export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_USER_PASSWORD = 'SET_USER_PASSPWORD'
export const SET_CITIES = 'SET_CITIES'

const API_URL = 'https://mocki.io/v1/b3b909b8-f614-43dd-82ac-73b2ac3c07cd';



export const getCities = () => {
    try {

        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await result.json();

            if (json) {
                dispatch({
                    type: SET_CITIES,
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }


    } catch (error) {
        console.log(error)
    }
}

export const setName = name => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        payload: name
    })
}

export const setPassword = password => dispatch => {
    dispatch({
        type: SET_USER_PASSWORD,
        payload: password
    })
}