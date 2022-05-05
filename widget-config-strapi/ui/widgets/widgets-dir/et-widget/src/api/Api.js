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
export const getContentById = async (contentType = 'banners', contentId = 1) => {
    const { data } = await axios.get(`${strapiEndPoint}/content-manager/collection-types/api::banner.banner/1`
        , addAuthorizationRequestConfig({}, 'EntKcToken'))

    return data;
}

const getKeycloakToken = () => {
    if (window && window.entando && window.entando.keycloak && window.entando.keycloak.authenticated) {
        return window.entando.keycloak.token
    }
    return ''
}

const getDefaultOptions = (defaultBearer) => {
    const token = getKeycloakToken()
    if (!token) {
        //Below if condition is to run the strapi API in local
        if (defaultBearer === 'EntKcToken') {
            return {
                headers: {
                    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUxNjY2ODY3LCJleHAiOjE2NTQyNTg4Njd9.HDMO-g89iRacB-9m8yQ39w4Rh4wNOR9xCL1dH1whPSE'}`
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