import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../Store/authSlice.js";
import { Input } from "./index.js";
import { useDispatch } from "react-redux";
import authservice from "../appwriteServices/Auth_svc";
import { useForm } from "react-hook-form";

const SignupComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signupHandler = async (data) => {
    const { email, password, name } = data;
    try {
      const userData = await authservice.createAccount({
        email,
        password,
        name,
      });

      if (userData) {
        const userdata = await authservice.getCurrentUser();
        if (userdata) {
          console.log(userData);

          dispatch(logIn(userdata));
          navigate("/");
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-500">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        <form onSubmit={handleSubmit(signupHandler)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

            <Input
              label={"Email: "}
              type={"email"}
              placeholder={"Enter your email"}
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address ok",
                },
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
              className="w-full bg-blue-500 text-white hover:bg-blue-800 px-4 py-2 rounded-md"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
