import apiClient from '../utils/apiClient';

export const createQuestion = (questionData) => apiClient.post('/admin/create-question', questionData);
export const editQuestion = (id, updatedData) => apiClient.put(`/admin/edit-question/${id}`, updatedData);
export const deleteQuestion = (id) => apiClient.delete(`/admin/delete-question/${id}`);
