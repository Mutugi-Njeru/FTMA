import axios from "axios";

const BASE_REST_API_URL='https://ftma.egroup.co.ke/market-information/v1/api';


export const loginUser = (auth) => {
  return axios.get(BASE_REST_API_URL + '/authenticate', {
    headers: {
      'Authorization': `Basic ${auth}`
    }
  });
};

  axios.interceptors.request.use(
    function (config) {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

export const storeToken=(token)=>localStorage.setItem("token", token)
export const getToken=()=>localStorage.getItem("token") 
export const saveLoggedinUser = (auth) => localStorage.setItem("authenticatedUser", auth);
export const logout=()=>{
  localStorage.clear();
  sessionStorage.clear();
}
export const isUserLoggedIn =()=>{
  const auth = localStorage.getItem("authenticatedUser");
  if (auth == null) {
    return { isAuth: false };
  } else {
    return { isAuth: true };
  }
}

