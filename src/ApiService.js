import {
    makePutRequest,
    makeGetRequest,
    makePostRequest,
    getCsrfToken
  } from "./ApiRequest";
  
  export const addNewDocument = payload =>
    makePostRequest(``, payload, {
      "X-CSRFToken": getCsrfToken()
    });
  
  export const updateDocumentList = (id, payload) =>
    makePutRequest("", payload, {
      "X-CSRFToken": getCsrfToken()
    });
  
  export const getDocumentList = () => makeGetRequest("");
  