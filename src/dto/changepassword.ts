type ChangePasswordDto = {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default ChangePasswordDto;
