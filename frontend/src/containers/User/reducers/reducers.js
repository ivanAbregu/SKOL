import {REDUCER_NAME} from "../Const"

const initialState = {
    count: 0,
    results: []
};

export const reducer = (state=initialState, action) => {

    let data = state;

    switch (action.type) {

        case `FETCH_${REDUCER_NAME}`:
            return action.resp;

        case `ADD_${REDUCER_NAME}`:
            return {...data, count: data.count + 1, results: [action.obj, ...state.results] };

        case `UPDATE_${REDUCER_NAME}`:
            data.results.splice(action.index, 1, action.obj);
            return {...data, };

        case `DELETE_${REDUCER_NAME}`:
            data.results.splice(action.index, 1);
            return {...data, count: data.count - 1};

        default:
            return state;
    }
}

