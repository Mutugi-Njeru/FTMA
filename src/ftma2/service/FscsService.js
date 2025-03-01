import axios from "axios";
const BASE_REST_API_URL='https://ftma.egroup.co.ke/market-information/v1/api';

export const getLocations=()=> axios.get(BASE_REST_API_URL+ '/location/list')