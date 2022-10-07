import { useState } from 'react'

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

import InputForm from '../input-form/input-form.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss'


const defaultFormFields = {
    email:'',
    password:''
}

const SignInForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log('formFields= ', formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(response);
        }
        catch(error){
            switch (error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for password');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break
                default:
                    console.log(error)
            }
                
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({ ...formFields, [name]: value }) // ...formFields pulls the entire array. 
    }

    return(
        <div className='sign-up-container'>
            <h2>Already Have have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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
                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm