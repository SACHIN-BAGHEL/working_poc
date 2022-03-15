import axios from 'axios';

export const postLoginAdmin = async (data) => {
    return axios.post(`http://localhost:1337/admin/login`, data);
}

// GET Collection Type
export const getCollectionTypes = async (token) => {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3Mjc5NTA1LCJleHAiOjE2NDk4NzE1MDV9.qDiphqD-LOC6iXPfuIIMaS951f2jZG-z-rqgoqRIA6I'
    const data = await axios.get(`http://localhost:1337/content-manager/content-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}

export const getContents = async (collectionType) => {
    let url = 'http://localhost:1337/api/' + collectionType;
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

    let url = `http://localhost:1337/api/${collectionType}?filters[name][$containsi]=${contentName}`

    return await axios.get(url)
}