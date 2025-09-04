type PasswordSetting = {
  passwordLengthMin: number;
  passwordLengthMax: number;
  alphaMin: number;
  numericMin: number;
  specialCharMin: number;
  upperCaseMin: number;
  numberOfLoginAttempts: number;
  validPeriod: number;
  previousPasswordAttemptTrack: number;
};

export default PasswordSetting;
