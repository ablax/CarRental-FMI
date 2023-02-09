import axios from "axios";

const apiUrl = 'http://localhost:3005/vehicles'

export function getVehicles(){
    return axios.get(apiUrl)
}
export function deleteVehicle(id){
    return axios.delete(`${apiUrl}/${id}`)
}
export function addVehicle(vehicle){
    if(vehicle.id){
        return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
    }
    return axios.post(apiUrl, vehicle);
}