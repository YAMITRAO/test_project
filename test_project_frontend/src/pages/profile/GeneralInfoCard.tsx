import { useState } from "react";

const GeneralInfoCard = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <>
      <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                General Details
              </h3>
            </div>

            <form action="#">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                {/* name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value="Ram"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                    disabled:dark:bg-gray-700 disabled:dark:border-gray-600
                    "
                    placeholder="Ex. Ram"
                    disabled={isDisabled}
                  />
                </div>
                {/* dob */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Dob
                  </label>
                  <input
                    type="date"
                    name="brand"
                    id="brand"
                    value={"2010-02-01"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                    disabled:dark:bg-gray-700 disabled:dark:border-gray-600
                    "
                    placeholder="Ex. 02-04-2002"
                    disabled={isDisabled}
                  />
                </div>

                {/*user Standard field  */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Standard
                  </label>
                  <input
                    type="text"
                    value="12th"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                    disabled:dark:bg-gray-700 disabled:dark:border-gray-600
                    "
                    placeholder="Ex. 10th, 12th"
                    disabled={isDisabled}
                  />
                </div>

                {/*user section field  */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Section
                  </label>
                  <input
                    type="text"
                    value="Mercury"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                    disabled:dark:bg-gray-700 disabled:dark:border-gray-600
                    "
                    placeholder="Ex. A, Mercury etc.."
                    disabled={isDisabled}
                  />
                </div>

                {/*user Email field  */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    value="test@gmail.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                    disabled:dark:bg-gray-700 disabled:dark:border-gray-600
                    "
                    placeholder="Ex. test@gmail.com"
                    disabled={isDisabled}
                  />
                </div>

                {/* user bio */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-500  dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                    disabled:dark:bg-gray-700 disabled:dark:border-gray-600
                    "
                    placeholder="Write a description..."
                    disabled={isDisabled}
                  >
                    #TechTrends
                  </textarea>
                </div>
              </div>

              {/* action buttons */}
              <div className="flex items-center space-x-4">
                {isDisabled ? (
                  <button
                    type="button"
                    className="text-blue-600 inline-flex items-center hover:text-white border border-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                    onClick={() => setIsDisabled(false)}
                  >
                    Edit Details
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      onClick={() => setIsDisabled(true)}
                    >
                      Cancle
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfoCard;
