import React, { useCallback, useEffect, useState } from 'react';
import Card from '../../../components/card/card';
import './passwordPolicy.css';
import {
  createPasswordSetting,
  getAllPasswordSetting,
  updatePasswordSetting,
} from '../../../api/passwordSetting';
import { AxiosResponse } from 'axios';
import PasswordSetting from '../../../dto/passwordSettings';
import { toast } from 'react-toastify';

const PasswordPolicy: React.FC = () => {
  const [passwordPresent, setPasswordPresent] = useState(false);

  const [formData, setFormData] = useState<PasswordSetting>({
    id: -1,
    passwordLengthMin: 0,
    passwordLengthMax: 0,
    alphaMin: 0,
    numericMin: 0,
    specialCharMin: 0,
    upperCaseMin: 0,
    numberOfLoginAttempts: 0,
    validPeriod: 0,
    previousPasswordAttemptTrack: 0,
    effectiveDate: '',
  });

  const loadPassword = useCallback(async () => {
    getAllPasswordSetting()
      .then((response: AxiosResponse) => {
        if (response.data[0] !== undefined) {
          setPasswordPresent(true);
          setFormData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Error loading password settings. Please try again.');
      });
  }, []);

  useEffect(() => {
    loadPassword();
  }, [loadPassword]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (passwordPresent) {
      updatePasswordSetting(formData.id, formData)
        .then((response: AxiosResponse) => {
          toast.success('Password updated successfully!');
        })
        .catch((error) => {
          toast.error('Error updating password. Please try again.');
        });
    } else {
      createPasswordSetting(formData)
        .then((response: AxiosResponse) => {
          toast.success('Password created successfully!');
        })
        .catch((error) => {
          toast.error('Error creating password. Please try again.');
        });
    }
  };

  return (
    <div className="passwordPolicy">
      <div className="header-band">Password Policy</div>
      <Card>
        <form className="password-policy-form">
          <div className="row">
            {/* Password Length Min */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="passwordLengthMin"
                id="passwordLengthMin"
                value={formData.passwordLengthMin}
                onChange={handleChange}
                placeholder=" "
                required
              />
              <label htmlFor="passwordLengthMin">Password Length (Min)</label>
            </div>

            {/* Password Length Max */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="passwordLengthMax"
                id="passwordLengthMax"
                value={formData.passwordLengthMax}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="passwordLengthMax">Password Length (Max)</label>
            </div>
          </div>

          <div className="row">
            {/* Alpha Min */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="alphaMin"
                id="alphaMin"
                value={formData.alphaMin}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="alphaMin">Alpha (Min)</label>
            </div>

            {/* Numeric Min */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="numericMin"
                id="numericMin"
                value={formData.numericMin}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="numericMin">Numeric (Min)</label>
            </div>
          </div>
          <div className="row">
            {/* Special Char Min */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="specialCharMin"
                id="specialCharMin"
                value={formData.specialCharMin}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="specialCharMin">Special Character (Min)</label>
            </div>

            {/* Uppercase Min */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="upperCaseMin"
                id="upperCaseMin"
                value={formData.upperCaseMin}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="upperCaseMin">Upper Case (Min)</label>
            </div>
          </div>

          <div className="row">
            {/* Login Attempts */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="numberOfLoginAttempts"
                id="numberOfLoginAttempts"
                value={formData.numberOfLoginAttempts}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="numberOfLoginAttempts">Number Of Login Attempt</label>
            </div>

            {/* Valid Period */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="validPeriod"
                id="validPeriod"
                value={formData.validPeriod}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="validPeriod">Valid Period (In days)</label>
            </div>

            {/* Previous Password Track */}
            <div className="form-field floating-label">
              <input
                type="number"
                name="previousPasswordAttemptTrack"
                id="previousPasswordAttemptTrack"
                value={formData.previousPasswordAttemptTrack}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="previousPasswordAttemptTrack">Previous Password Attempt Track</label>
            </div>
          </div>

          <div className="row">
            {/* Effective Date */}
            <div className="form-field floating-label">
              <input
                type="date"
                name="effectiveDate"
                id="effectiveDate"
                value={formData.effectiveDate}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="effectiveDate">Effective Date</label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleSave} className="save-button">
              Save
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PasswordPolicy;
