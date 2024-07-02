import React, { useEffect, useState } from 'react';
import { createUser, getUser } from '../services/UserService';
import { useNavigate, useParams } from 'react-router-dom';

const UserComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [role, setRole] = useState('');
 
 
  const {id} = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    dateOfBirth: '',
    role: ''
  });

  const navigate = useNavigate();
  let user = { firstName, lastName, userName, password, email, dateOfBirth, role };
  console.log('user => ' + JSON.stringify(user));

  useEffect(() => {
    if(id){
      getUser(id).then((res) => {
        let user = res.data;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUserName(user.userName);
        setPassword(user.password);
        setEmail(user.email);
        setDateOfBirth(user.dateOfBirth);
        setRole(user.role);
      }).catch((error) => {
        console.log(error);
      });
    }
  } ,[id]);

  function saveOrUpdateUser(e) {
    e.preventDefault();
    console.log(user)

    if (validateForm()) {
      if(id){
        updateUser(id, user).then((res) => {
          console.log(res.data);
          navigator('/users');
        }).catch((error) => {
          console.log(error);
        });
      } else {
        createUser(user).then((res) => {
          console.log(res.data);
          navigate('/users');
        }).catch((error) => {
          console.log(error);
        }
        );
      }
    }
  

  function updateUser(id) {
    navigator(`/user/update/${id}`)
  }

  function pageTitle () { 
  if(id){
    return <h2 className='text-center'>Update User</h2>
  }else{
    return <h2 className='text-center'>Add User</h2>
  }
  
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = '';
    } else {
      errorsCopy.firstName = 'First Name is required';
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = '';
    } else {
      errorsCopy.lastName = 'Last Name is required';
      valid = false;
    }
    if (userName.trim()) {
      errorsCopy.userName = '';
    } else {
      errorsCopy.userName = 'User Name is required';
      valid = false;
    }
    if (password.trim()) {
      errorsCopy.password = '';
    } else {
      errorsCopy.password = 'Password is required';
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }
    if (dateOfBirth.trim()) {
      errorsCopy.dateOfBirth = '';
    } else {
      errorsCopy.dateOfBirth = 'Date of Birth is required';
      valid = false;
    }
    if (role.trim()) {
      errorsCopy.role = '';
    } else {
      errorsCopy.role = 'Role is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-21 offset-md-1 offset-md-1'>
          {
            pageTitle()
          }
          <h2 className='text-center'>Add User</h2>
          <div className='card-body'>
            <form>
              <div className='form-group mb-2'>
                <label className='form-label'> User's First Name:</label>
                <input type='text' placeholder='First Name' name='firstName' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> User's Last Name:</label>
                <input type='text' placeholder='Last Name' name='lastName' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> User Name:</label>
                <input type='text' placeholder='User Name' name='userName' className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                  value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                {errors.userName && <div className='invalid-feedback'>{errors.userName}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Password:</label>
                <input type='password' placeholder='Password' name='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={password} onChange={(e) => { setPassword(e.target.value) }} />
                {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Email:</label>
                <input type='text' placeholder='Email' name='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email} onChange={(e) => { setEmail(e.target.value) }} />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <div>
                <label className='form-label'> Date of Birth:</label>
                <input type='date' name='dateOfBirth' className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                  value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} />
                {errors.dateOfBirth && <div className='invalid-feedback'>{errors.dateOfBirth}</div>}
              </div>
              <div className='form-group mb-2'>
                <label className='form-label'> Role:</label>
                <input type='text' placeholder='Role' name='role' className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                  value={role} onChange={(e) => { setRole(e.target.value) }} />
                {errors.role && <div className='invalid-feedback'>{errors.role}</div>}
              </div>
              <button className='btn btn-success' onClick={saveOrUpdateUser}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

}
export default UserComponent;
