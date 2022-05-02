import axios from 'axios';

export const postLoginAdmin = async (data) => {
    return axios.post(`http://localhost:1337/admin/login`, data);
}

// GET Collection Type
export const getCollectionTypes = async (token) => {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwOTY1ODU1LCJleHAiOjE2NTM1NTc4NTV9.JAwQ2tS16tJsyo8a8WKNA7nXGLRsOCDJeVXBHs-MwL8'
    const data = await axios.get(`http://localhost:1337/content-manager/content-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}

export const getContents = async (collectionType) => {
    let url = 'http://localhost:1337/api/' + collectionType + '?populate=Image';
    const data = await axios.get(url);
    return data;
}

export const fetchContents = async (collectionType) => {
    console.log("fetchContents", collectionType)
    // const url = `http://localhost:1337/api/${collectionType}`;
    return await getContents(collectionType);
}

// FILTER API
export const filterContentsByName = async (collectionType, contentName) => {
    if (!collectionType || !contentName) {
        throw new Error('collectionType or contentName is missing');
    }

    let url = `http://localhost:1337/api/${collectionType}?filters[title][$containsi]=${contentName}`

    return await axios.get(url)
}

// API GET COLLECTION TYPE FROM TEMPLATES
export const getTemplate = async (token) => {
    return await axios.get(`http://localhost:8082/api/getcollectiontype`);
}