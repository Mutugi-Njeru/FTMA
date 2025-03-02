import axios from "axios";

export const BASE_REST_API_URL='https://ftma.egroup.co.ke/market-information/v1/api';

export const getCountyProducts=({ pageNumber, pageSize, startDate, endDate, countyIds })=>axios.get(BASE_REST_API_URL + '/county-products/list', {
  params: {
    pageNumber,
    pageSize,
    startDate,
    endDate,
    countyIds
  }
});

