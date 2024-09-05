import { useState } from "react";
// import backgroundImage from "../../assets/backgrounds/background.png";
import BAMSLogo from "../../assets/BAMSLogo.svg";
import { useBackground } from "../context/BackgroundContext";

// import useAxios from "../hooks/useAxios";
// import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { displayedBackground } = useBackground();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const axiosPost = useAxios();
  //   const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // try {
    //   const response = await axiosPost.post("/login", { email, password });
    //   console.log("Login response data:", response.data); // Debugging line

    //   // Store user data in localStorage
    //   localStorage.setItem("user", JSON.stringify(response.data.user));

    //   // Redirect to the dashboard after storing user data
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error logging in:", error.message);
    // }
  };

  return (
    <div
      className="h-screen w-screen "
      style={{
        backgroundImage: `url("${displayedBackground}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="grid grid-cols-8 text-white">
        <div className="col-span-6">
          <div className="flex items-center gap-3 ps-2.5 w-72 py-8 ms-6 ">
            <div className="">
              <img className="mr-5 h-14" src={BAMSLogo} alt="Logo" />
            </div>
            <h1 className="pb-2 capitalize text- leading-[1.1rem] font-">
              Business Account Management Solution
            </h1>
          </div>
        </div>
        <div className="col-span-2 h-screen backdrop-blur-[180px] bg-black/35 flex items-center justify-center p-16">
          <div className="">
            <h2 className="text-4xl font-semibold pb-3.5">Sign In</h2>
            <p className="leading-[1.1rem] text-sm">
              Make sure all of your credentials are correct to access your
              account.
            </p>
            <div className="pt-10">
              <form onSubmit={handleLogin} className="">
                <div className="">
                  <input
                    type="text"
                    placeholder="example@gmail.com"
                    className="block text-sm py-[18px] px-4 rounded-t-lg  border border-b-0 outline-cyan-800 w-full placeholder:text-sm "
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <input
                    type="password"
                    placeholder="Your password"
                    className="block text-sm py-[18px] px-4 rounded-b-lg w-full border outline-cyan-800 placeholder:text-sm "
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <p className="leading-[1.1rem] text-sm text-end pt-6 pb-3">
                  Forget Password
                </p>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="w-full py-4 font-medium text-sm text-white backdrop-blur-[180px] bg-black/35  rounded-lg hover:bg transition-all"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
