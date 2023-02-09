import React, {useImperativeHandle, useState} from "react";
import './CreateModal.css';
import {addUser} from '../../../utils/http-utils/users-requests'


const CreateModal = React.forwardRef(({refresh}, ref) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    let baseUser = {
        fullName: "",
        email: "",
        phone: "",
    };
    const [newUser, setNewUser] = useState(baseUser);
    const [isEdit, setIsEdit] = useState(false);

    useImperativeHandle(ref, () => ({
        showCreateModal() {
            setShowCreateModal(true)
            setIsEdit(false);
            setNewUser(baseUser)
        },
        showEditModal(user) {
            setShowCreateModal(true)
            setIsEdit(true);
            setNewUser(user)
        }
    }))

    const createUser = async () => {
        await addUser(newUser);
        setShowCreateModal(false);
        refresh()
    }

    return <>
        {showCreateModal && (
            <div className="create-modal-overlay">
                <div className="create-modal">
                    <form onSubmit={() => createUser()}>
                        <h2>{isEdit ? "Edit " : "Create "} user</h2>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={newUser.fullName || ''}
                            onChange={(event) =>
                                setNewUser({...newUser, fullName: event.target.value})
                            }
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email || ''}
                            onChange={(event) =>
                                setNewUser({...newUser, email: event.target.value})
                            }
                        />
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={newUser.phone || ''}
                            onChange={(event) =>
                                setNewUser({...newUser, phone: event.target.value})
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