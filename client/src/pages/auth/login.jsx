import CommonForm from '@/components/common/form'
import { loginFormControls } from '@/config'
import {React, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUser } from '@/store/auth/authSlice'
import { toast } from '@/hooks/use-toast'


const initialState = {
  email:'',
  password:''
}


function AuthLogin() {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();

  function onSubmit(event){
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if(data?.payload?.success){
        toast({
          title:data?.payload?.message
        })
      }else{
        toast({
          title:data?.payload?.message,
          variant:"destructive"
        })
      }
    }
    )
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className="text-center">
      <h1 className='text-3xl tracking-tight text-foreground font-bold'>Sign in your account</h1>
      <p className='mt-2'>Don't have an account?
        <Link to='/auth/register' className='font-medium ml-2 text-primary hover:underline' >
        Sign Up
        </Link>
      </p>
    </div>
    <CommonForm 
    formControls={loginFormControls}
    formData={formData}
    setFormData={setFormData}
    buttonText={"Login"}
    onSubmit={onSubmit}/>
    </div>
  )
}

export default AuthLogin
