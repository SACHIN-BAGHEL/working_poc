import axios from 'axios';
import { KC_TOKEN_PREFIX, PAGE, PAGESIZE } from '../helper/Constant';
const domain = `${process.env.REACT_APP_STRAPI_API_URL}`;
const templateBaseUrl = `${process.env.REACT_APP_PUBLIC_API_URL}/template/`;
const rootAdminEndPoint = `${domain}/content-manager/collection-types/api::`;

export const postLoginAdmin = async (data) => {
    return axios.post(`${domain}/admin/login`, data);
}

// GET Collection Type
export const getCollectionTypes = async () => {
    const { data } = await axios.get(`${domain}/content-manager/content-types`, addAuthorizationRequestConfig({}, KC_TOKEN_PREFIX));
    return data;
}

export const getContents = async (collectionType, page = PAGE, pageSize = PAGESIZE) => {
    let url = `${rootAdminEndPoint}${collectionType}.${collectionType}?page=${page}&pageSize=${pageSize}`;
    const { data } = await axios.get(url, addAuthorizationRequestConfig({}, KC_TOKEN_PREFIX));
    return data;
}

export const fetchContents = async (collectionType) => {
    // const url = `${domain}/api/${collectionType}`;
    return await getContents(collectionType);
}

export const filterContentsByName = async (collectionType, query, searchBy, page = PAGE, pageSize = PAGESIZE) => {
    if (!collectionType) {
        throw new Error('collectionType is missing');
    }
    const url = `${rootAdminEndPoint}${collectionType}.${collectionType}?filters[${searchBy}][$containsi]=${query}&page=${page}&pageSize=${pageSize}`
    const { data } = await axios.get(url, addAuthorizationRequestConfig({}, KC_TOKEN_PREFIX))
    return data;
}


// API to list of templates Spring-Boot API
export const getTemplate = async (token) => {
    const data = await axios.get(`${templateBaseUrl}`, addAuthorizationRequestConfig());
    return data;
}

const getKeycloakToken = () => {
    if (window && window.entando && window.entando.keycloak && window.entando.keycloak.authenticated) {
        return window.entando.keycloak.token
    } else {
        return localStorage.getItem('token');
        // return '';
    }
}

const getDefaultOptions = (defaultBearer) => {
    const token = getKeycloakToken()
    console.log('ET-Widget-Config', token);
    if (!token) {
        //Below if condition is to run the strapi API in local
        if (defaultBearer === KC_TOKEN_PREFIX) {
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