import React, {useImperativeHandle, useState} from "react";
import './CreateModal.css';
import {addVehicle} from '../../../utils/http-utils/vehicle-requests'


const CreateModal = React.forwardRef(({refresh}, ref) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    let baseVehicle = {
        brand: "",
        model: "",
        year: "",
        fuel: "",
        seats: "",
        picture: "",
        price: "",
        count: ""
    };
    const [newVehicle, setNewVehicle] = useState(baseVehicle);
    const [isEdit, setIsEdit] = useState(false);

    useImperativeHandle(ref, () => ({
        showCreateModal() {
            setShowCreateModal(true)
            setIsEdit(false);
            setNewVehicle(baseVehicle)
        },
        showEditModal(vehicle) {
            setShowCreateModal(true)
            setIsEdit(true);
            setNewVehicle(vehicle)
        }
    }))

    const createVehicle = async () => {
        await addVehicle(newVehicle);
        setShowCreateModal(false);
        refresh()
    }

    return <>
        {showCreateModal && (
            <div className="create-modal-overlay">
                <div className="create-modal">
                    <form onSubmit={() => createVehicle()}>
                        <h2>{isEdit ? "Edit " : "Create " } vehicle</h2>
                        <input
                            type="text"
                            placeholder="Brand"
                            value={newVehicle.brand || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, brand: event.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Model"
                            value={newVehicle.model || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, model: event.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Construction year"
                            value={newVehicle.year || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, year: event.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Fuel type"
                            value={newVehicle.fuel || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, fuel: event.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Number of seats"
                            value={newVehicle.seats || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, seats: event.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Picture"
                            value={newVehicle.picture || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, picture: event.target.value})
                            }
                        />
                        <input
                            type="text"
                            placeholder="Price per day"
                            value={newVehicle.price || ''}
                            onChange={(event) =>
                                setNewVehicle({
                                    ...newVehicle,
                                    price: event.target.value
                                })
                            }
                        />
                        <input
                            type="text"
                            placeholder="Count"
                            value={newVehicle.count || ''}
                            onChange={(event) =>
                                setNewVehicle({...newVehicle, count: event.target.value})
                            }
                        />
                        <button type="submit">Save</button>
                        <button type={"button"} onClick={() => setShowCreateModal(false)}>Cancel</button>
                    </form>
                </div>
            </div>)}
    </>
});

export default CreateModal;