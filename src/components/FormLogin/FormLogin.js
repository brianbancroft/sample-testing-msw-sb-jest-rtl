import { useState } from "react";

import { post } from "axios";

/** Handles validation and authentication */
export default function FormLogin({ handleClose }) {
  const [loading, setLoading] = useState(false);
  const [invalidUsernamePassword, setInvalidUsernamePassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const foo = await post("/login", {
      username: event.target.username.value,
      password: event.target.password.value,
    }).catch((error) => {
      if ((error.message = "Request failed with status code 401")) {
        setInvalidUsernamePassword(true);
        setLoading(false);
      } else {
        alert("unknown error in auth");
        setLoading(false);
      }
    });

    if (foo.status === 200) {
      handleClose();
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={`shadow appearance-none border ${
            invalidUsernamePassword ? "border-red-500" : ""
          } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
          id="password"
          type="password"
          placeholder="******************"
          required
        />
        {invalidUsernamePassword ? (
          <p className="text-red-500 text-xs italic">
            Invalid username or password
          </p>
        ) : (
          <p className="text-red-500 text-xs italic"></p>
        )}
      </div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <div className="ml-4">{loading && "loading spinner!"}</div>
      </div>
    </form>
  );
}
