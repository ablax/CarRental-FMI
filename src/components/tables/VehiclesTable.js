import React, {useRef} from "react";
import DeleteModal from "../modals/vehicles/DeleteModal";
import CreateModal from "../modals/vehicles/CreateModal";

export default function VehicleTable({vehicles, refresh}) {

    const deleteModalRef = useRef()
    const createModalRef = useRef()

    return (
        <>
            <h1>Vehicles Database</h1>
            <DeleteModal ref={deleteModalRef} refresh={refresh}/>
            <CreateModal ref={createModalRef} refresh={refresh}/>
            <table>
                <thead>
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Construction year</th>
                    <th>Fuel type</th>
                    <th>Number of seats</th>
                    <th>Picture</th>
                    <th>Price per day</th>
                    <th>Count</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map(vehicle => (
                    <tr key={vehicle.id}>
                        <td>{vehicle.brand}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.year}</td>
                        <td>{vehicle.fuel}</td>
                        <td>{vehicle.seats}</td>
                        <td>
                            <img src={vehicle.picture} alt={vehicle.model}/>
                        </td>
                        <td>{vehicle.price}</td>
                        <td>{vehicle.count}</td>
                        <td>
                            <button onClick={() => createModalRef.current.showEditModal(vehicle)}>Update</button>
                            <button onClick={() => deleteModalRef.current.handleDelete(vehicle.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => createModalRef.current.showCreateModal()}>Create</button>
        </>
    );
}
