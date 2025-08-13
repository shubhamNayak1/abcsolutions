import React, { useState } from 'react';
import Card from '../../../../components/card/card';
import { useNavigate } from 'react-router-dom';
import './departmentAction.css';
import Department from '../../../../dto/department';
import { createDepartment } from '../../../../api/department';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const DepartmentAction: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Department>({
    departmentName: '',
    departmentShortCode: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isSaveDisabled = () => {
    const { departmentName, departmentShortCode } = formData;
    return !(departmentName && departmentShortCode);
  };

  const handleSave = () => {
    createDepartment(formData)
      .then((response: AxiosResponse) => {
        toast.success('Department created successfully!');
        handleCancel();
      })
      .catch((error) => {
        toast.error('Error creating department. Please try again.');
      });
  };

  const handleCancel = () => {
    navigate('/admin/department');
    console.log('Form canceled');
  };

  return (
    <>
      <div className="department-create">
        <div className="header-band">Department Builder</div>
        <Card>
          <div className="form-container">
            <form className="user-form">
              <div className="form-field">
                <label htmlFor="departmentName">Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  id="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="departmentShortCode">Department Short Code</label>
                <input
                  type="text"
                  name="departmentShortCode"
                  id="departmentShortCode"
                  value={formData.departmentShortCode}
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

export default DepartmentAction;
