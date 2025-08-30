import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import './userAction.css';
import { useNavigate } from 'react-router-dom';
import User from '../../../../dto/user';
import { createUser } from '../../../../api/users';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

const UserAction: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<User>({
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    joiningDate: '',
    email: '',
    mobileNo: '',
    role: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isSaveDisabled = () => {
    const { username, password, email, firstName, mobileNo } = formData;
    return !(username && password && email && firstName && mobileNo);
  };

  const handleSave = () => {
    createUser(formData)
      .then((response: AxiosResponse) => {
        toast.success('User created successfully!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Error creating User. Please try again.');
      });
  };

  const handleCancel = () => {
    navigate('/admin/user');
    console.log('Form canceled');
  };

  return (
    <>
      <div className="userAction">
        <div className="header-band">Create User</div>
        <Card>
          <form className="user-form">
            <div className="row">
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="userId">User Id</label>
              </div>
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="role">Role</label>
              </div>
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="joiningDate"
                  id="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="joiningDate">Joining Date</label>
              </div>
            </div>
            <div className="row">
              <div className="form-field floating-label">
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="password">Intial Password</label>
              </div>
            </div>
            <div className="row">
              <div className="form-field floating-label">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="email">Email ID</label>
              </div>
              <div className="form-field floating-label">
                <input
                  type="number"
                  name="mobileNo"
                  id="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder=" " // 👈 important
                />
                <label htmlFor="mobileNo">Mobile No.</label>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="save-button"
                disabled={isSaveDisabled()}
              >
                Save
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default UserAction;
