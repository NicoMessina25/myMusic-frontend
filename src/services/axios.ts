import { APIURL } from '@/env';
import axios, { AxiosResponse } from 'axios';
import { getCookie, setCookie } from './cookies';
import { CustomResponse } from '@/types/serverResponse';
import { RefreshResponse } from '@/types/auth';

// Crea una instancia de Axios
const api = axios.create({
  baseURL: APIURL,
});

// Interceptor para añadir el token a cada solicitud
api.interceptors.request.use((config) => {
  const accessToken = getCookie('MYMUSIC');
  
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuesta para manejar errores de autenticación y renovar el token
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  
  // Si el error es 401, intentamos refrescar el token
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const refreshToken = getCookie('MYMUSICREFRESH');
      if (refreshToken) {
        // Llama a tu API para obtener un nuevo access token
        const { data }:AxiosResponse<CustomResponse<RefreshResponse>> = await axios.post(`${APIURL}/api/auth/refresh`, null, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });

        const {data: {access_token, access_token_expires}} = data
        // Actualiza las cookies con el nuevo access token
        setCookie('MYMUSIC', access_token, access_token_expires/(3600*24));

        // Reintenta la solicitud original con el nuevo token
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest);
      } else window.location.pathname = "/login"
    } catch (err) {
      console.error('Refresh token failed:', err);
      window.location.pathname = "/login"
    }
  }
  if(error.response.status === 401) 
    window.location.pathname = "/login"
  return Promise.reject(error);
});

export default api;