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
        console.error('Error creating Group. Please try again.');
      });
  }, []);

  useEffect(() => {
    loadPassword();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (passwordPresent) {
      updatePasswordSetting(formData.id, formData)
        .then((response: AxiosResponse) => {
          toast.success('Password created successfully!');
        })
        .catch((error) => {
          toast.error('Error creating password. Please try again.');
        });
    } else {
      createPasswordSetting(formData)
        .then((response: AxiosResponse) => {
          toast.success('Password updated successfully!');
        })
        .catch((error) => {
          toast.error('Error updating password. Please try again.');
        });
    }
  };

  return (
    <>
      <div className="passwordPolicy">
        <div className="header-band">Password Policy</div>
        <Card>
            <form className="password-policy-form">
              <div className="form-field">
                <label htmlFor="passwordLengthMin">Password Length (Min)</label>
                <input
                  type="number"
                  name="passwordLengthMin"
                  id="passwordLengthMin"
                  value={formData.passwordLengthMin}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="passwordLengthMax">Password Length (Max)</label>
                <input
                  type="number"
                  name="passwordLengthMax"
                  id="passwordLengthMax"
                  value={formData.passwordLengthMax}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="alphaMin">Alpha (Min)</label>
                <input
                  type="text"
                  name="alphaMin"
                  id="alphaMin"
                  value={formData.alphaMin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="numericMin">Numeric (Min)</label>
                <input
                  type="text"
                  name="numericMin"
                  id="numericMin"
                  value={formData.numericMin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="specialCharMin">Special Character (Min)</label>
                <input
                  type="text"
                  name="specialCharMin"
                  id="specialCharMin"
                  value={formData.specialCharMin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="upperCaseMin">Upper Case (Min)</label>
                <input
                  type="text"
                  name="upperCaseMin"
                  id="upperCaseMin"
                  value={formData.upperCaseMin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="numberOfLoginAttempts">Number Of Login Attempt</label>
                <input
                  type="text"
                  name="numberOfLoginAttempts"
                  id="numberOfLoginAttempts"
                  value={formData.numberOfLoginAttempts}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="validPeriod">Valid Period (In days)</label>
                <input
                  type="text"
                  name="validPeriod"
                  id="validPeriod"
                  value={formData.validPeriod}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="previousPasswordAttemptTrack">
                  Previous Password Attempt Track
                </label>
                <input
                  type="text"
                  name="previousPasswordAttemptTrack"
                  id="previousPasswordAttemptTrack"
                  value={formData.previousPasswordAttemptTrack}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="effectiveDate">Effective Date</label>
                <input
                  type="text"
                  name="effectiveDate"
                  id="effectiveDate"
                  value={formData.effectiveDate}
                  onChange={handleChange}
                />
              </div>

              {/* <div className="form-field">
                  <label htmlFor="justification">Remark/Justification</label>
                  <input
                    type="text"
                    name="justification"
                    id="justification"
                    value={formData.justification}
                    onChange={handleChange}
                  />
                </div> */}

              <div className="form-actions">
                <button type="button" onClick={handleSave} className="save-button">
                  Save
                </button>
              </div>
            </form>
        </Card>
      </div>
    </>
  );
};

export default PasswordPolicy;
