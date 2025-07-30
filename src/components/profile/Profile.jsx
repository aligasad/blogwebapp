import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firebaseDB, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such profile in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gradient-to-br from-white to-[#e8f5ef] shadow-2xl rounded-3xl mt-12">
      <h2 className="text-3xl font-extrabold text-center text-[#333] mb-6 border-b pb-3">
        👤 Your Profile
      </h2>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <img
            src={userData?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#449474] shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-[#222]">
            {userData?.name || "No name yet"}
          </h3>
          <p className="text-sm text-gray-500">{userData?.email}</p>
        </div>

        <div className="w-full bg-[#f3fdf9] rounded-lg p-4 shadow-inner">
          <p className="text-gray-700 font-medium">
            📍 Address:{" "}
            <span className="text-gray-600 font-normal">
              {userData?.address || "Not provided"}
            </span>
          </p>
          <p className="text-gray-700 font-medium mt-1">
            🧾 Pin Code:{" "}
            <span className="text-gray-600 font-normal">
              {userData?.pincode || "Not provided"}
            </span>
          </p>
          <p className="text-gray-700 gap-1 font-medium mt-1">
            📝 Bio:{" "}
            <span className="text-gray-600 font-normal">
              {userData?.Biography || "Not provided"}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/complete-profile")}
          className="mt-6 px-6 py-2 bg-[#449474] text-white font-semibold rounded-full hover:bg-[#003d29] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          ✏️ Complete / Edit Profile
        </button>

        <button
          onClick={handleSignOut}
          className="mt-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 shadow-md cursor-pointer"
        >
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
