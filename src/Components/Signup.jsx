import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {logIn } from '../Store/Authslice'
import {Input} from './Input'
import { useDispatch } from 'react-redux'
import authservice from '../appwriteServices/Auth_svc'
import { useForm } from 'react-hook-form'

const Signup = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const signupHandler = async(data)=>{
        setError("")
        try {
           const userData =  await authservice.createAccount(data)
           if (userData) {
              const userdata = await authservice.getCurrentUser()
              if (userdata) {
                useDispatch(logIn(userdata))
              }
           }
            
            
        } catch (error) {
            setError(error)
        }
    }
  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        </div>

        <form onSubmit={handleSubmit(signupHandler)}>
        <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-800 px-4 py-2 rounded-md">
                            Create Account
                        </button>
                    </div>

        </form>

    </div>
  )
}

export default Signup