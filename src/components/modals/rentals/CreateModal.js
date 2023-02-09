import React, {useImperativeHandle, useState} from "react";
import './CreateModal.css';
import {addRental} from "../../../utils/http-utils/rentals-requests";
import {addVehicle} from "../../../utils/http-utils/vehicle-requests";


const CreateModal = React.forwardRef(({refresh, vehicles, users}, ref) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newRental, setNewRental] = useState({
        startDate: "",
        endDate: "",
        customer: "",
        vehicle: "",
    });

    useImperativeHandle(ref, () => ({
        showCreateModal() {
            setShowCreateModal(true)
            setNewRental({
                startDate: "",
                endDate: "",
                customer: "",
                vehicle: "",
            })
        },
    }))

    const createRental = async () => {
        let vehicle = vehicles.find(vehicle => vehicle.id === Number(newRental.vehicle));
        vehicle = JSON.parse(JSON.stringify(vehicle));
        if (vehicle.count > 0) {
            vehicle.count = vehicle.count - 1;
            await addVehicle(vehicle);
            await addRental(newRental);
            setShowCreateModal(false);
            refresh()
        }
    }

    return <>
        {showCreateModal && (
            <div className="create-modal-overlay">
                <div className="create-modal">
                    <form onSubmit={() => createRental()}>
                        <h2>Create rental</h2>
                        <input
                            type="date"
                            placeholder="Start date"
                            onChange={(event) =>
                                setNewRental({...newRental, startDate: event.target.value})
                            }
                        />
                        <input
                            type="date"
                            placeholder="End date"
                            onChange={(event) =>
                                setNewRental({...newRental, endDate: event.target.value})
                            }
                        />
                        <select
                            placeholder={"Vehicle"}
                            onChange={(event) =>
                                setNewRental({...newRental, vehicle: event.target.value})
                            }
                        >
                            {vehicles.map(vehicle => {
                                return <option value={vehicle.id}>{vehicle.brand + " " + vehicle.model}</option>
                            })
                            }
                        </select>
                        <select placeholder={"Customer"}
                                onChange={(event) =>
                                    setNewRental({...newRental, customer: event.target.value})
                                }
                        >
                            {users.map(user => {
                                return <option value={user.id}>{user.fullName}</option>
                            })
                            }
                        </select>
                        <button type="submit">Save</button>
                        <button type={"button"} onClick={() => setShowCreateModal(false)}>Cancel</button>
                    </form>
                </div>
            </div>)}
    </>
});

export default CreateModal;