import axios from "axios";

const apiUrl = 'http://localhost:3005/rentals'

export function getRentals(){
    return axios.get(apiUrl)
}
export function addRental(rental){
    if(rental.id){
        return axios.put(`${apiUrl}/${rental.id}`, rental);
    }
    return axios.post(apiUrl, rental);
}