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