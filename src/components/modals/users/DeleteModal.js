import React, {useImperativeHandle, useState} from "react";
import './DeleteModal.css';
import {deleteUser} from '../../../utils/http-utils/users-requests'


const DeleteModal = React.forwardRef(({refresh}, ref) => {

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useImperativeHandle(ref, () => ({
        handleDelete(id) {
            handleDelete(id)
        }
    }))

    const handleDelete = id => {
        setUserToDelete(id);
        setConfirmDelete(true);
    };

    const cancelDeleteHandler = () => {
        setUserToDelete(null);
        setConfirmDelete(false);
    };

    const confirmDeleteHandler = () => {
        deleteUser(userToDelete).then(() => refresh())
        setUserToDelete(null);
        setConfirmDelete(false);
    };

    return <>
        {confirmDelete && (
            <div className="confirm-delete-overlay">
                <div className="confirm-delete-modal">
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete this customer?</p>
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