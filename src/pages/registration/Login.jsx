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
      <div
        className="flex justify-center items-center min-h-screen p-4"
        style={{
          background: "linear-gradient(135deg, #F4E9D7, #B8C4A9)",
        }}
      >
        <form
          className="bg-[#FFF8F3] p-8 rounded-3xl shadow-2xl w-full max-w-md border transition-all duration-300 hover:shadow-3xl"
          style={{ borderColor: "#B8C4A9" }}
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <h2
            className="text-3xl font-extrabold mb-6 text-center"
            style={{ color: "#D97D55" }}
          >
            Welcome to{" "}
            <span style={{ color: "#6FA4AF" }} className="text-[27px]">
              TNV's Blog
            </span>
            
          </h2>

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl outline-none transition-all focus:scale-[1.02]"
            style={{
              border: "1.5px solid #B8C4A9",
              backgroundColor: "#F4E9D7",
              color: "#6FA4AF",
            }}
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 mb-6 rounded-xl outline-none transition-all focus:scale-[1.02]"
            style={{
              border: "1.5px solid #B8C4A9",
              backgroundColor: "#F4E9D7",
              color: "#6FA4AF",
            }}
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full font-semibold py-3 rounded-xl shadow-md transition-all cursor-pointer"
            style={{
              background: "linear-gradient(to right, #D97D55, #6FA4AF)",
              color: "white",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #6FA4AF, #D97D55)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(to right, #D97D55, #6FA4AF)")
            }
          >
            Login
          </button>

          {/* Optional Google Login */}
          {/* <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full font-semibold py-3 rounded-xl shadow-md mt-4 transition-all cursor-pointer"
      style={{
        background: "linear-gradient(to right, #6FA4AF, #B8C4A9)",
        color: "white",
      }}
    >
      Login with Google
    </button> */}

          {/* Register link */}
          <p
            className="mt-6 text-center font-medium"
            style={{ color: "#6FA4AF" }}
          >
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold underline transition-all"
              style={{ color: "#D97D55" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#B8C4A9")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#D97D55")}
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
