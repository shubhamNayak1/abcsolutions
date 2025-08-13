type PasswordSetting = {
  id: number;
  passwordLengthMin: number;
  passwordLengthMax: number;
  alphaMin: number;
  numericMin: number;
  specialCharMin: number;
  upperCaseMin: number;
  numberOfLoginAttempts: number;
  validPeriod: number;
  previousPasswordAttemptTrack: number;
  effectiveDate: string;
};

export default PasswordSetting;
