import { IonContent, IonPage } from "@ionic/react";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../utils/firebase";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "../../../assets/css/search.css";
import { doc, getDoc, getFirestore } from "firebase/firestore";

interface ContainerProps {
  name: string;
}

const Login: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if email or password fields are empty
    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    // Email validation regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email matches the pattern
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user) {
          // Fetch user status from Firestore
          const userDoc = await db.collection("users").doc(user.uid).get();
          const userData = userDoc.data();
          if (userData && userData.status === "inactive") {
            alert(
              "Your account is inactive or deleted. Please contact support."
            );
            return;
          }

          if (user && !user.emailVerified) {
            alert("Please verify your email before logging in.");
            await sendEmailVerification(user);
            return;
          }

          // Check Firestore for user data
          const firestore = getFirestore();
          const userDocRef = doc(firestore, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            alert(
              "User data not found. It may be inactive or deleted. Cannot proceed to login."
            );
            return;
          }

          history.push("/Dashboard");
          console.log(user);
          alert("Login successful!");

          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("Wrong email or password.");
      });
  };

  const handleReload = () => {
    window.location.replace("/Signup");
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
                  Login
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Login as an admin to access admin controls
                </p>
              </div>

              <div className="mt-5">
                <form>
                  <div className="grid gap-y-4">
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
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
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
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          id="password"
                          name="password"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="password-error"
                        />
                      </div>
                    </div>

                    <button
                      onClick={onLogin}
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent gap-x-2 rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Sign in
                    </button>
                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                      Or
                    </div>
                    <div className="text-center">
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account yet? &nbsp;
                        <button
                          onClick={handleReload}
                          className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          Sign up here
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

export default Login;
