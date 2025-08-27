type GetPasswordPolicyDto = {
    upperCaseMin : number;
    passwordLengthMax : number;
    passwordLengthMin : number;
    alphaMin : number;
    numericMin : number;
    specialCharMin : number;
  };
  
  export default GetPasswordPolicyDto;
  