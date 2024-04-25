import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase.js";
import "../../../assets/css/search.css";
import { networkInterfaces } from "os";
import { serverTimestamp } from "firebase/firestore";

interface ContainerProps {
  name: string;
}

const Signup: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if email or password fields are empty
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check if password is at least 8 characters long
    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return;
    }

    // Email validation regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email matches the pattern
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const now = serverTimestamp();

        // Update user profile with role as superAdmin
        await updateProfile(user, { displayName: displayName });

        // Add role to Firestore
        await db.collection("users").doc(user.uid).set({
          displayName: displayName,
          email: email,
          role: "superAdmin",
          status: "available",
          createdAt: now,
        });

        // Send email verification
        const currentUser = auth.currentUser;
        if (currentUser) {
          await sendEmailVerification(currentUser);
          alert(
            "A verification email has been sent to your email address. Please verify your email before signing in."
          );
          setEmail("");
          setPassword("");
        } else {
          alert("User is not authenticated.");
        }

        history.push("/Login");

        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Error on Signing up.");
      });
  };

  const handleReload = () => {
    window.location.replace("/Login");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <main className="w-full h-auto max-w-md mx-auto text-base-content rounded-3xl">
          <div className="bg-white border border-gray-200 shadow-sm my-28 rounded-3xl dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  QC-IOSK ADMIN SYSTEM
                </h1>
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign up
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Sign up as an admin to access admin controls
                </p>
              </div>

              <div className="mt-5">
                <form>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          type="text"
                          onChange={(e) => setDisplayName(e.target.value)}
                          id="name"
                          name="name"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="name-error"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          name="email"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          type="password"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          name="password"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="password-error"
                        />
                      </div>
                    </div>

                    {/* Password confirmation field */}
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block mb-2 text-sm dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id="confirm-password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          name="confirm-password"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="confirm-password-error"
                        />
                      </div>
                    </div>

                    <button
                      onClick={onSubmit}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent gap-x-2 rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Sign up
                    </button>
                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                      Or
                    </div>
                    <div className="text-center">
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Already have an account? &nbsp;
                        <button
                          onClick={handleReload}
                          className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          Sign in here
                        </button>
                        <br />
                        <br />
                        <br />
                        <NavLink to="/SanBartolome">
                          Go Back to QC-IOSK Map
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
