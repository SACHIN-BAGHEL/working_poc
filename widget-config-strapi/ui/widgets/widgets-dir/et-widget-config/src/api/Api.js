import axios from 'axios';
const domain = 'http://localhost:1337'

export const postLoginAdmin = async (data) => {
    return axios.post(`${domain}/admin/login`, data);
}

// GET Collection Type
export const getCollectionTypes = async (token) => {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwOTY5MDA3LCJleHAiOjE2NTM1NjEwMDd9.Pa__st_HHww_Ggn0n4jew9850rjSTkQ23JR1e-hPvU0'
    const data = await axios.get(`${domain}/content-manager/content-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}

export const getContents = async (collectionType) => {
    let url = `${domain}/api/` + collectionType + '?populate=*';
    const data = await axios.get(url);
    return data;
}

export const fetchContents = async (collectionType) => {
    console.log("fetchContents", collectionType)
    // const url = `${domain}/api/${collectionType}`;
    return await getContents(collectionType);
}

// FILTER API
export const filterContentsByName = async (collectionType, contentName) => {
    if (!collectionType || !contentName) {
        throw new Error('collectionType or contentName is missing');
    }

    let url = `${domain}/api/${collectionType}?filters[Title][$containsi]=${contentName}`

    return await axios.get(url)
}

// API GET COLLECTION TYPE FROM TEMPLATES
export const getTemplate = async (token) => {
    return await axios.get(`http://localhost:8082/api/getcollectiontype`);
}