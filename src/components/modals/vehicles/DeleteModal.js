import React, {useImperativeHandle, useState} from "react";
import './DeleteModal.css';
import {deleteVehicle} from '../../../utils/http-utils/vehicle-requests'


const DeleteModal = React.forwardRef(({refresh}, ref) => {

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);

    useImperativeHandle(ref, () => ({
        handleDelete(id) {
            handleDelete(id)
        }
    }))

    const handleDelete = id => {
        setVehicleToDelete(id);
        setConfirmDelete(true);
    };

    const cancelDeleteHandler = () => {
        setVehicleToDelete(null);
        setConfirmDelete(false);
    };

    const confirmDeleteHandler = () => {
        deleteVehicle(vehicleToDelete).then(() => refresh())
        setVehicleToDelete(null);
        setConfirmDelete(false);
    };

    return <>
        {confirmDelete && (
            <div className="confirm-delete-overlay">
                <div className="confirm-delete-modal">
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete this vehicle?</p>
                    <div>
                        <button onClick={confirmDeleteHandler}>Yes</button>
                        <button onClick={cancelDeleteHandler}>No</button>
                    </div>
                </div>
            </div>
        )
        }
    </>
});

export default DeleteModal;