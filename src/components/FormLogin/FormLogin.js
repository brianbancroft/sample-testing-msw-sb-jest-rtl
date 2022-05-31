import { useState } from "react";
import PropTypes from "prop-types";

/** Handles validation and authentication */
export default function FormLogin(props) {
  const [loading, setLoading] = useState(false);
  const [invalidUsernamePassword, setInvalidUsernamePassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const { username, password } = event.target.elements;

    try {
      const response = await fetch("/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });
      await response.json();

      if (response.status === 200) {
        props.handleClose();
      } else {
        setInvalidUsernamePassword(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error detected");

      if ((error.message = "Request failed with status code 401")) {
        setInvalidUsernamePassword(true);
        setLoading(false);
      }
    }
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
          name="username"
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
          name="password"
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

FormLogin.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
