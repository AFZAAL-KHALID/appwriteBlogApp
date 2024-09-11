import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {logIn } from '../Store/Authslice'
import {Input} from './index'
import { useDispatch } from 'react-redux'
import authservice from '../appwriteServices/Auth_svc'
import { useForm } from 'react-hook-form'

const LoginCompnt = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, seterror] = useState(null)

    const logingHandler = async (data) => {
        seterror("")
        try {
          const session =  await authservice.login({data})
        if (session) {
           const userData = await authservice.getCurrentUser()
           if (userData) {
            useDispatch(logIn(session));
            navigate("/")
           } 
        }
        } catch (error) {
            seterror(error)
        }

    } 

  return (
    <div className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

         <form onSubmit={handleSubmit(logingHandler)}>
        <div className='space-y-5'>
           
            <Input lable={"Email: "}
                type={"email"}
                placeholder={"Enter your email"}
                {...register ("email", {
                    require: true,
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
                    required: true,
                })}
                />
                <button
                type="submit"
                className="w-full"
                >Sign in</button>

        </div>

         </form>

        </div>
    </div>
  )
}

export default LoginCompnt