import {URL,NAME_SINGLE,REDUCER_NAME} from "../Const"


export const getCookie = name => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};



export const onFetch = (params) => {
    const queryString = params;
    return dispatch => {
        let headers = {"Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken')};
        return fetch(`${URL}${queryString}`, {headers: headers, credentials: 'include' })
            .then(res => res.json())
            .then(resp => {
                return dispatch({
                    type: `FETCH_${REDUCER_NAME}`,
                    resp:resp
                })
            })
    }
};


export const onAdd = obj => {
    return dispatch => {
        let headers = {"Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken')};
        let body = JSON.stringify(obj);
        return fetch(URL, {headers, credentials: 'include', method: "POST", body})
            .then(res => res.json())
            .then(obj => {
                window.toastr.success(`Se agrego un ${NAME_SINGLE}!`);
                return dispatch({
                    type: `ADD_${REDUCER_NAME}`,
                    'obj': obj
                })
            })
            .catch((error) => { // error is a Promise
                error.then((e) => {
                    dispatch({
                      apiResponse: e, // e is now the resolved value of 'response.text()'
                      apiMessage : "System encountered error. Please try again later."
                    });
                });
            });
    }
};


export const update = (obj,id) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken') };
        let body = JSON.stringify(obj);
        let url = `${URL}${id}/`;
        return fetch(url, {headers, credentials: 'include', method: "PUT", body})
            .then(res => res.json())
            .then(obj => {
                window.toastr.info(`El ${NAME_SINGLE} ${obj.name} fue actualizado.`);
                return dispatch({
                    type: `UPDATE_${REDUCER_NAME}`,
                    obj,
                    index:id
                })
            })
    }
};

export const onDelete = (obj,index) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken')};

        return fetch(`${URL}${index}/`, {headers, credentials: 'include', method: "DELETE"})
            .then(res => {
                if (res.ok) {
                    window.toastr.warning(`El ${NAME_SINGLE} ${obj.name} fue eliminado.`);
                    return dispatch({
                        type: `DELETE_${REDUCER_NAME}`,
                        obj,
                        index
                    })
                }
            })
    }
};
