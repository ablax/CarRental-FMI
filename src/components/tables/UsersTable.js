import React, { useRef} from "react";
import DeleteModal from "../modals/users/DeleteModal";
import CreateModal from "../modals/users/CreateModal";

export default function UsersTable({users, refresh}) {

    const deleteModalRef = useRef()
    const createModalRef = useRef()

    return (
        <>
            <h1>Customers Database</h1>
            <DeleteModal ref={deleteModalRef} refresh={refresh}/>
            <CreateModal ref={createModalRef} refresh={refresh}/>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button onClick={() => createModalRef.current.showEditModal(user)}>Update</button>
                            <button onClick={() => deleteModalRef.current.handleDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={() => createModalRef.current.showCreateModal()}>Create</button>
        </>
    );
}
