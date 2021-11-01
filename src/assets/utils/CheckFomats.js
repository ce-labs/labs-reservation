import validator from 'validator' 


export const checkMailFormat = (mail) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(re.test(mail)) {
       return true;
    } else {
      return false;
    }
  }

export const checkPhoneFormat = (phone) => {
   const isValidPhoneNumber = validator.isMobilePhone(phone);
   return (isValidPhoneNumber)
}