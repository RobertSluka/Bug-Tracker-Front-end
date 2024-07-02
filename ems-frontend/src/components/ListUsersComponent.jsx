import React, { useEffect, useState } from 'react';
import { deleteUser, listUsers } from '../services/UserService';
import { useNavigate } from 'react-router-dom';

const ListUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployes();
    }, []);

    function getAllEmployes(){
        listUsers()
        .then(response => {
            console.log('Response data:', response.data);
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Response data is not an array:', response.data);
            }
        })
        .catch(error => console.log('Error fetching users:', error));
    }
    function addNewUser() {
        navigate('/user/register');
    }

    function updateUser(userId) {
        navigate(`/user/update/${userId}`);
    }

    function deleteUser(userId) {
        deleteUser(userId)
            .then(response => {
                getAllEmployes();
                console.log('User deleted:', response.data);
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.log('Error deleting user:', error));
    }

    return (
        <div className='container'>
            <h2 className="text-center">List of Users</h2>
            <button className="btn btn-primary mn-2" onClick={addNewUser}>Add User</button>
            <table className='table table-striped table-border'>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 ? (
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.password}</td>
                                    <td>{user.role}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dateOfBirth}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => updateUser(user.id)}>Update</button>
                                        <button className="btn btn-danger" onClick={()=> deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No users found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListUsersComponent;
