import React from 'react'

export const validate = (email,password) => {
    var errorMessage ;
    if (!email && !password){
        errorMessage =  "Email should not be blank.Please enter a email address#Password can't be empty.Please enter a password"
        return errorMessage
    }
    if (!email){
        errorMessage =  'Email should not be blank.Please enter a email address'
    }
    if (!password){
        errorMessage =  "Password can't be empty.Please enter a password"
    }

    if (email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var isValidEmail = emailRegex.test(email);
        
        if (!isValidEmail){
            if(errorMessage){
                errorMessage =   'Please enter a valid email address.#'+errorMessage
            }else{
                errorMessage =   'Please enter a valid email address.'
            }
            
        
    }}
    if (password){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        var isValidPassword = passwordRegex.test(password);

        if (!isValidPassword && !isValidEmail ){
            errorMessage =  'Please enter a valid email address.' +'#Please enter at least 8 characters,one uppercase letter, one lowercase letter, one digit, and one special character'
        }
        if (!isValidPassword && isValidEmail )
        {
            errorMessage =  'Please enter at least 8 characters,one uppercase letter, one lowercase letter, one digit, and one special character'

        }

    }
    console.log(errorMessage)
    

    
    


    //const isValidEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/.test(email);
    //const isValidPassword = /^(?=.*\d)(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])(?=.*[a-z])(?=.*[A-Z]).{5,10}$/.test(password);


    

    
    if(errorMessage){
       return  errorMessage
    }
    
    return null
}

