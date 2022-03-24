import axios from 'axios';

// http://localhost:8082/api/templates/searchby/code/1002

const apiEndPoint = 'http://localhost:8082/api/templates/searchby/';
const strapiEndPoint = 'http://localhost:1337/api/';

export const getTemplate = async (searchby = 'code', searchTerm) => {
    console.log("GETTEMPLATE 1");
    return await axios.get(`${apiEndPoint}${searchby}/${searchTerm}`)
}

export const getContentById = async (contentType = 'banners', contentId) => {
    console.log("GET CONTENT API FOR ", contentType);
    return await axios.get(`${strapiEndPoint}${contentType}?filters[id][$eq]=${contentId}`)
}