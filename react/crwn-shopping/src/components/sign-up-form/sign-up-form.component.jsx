import { useState } from 'react'

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import InputForm from '../input-form/input-form.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss'


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''

}

const SignUpForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log('formFields= ', formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        console.log('submitting')
        event.preventDefault();
        //confirm pw match
        if(password !== confirmPassword) {
            alert("Password does not match") //assumes there are no other PW requirements
            return;
        } 

        try{
            //if authenticated create user
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            console.log ('display name', displayName)
            await createUserDocumentFromAuth(user, displayName);
            resetFormFields();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            } else{
                console.log('user creation encountered an error', error);
            }
        }


    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({ ...formFields, [name]: value }) // ...formFields pulls the entire array. 
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <InputForm 
                    label="Display Name"
                    inputOptions=
                    {{
                        required: true,
                        type: "text",
                        onChange:handleChange, 
                        name:"displayName",
                        value:displayName
                    }}
                />
                <InputForm 
                    label="Email"
                    inputOptions=
                    {{
                        required:true,
                        type:"email",
                        onChange:handleChange,
                        name:"email",
                        value:email,
                    }}
                />
                
                <InputForm 
                    label='Password'
                    inputOptions={{
                        required:true, 
                        type:"password",
                        onChange:handleChange,
                        name:"password",
                        value:password 
                    }}
                />
                
                <InputForm 
                    label='Confirm Password'
                    inputOptions=
                    {{
                        required:true,
                        type:"password",
                        onChange:handleChange,
                        name:"confirmPassword", 
                        value:confirmPassword
                    }}
                />
                <Button type='submit'>
                    Sign Up
                </Button>
                
            </form>
        </div>
    )
}

export default SignUpForm