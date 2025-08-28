import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/FirebaseConfig";
import { useData } from "../../context/data/MyState";
import Loader from "../../components/loader/Loader";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const context = useData();
  const { loading, setLoading } = context;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (form.email === "") {
      return toast.warning("Please enter your email...");
    } else if (form.password === "") {
      return toast.warning("Please enter your password...");
    }

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login Successfully...!");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid Email or Password!");
      setLoading(false);
    }
  }

  // Function to handle Google login----------------------------------------
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Login with Google Successful! 🎉");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Google login failed!");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] p-4">
        <form
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-200 transition-all duration-300 hover:shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-800 font-serif">
            Ayura C Serum 🌿
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-green-300 bg-[#f9fff9] text-green-900 placeholder-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 mb-6 border border-green-300 bg-[#f9fff9] text-green-900 placeholder-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-lime-600 transition-all cursor-pointer"
          >
            Login
          </button>
          
          {/* <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-lime-600 transition-all cursor-pointer"
          >
            Login with Google
          </button> */}

          <p className="mt-6 text-center text-green-700 font-medium">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-lime-600 hover:text-lime-800 font-semibold underline transition-all"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
