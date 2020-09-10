import axios from 'axios';
const rootURL = '/api/persons';

const getAll = () => {
    const request = axios.get(rootURL);
    return request.then(response => response.data);
};

const createContact = (newObject) => {
    const request = axios.post(rootURL, newObject);
    return request.then(response => response.data);
};

const updateContact = (id, newObject) => {
    const request = axios.put(`${rootURL}/${id}`, newObject);
    return request.then(response => response.data);
};

const deleteContact = (id) => {
    const request = axios.delete(`${rootURL}/${id}`);
    return request;
};

export default {getAll, createContact, updateContact, deleteContact};
