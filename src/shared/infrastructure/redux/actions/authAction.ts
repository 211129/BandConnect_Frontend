import UserEntity from '../../../../users/domain/entities/UserEntity';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_USER = 'GET_USER',
}

export const login = (user: UserEntity) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const getUser = () => ({
  type: AuthActionTypes.GET_USER,
});

// Añadir checkAuthStatus si no está definido
export const checkAuthStatus = () => {
  return async (dispatch: any) => {
    // Lógica para verificar el estado de autenticación
  };
};
