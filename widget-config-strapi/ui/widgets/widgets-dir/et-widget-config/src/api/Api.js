import axios from 'axios';
import { PAGE, PAGESIZE } from '../helper/Constant';
const domain = 'http://localhost:1337';
const rootAdminEndPoint = `${domain}/content-manager/collection-types/api::`;
const token = {
    'Authorization': `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUwOTY1ODU1LCJleHAiOjE2NTM1NTc4NTV9.JAwQ2tS16tJsyo8a8WKNA7nXGLRsOCDJeVXBHs-MwL8'}`
};

export const postLoginAdmin = async (data) => {
    return axios.post(`${domain}/admin/login`, data);
}

// GET Collection Type
export const getCollectionTypes = async () => {
    const { data } = await axios.get(`${domain}/content-manager/content-types`, {
        headers: token
    });
    return data;
}

export const getContents = async (collectionType, page = PAGE, pageSize = PAGESIZE) => {
    let url = `${rootAdminEndPoint}${collectionType}.${collectionType}?page=${page}&pageSize=${pageSize}`;
    const {data} = await axios.get(url, {
        headers: token
    });
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
    const { data } = await axios.get(url, {
        headers: token
    })
    return data;
}


// API GET COLLECTION TYPE FROM TEMPLATES SPING-Boot API
export const getTemplate = async (token) => {
    return await axios.get(`http://localhost:8081/api/template/`, {
        headers: { 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQYTJfRjlRaEhsMFNJTklYTVMzcmtPX2RJem9HR3NET1VvMjMxZ18wbnEwIn0.eyJqdGkiOiI5ZWMwMzQ5NS0wNzEzLTRlYjQtYjFhYS0yMjljYjNjZjA0ZWYiLCJleHAiOjE2NTE1ODM5NjUsIm5iZiI6MCwiaWF0IjoxNjUxNTgzNjY1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwODAvYXV0aC9yZWFsbXMvZW50YW5kbyIsImF1ZCI6WyJpbnRlcm5hbCIsImFjY291bnQiXSwic3ViIjoiYWYzMmY0YWItMGVlNC00Y2JiLWJmZWYtNGE3ZmRjMGY1MmQ0IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2ViX2FwcCIsIm5vbmNlIjoiMTk2NDE3ZTgtY2I0MC00ZDZhLTgxZTUtZDFkMTFlODIxMDY4IiwiYXV0aF90aW1lIjoxNjUxNTgzMzIzLCJzZXNzaW9uX3N0YXRlIjoiOWQyYWE0OTItMzllZC00YTA3LTljNDMtMTc2ZDQxMDk0NjMyIiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiaW50ZXJuYWwiOnsicm9sZXMiOlsiZXQtZmlyc3Qtcm9sZSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZXQtZmlyc3Qtcm9sZSJ9.M5uMOd6Nhh4XOva5iFWu11pe1VB8zsLVF9E_v09sZgu8IMhopOLvPpcCP5hkwGlQSKo6kaI1MZhcQG_FBAL3rQnZD61DktympVEdcJvf_Gv3MdMYoe5dsdk_iqjAQGSUMA3EBu4wm7iJJo80Fh5Y8tjGXpudBroAapa_0AsfkagWXu-wHUv6suLuHlFLhh0Lkt-FK8OZ1e5HWUxdblFKLXLlJgEtqnifriBaWCfjWVjkBGf-Fhfkg17WijJuTvrBfm8Yg570k9ddeP_cwOJnIA7fZoXBq9FAIDv1P33SRPRJW8ryZGOg0j6lx3Rg3PlbO98VwM2mjX7YYX0cJG2WHQ' }
    })
}