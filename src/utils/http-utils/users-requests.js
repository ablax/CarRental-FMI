import axios from "axios";

const apiUrl = 'http://localhost:3005/users'

export function getUsers(){
    return axios.get(apiUrl)
}
export function deleteUser(id){
    return axios.delete(`${apiUrl}/${id}`)
}
export function addUser(user){
    if(user.id){
        return axios.put(`${apiUrl}/${user.id}`, user);
    }
    return axios.post(apiUrl, user);
}