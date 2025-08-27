import React, { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import ChangePasswordDto from '../../dto/changepassword';
import { changepasswordApi, getPasswordPolicy } from '../../api/passwordSetting';
import { AxiosResponse } from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import './ChangePassword.css';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState<ChangePasswordDto>({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [usernameDisplay, setUsernameDisplay] = useState<string>('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [policy, setPolicy] = useState<any>(null);
  const [errors, setErrors] = useState<{ newPassword?: string[]; confirmPassword?: string[] }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({}); // track touched fields

  // Reset form
  const handleResetPasswordClose = () => {
    setFormData({
      username: usernameDisplay,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setTouched({});
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleResetPasswordSave = () => {
    changepasswordApi(formData)
      .then((response: AxiosResponse) => {
        toast.success('Password Changed successfully!');
        handleLogout();
      })
      .catch((error) => {
        toast.error(error.response?.data || 'Failed to change password');
      });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsernameDisplay(storedUsername);
      setFormData((prev) => ({ ...prev, username: storedUsername }));
    }
  }, []);

  // Reset form whenever page changes
  useEffect(() => {
    return () => {
      handleResetPasswordClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Fetch password policy
  useEffect(() => {
    getPasswordPolicy()
      .then((response: AxiosResponse) => {
        setPolicy(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Validation
  const validatePassword = (name: string, value: string) => {
    let errs: string[] = [];

    if (name === 'newPassword' && policy) {
      if (value.length < policy.passwordLengthMin || value.length > policy.passwordLengthMax) {
        errs.push(
          `Password must be ${policy.passwordLengthMin}-${policy.passwordLengthMax} characters`,
        );
      }
      if ((value.match(/[A-Z]/g) || []).length < policy.upperCaseMin) {
        errs.push(`At least ${policy.upperCaseMin} uppercase letter(s)`);
      }
      if ((value.match(/[a-zA-Z]/g) || []).length < policy.alphaMin) {
        errs.push(`At least ${policy.alphaMin} alphabet(s)`);
      }
      if ((value.match(/[0-9]/g) || []).length < policy.numericMin) {
        errs.push(`At least ${policy.numericMin} number(s)`);
      }
      if ((value.match(/[^a-zA-Z0-9]/g) || []).length < policy.specialCharMin) {
        errs.push(`At least ${policy.specialCharMin} special character(s)`);
      }
    }

    if (name === 'confirmPassword' && value !== formData.newPassword) {
      errs.push('Passwords do not match');
    }

    setErrors((prev) => ({ ...prev, [name]: errs }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setTouched((prev) => ({ ...prev, [name]: true }));
    validatePassword(name, value);
  };

  // Button disabled logic
  const isDisabled =
    Object.values(errors).some((err) => err && err.length > 0) || // any error present
    Object.values(touched).length === 0 || // no field touched
    !formData.oldPassword ||
    !formData.newPassword ||
    !formData.confirmPassword;

  return (
    <div className="resetPassword">
      <div className="header-band">Reset Password</div>
      <Card>
        <div className="row">
          <div className="form-field floating-label">
            <input
              type="text"
              name="oldPassword"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="oldPassword">Old Password</label>
          </div>
        </div>
        <div className="row">
          <div className="form-field floating-label">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="newPassword">New Password</label>
            {errors.newPassword && errors.newPassword.length > 0 && (
              <ul className="text-red-500 text-xs mt-1">
                {errors.newPassword.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-field floating-label">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label htmlFor="confirmPassword">Re-Enter New Password</label>
            <span
              className="toggle-password-change"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.confirmPassword && errors.confirmPassword.length > 0 && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword[0]}</p>
            )}
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={handleResetPasswordSave}
            className="save-button"
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
