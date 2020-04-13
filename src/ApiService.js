import {
    makePutRequest,
    makeGetRequest,
    makePostRequest,
    getCsrfToken
  } from "./ApiRequest";
  
  export const addNewDocument = payload =>
    makePostRequest(`http://localhost:8080/upload`, payload,
    {"Content-Type": 'multipart/form-data',"Access-Control-Allow-Origin": "*" }, 
    { "X-CSRFToken": getCsrfToken()
    });
  
  export const updateDocumentList = (id, payload) =>
    makePutRequest(``, payload, {
      "X-CSRFToken": getCsrfToken()
    });
  
  export const getDocumentList = () => makeGetRequest('');
  