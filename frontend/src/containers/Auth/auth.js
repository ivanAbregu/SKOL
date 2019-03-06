import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper'

import Loading from '../../components/Loading';

const userIsAuthenticatedDefaults = {
  authenticatedSelector: state => state.user !== null,
  authenticatingSelector: state => state.user!== null,
  wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticated = connectedAuthWrapper(userIsAuthenticatedDefaults)

export const userIsAuthenticatedRedir = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
})

export const userIsSuperAdminRedir = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user !== null,
  predicate: user => user.rol === 'superadmin',
  wrapperDisplayName: 'UserIsSuperAdmin',
  authenticatingSelector: state => state.user.is_loading,
});

export const userCanListComunication = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.permissions !==undefined
                                  && state.user.permissions.includes('ver_comunicacion'),
  predicate: user => user.permissions !== undefined && user.permissions.includes('ver_comunicacion'),
  wrapperDisplayName: 'userCanListComunication',
  authenticatingSelector: state => state.user.is_loading,
});

export const userCanListEvent = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => state.user.permissions !==undefined
                                  && state.user.permissions.includes('ver_eventos'),
  predicate: user => user.permissions !== undefined && user.permissions.includes('ver_eventos'),
  wrapperDisplayName: 'userCanListEvent',
  authenticatingSelector: state => state.user.is_loading,
});


export const visibleOnlyCAorA = connectedAuthWrapper({
  authenticatedSelector: state => state.user.rol !== null && ((state.user.rol === 'admin') || state.user.rol === 'superadmin'),
  wrapperDisplayName: 'visibleOnlyCAorA'
});

