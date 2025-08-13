import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './userGroupAction.css';
import UserGroup from '../../../../dto/userGroup';
import { AxiosResponse } from 'axios';
import { createUserGroup } from '../../../../api/userGroup';
import { toast } from 'react-toastify';

const UserGroupAction: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserGroup>({
    groupName: '',
    groupDescription: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isSaveDisabled = () => {
    const { groupDescription, groupName } = formData;
    return !(groupDescription && groupName);
  };

  const handleSave = () => {
    createUserGroup(formData)
      .then((response: AxiosResponse) => {
        toast.success('Group created successfully!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Error creating Group. Please try again.');
      });
  };

  const handleCancel = () => {
    navigate('/admin/user-group');
    console.log('Form canceled');
  };

  return (
    <>
      <div className="userGroupAction">
        <div className="header-band">Group Builder</div>
        <Card>
          <div className="form-container">
            <form className="user-form">
              <div className="form-field">
                <label htmlFor="groupName">Group Name</label>
                <input
                  type="text"
                  name="groupName"
                  id="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="groupDescription">Group Description</label>
                <input
                  type="text"
                  name="groupDescription"
                  id="groupDescription"
                  value={formData.groupDescription}
                  onChange={handleChange}
                  required
                />
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
          </div>
        </Card>
      </div>
    </>
  );
};

export default UserGroupAction;
