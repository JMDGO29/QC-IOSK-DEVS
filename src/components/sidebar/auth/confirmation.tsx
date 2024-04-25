import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "../../../assets/css/search.css";

interface ContainerProps {
  name: string;
}

const Confirmation: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

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
                  Confirmation
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Confirmation as an admin to access admin controls
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
                        One Time Password
                      </label>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          type="email"
                          id="email"
                          name="email"
                          className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>

                    <button className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-blue-600 border border-transparent gap-x-2 rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                      Log in
                    </button>
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

export default Confirmation;
