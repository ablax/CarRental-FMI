import React, {useRef} from "react";
import CreateModal from "../modals/rentals/CreateModal";

export default function RentalsTable({rentals, users, vehicles, refresh}) {
    const createModalRef = useRef()

    return (
        <>
            <h1>Rentals table</h1>
            <CreateModal ref={createModalRef} users={users} vehicles={vehicles} refresh={refresh}/>
            <table>
                <thead>
                <tr>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Customer name</th>
                    <th>Vehicle name</th>
                </tr>
                </thead>
                <tbody>
                {rentals.map(rental => {
                    let vehicle = vehicles.find(vehicle => vehicle.id === rental.vehicle);
                    return (
                        <tr key={rental.id}>
                            <td>{rental.startDate}</td>
                            <td>{rental.endDate}</td>
                            <td>{users.find(user => user.id === rental.customer)?.fullName}</td>
                            <td>{vehicle?.brand} {vehicle?.model}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <button onClick={() => createModalRef.current.showCreateModal()}>Create</button>
        </>
    );
}
