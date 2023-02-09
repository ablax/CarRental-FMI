import './App.css';
import VehicleTable from "./components/tables/VehiclesTable";
import UsersTable from "./components/tables/UsersTable";
import RentalsTable from "./components/tables/RentalsTable";
import {useEffect, useState} from "react";
import {getRentals} from "./utils/http-utils/rentals-requests";
import {getVehicles} from "./utils/http-utils/vehicle-requests";
import {getUsers} from "./utils/http-utils/users-requests";

function App() {
    const [rentals, setRentals] = useState([]);
    const [users, setUsers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const refresh = async () => {
        setRentals((await getRentals()).data);
        setVehicles((await getVehicles()).data);
        setUsers((await getUsers()).data)
    }

    useEffect(() => {
        refresh()
    }, [])


    return (
        <div>
            <VehicleTable vehicles={vehicles} refresh={refresh}/>
            <UsersTable users={users} refresh={refresh}/>
            <RentalsTable vehicles={vehicles} users={users} rentals={rentals} refresh={refresh}/>
        </div>
    );
}

export default App;