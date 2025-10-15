import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

function Signup() {
  const context = useData();
  const { loading, setLoading } = context;

  const [form, setForm] = useState({
    name: "",
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
    if (form.name === "" || form.email === "" || form.password === "") {
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      //Storing Data into firebase Database- - - -- - -
      const user = {
        name: form.name,
        uid: users.user.uid,
        email: users.user.email,
        signedupAt: new Date().toISOString(),
      };
      const userRef = collection(firebaseDB, "users");
      await addDoc(userRef, user);
      setForm({ name: "", email: "", password: "" });
      toast.success("Register Successfully!");
    } catch (error) {
      toast.warning("Already Registered..");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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
          TNV's{" "}
          <span style={{ color: "#6FA4AF" }} className="text-[27px]">
            Blogs
          </span>
        </h2>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl outline-none transition-all focus:scale-[1.02]"
          style={{
            border: "1.5px solid #B8C4A9",
            backgroundColor: "#F4E9D7",
            color: "#6FA4AF",
          }}
        />

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

        {/* Signup Button */}
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
          Sign Up
        </button>

        {/* Login Redirect */}
        <p
          className="mt-6 text-center font-medium"
          style={{ color: "#6FA4AF" }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold underline transition-all"
            style={{ color: "#D97D55" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#B8C4A9")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#D97D55")}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
