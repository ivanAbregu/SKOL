import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'
import {REDUCER_NAME} from "../Const"

let initialState = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    rol: null,
    company: null,
    is_loading: true
};


export function user(state=initialState, action) {

    switch (action.type) {

        case 'SET_USER':
            return action.user;

        default:
            return state;
    }
}




initialState = {
    count: 0,
    results: []
};

const addWrapperList = (resp) =>{
    let l = resp.results;
    let wrapperList = [];
    for (let i = 0; i < l.length; i++) {
      let codename = l[i].codename;
      let aux = null;
      if (codename.includes("ver")){
        aux = connectedRouterRedirect({
          redirectPath: '/',
          allowRedirectBack: false,
          authenticatedSelector: state => state.user.permissions !==null
                                          && state.user.permissions.includes(codename),
          predicate: user => user.permissions.includes(codename),
          wrapperDisplayName: `AbleTo_${codename}`,
          authenticatingSelector: state => state.user.is_loading,
        });
      
        wrapperList[`router_${codename}`] = aux;
      }
      
       aux = connectedAuthWrapper({
        authenticatedSelector:  state => state.user.permissions !==null
                                      && state.user.permissions.includes(codename),
        wrapperDisplayName: `VisibleOnly_${codename}`
      });
       
      wrapperList[codename] = aux;
    }

    resp['wrappers'] = wrapperList;
}

export const Permission = (state=initialState, action) => {

    let data = state;

    switch (action.type) {

        case `FETCH_${REDUCER_NAME}`:
            addWrapperList(action.resp);
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

