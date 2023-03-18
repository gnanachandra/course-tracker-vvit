const emailValidation = (email) =>{
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        if(email.endsWith("@vvit.net") && email.length === 19)
        {
            return true;
        }
        else{
            return "Enter vvit.net mail ID"
        }
    }
    else{
        return "Enter a valid email"
    }
};
const rollNoValidator = (roll) =>{
    if(roll.length !== 10)
    {
        return "Enter a valid rollNo";
    }
    return true;
}

const rollAndEmailValidation = (roll,email) =>{
    //console.log("rollno and email validation");
    if(!email.startsWith(roll) && roll.length === 10)
    {
        return "emailID doesnot belong to the student";
    }
    return true;
} 

export const passwordValidation =(password,confirmPassword) =>{
    if(password===confirmPassword)
    {
        return true
    }
    return false
}

export const validator = async(form) =>{
    if(emailValidation(form.email)===true)
    {
        if(rollNoValidator(form.rollNo)===true)
        {
            if(rollAndEmailValidation(form.rollNo,form.email)===true)
            {
                return true;
            }
            return "Email and rollNo mismatch";
        }
        return "Enter a valid rollNo";
    }
    return "Enter a valid Email";
}

export default validator;