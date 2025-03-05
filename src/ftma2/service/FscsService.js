import axios from "axios";
const BASE_REST_API_URL='https://ftma.egroup.co.ke/market-information/v1/api';

export const getLocations=()=> axios.get(BASE_REST_API_URL+ '/location/list')
export const getDataForDownload=()=> axios.get(BASE_REST_API_URL+ '/fsc/list?pageNumber=1&pageSize=100&startDate=2023-01-01&endDate=2025-09-01')