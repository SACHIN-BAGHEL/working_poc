import axios from 'axios';

const strapiEndPoint = `${process.env.REACT_APP_STRAPI_API_URL}`;
const apiEndPoint = `${process.env.REACT_APP_PUBLIC_API_URL}/template/searchby/`;

export const getTemplate = async (searchby = 'code', searchTerm) => {
    return await axios.get(`${apiEndPoint}${searchby}/${searchTerm}`)
}

/**
 * getTemplateById Search Template By Id.
 * @param {*} templateId : TemplateId.
 * @returns 
 */
export const getTemplateById = async (templateId) => {
    return await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/template/${templateId}`);
}

/**
 * getContentById Search Content By Id.
 * @param {*} contentType 
 * @param {*} contentId 
 * @returns 
 */
 export const getContentById = async (contentName = 'banner', contentId) => {
    if (!contentName || !contentId) console.error(contentName, contentId);
    const url = `${strapiEndPoint}/content-manager/collection-types/api::${'banner'}.${'banner'}/${contentId}`;
    const { data } = await axios.get(url, addAuthorizationRequestConfig({}, 'EntKcToken'))

    return data;
}

const getKeycloakToken = () => {
    // return '';
    if (window && window.entando && window.entando.keycloak && window.entando.keycloak.authenticated) {
        return window.entando.keycloak.token
    } else {
        return localStorage.getItem('token');
    }
}

const getDefaultOptions = (defaultBearer) => {
    const token = getKeycloakToken()
    console.log('ET-Widget',token);
    if (!token) {
        //Below if condition is to run the strapi API in local
        if (defaultBearer === 'EntKcToken') {
            return {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUxODMzOTYxLCJleHAiOjE2NTQ0MjU5NjF9.JOpa49ii3d6-bbO8SNmE3oFYpdDEXtLVbQzJCl4_784'}`
                },
            }
        } else {
            return {}
        }
    }
    // logic to add token for both strapi and MS api
    return {
        headers: {
            Authorization: `${defaultBearer} ${token}`,
        },
    }
}

// Get authorization tokens
export const addAuthorizationRequestConfig = (config = {}, defaultBearer = 'Bearer') => {
    let defaultOptions = getDefaultOptions(defaultBearer);
    return {
        ...config,
        ...defaultOptions
    }
}