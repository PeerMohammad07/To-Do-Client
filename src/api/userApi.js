import Api from "../service/axios";
import userEndPoints from "../service/endPoints/userEndpoints"

export const loginApi = async (data) => {
  try {
    return await Api.post(userEndPoints.signIn, { email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logout = async ()=>{
  try {
    return await Api.post(userEndPoints.logout)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registerApi = async (data) => {
  try {
    return await Api.post(userEndPoints.signUp, { name: data.name,email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const createTask = async (data) =>{
  try {
    return await Api.post(userEndPoints.tasks,data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteTask = async (taskId) =>{
  try {
    return await Api.delete(`${userEndPoints.tasks}/${taskId}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const editTask = async (data)=>{
  try {    
    return await Api.put(`${userEndPoints.tasks}/${data._id}`,data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getAllTasks = async (status,assigne,date)=>{
  try {
    return await Api.get(`${userEndPoints.tasks}/?status=${status}&assigne=${assigne}&data=${JSON.stringify(date)}`);
  } catch (error) {
    return Promise.reject(error)
  }
}