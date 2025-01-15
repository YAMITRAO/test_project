import "./spiner.css";

const Spiner = () => {
  return (
    <div className="flex flex-col w-fit items-center justify-center gap-2">
      {/* baisc spiner */}
      <div>Basic spiner</div>
      <div className=" size-7 animate-spin rounded-full border-green-700  border-[3px] border-r-transparent"></div>

      {/* soft color spiner */}
      <div>Soft color spiner</div>
      <div className=" size-7 animate-spin rounded-full border-[4px] border-red-400 border-r-red-800 dark:border-navy-500 dark:border-r-navy-300"></div>

      {/* img based spiner */}
      <div className="spinner size-7 animate-spin  border-r-transparent rounded-full text-slate-500 dark:text-navy-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          fill="none"
          viewBox="0 0 28 28"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M28 14c0 7.732-6.268 14-14 14S0 21.732 0 14 6.268 0 14 0s14 6.268 14 14zm-2.764.005c0 6.185-5.014 11.2-11.2 11.2-6.185 0-11.2-5.015-11.2-11.2 0-6.186 5.015-11.2 11.2-11.2 6.186 0 11.2 5.014 11.2 11.2zM8.4 16.8a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      {/*  */}
    </div>
  );
};

export default Spiner;
 