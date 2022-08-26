import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { baseURI } from "../utils/baseURI";

const LoginPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const res = await fetch(`${baseURI}/auth/login`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const json = await res.json();

			if (json.ok) {
				window.sessionStorage.setItem(
					"_",
					JSON.stringify({
						token: json.token,
						user: json.user,
					})
				);

				setSubmitting(false);
				const path = window.sessionStorage.getItem("currentPath");
				if (path) {
					navigate(JSON.parse(path));
				} else {
					navigate("/");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-center h-screen w-screen bg-slate-50">
			<Formik
				initialValues={{ email: "", password: "" }}
				validate={(values) => {
					const errors = {};
					if (!email) {
						errors.email = "Required";
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
						errors.email = "Invalid email address";
					}
					if (!password) {
						errors.password = "Required";
					}
					return errors;
				}}
				onSubmit={handleSubmit}
				onBlur={() => {
					const errors = {};
					if (!email) {
						errors.email = "Required";
					} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
						errors.email = "Invalid email address";
					}
					if (!password) {
						errors.password = "Required";
					}
					return errors;
				}}
			>
				{({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
					return (
						<form onSubmit={handleSubmit} className="flex flex-col">
							<div className="col-span-8 sm:col-span-4 mb-2">
								<input
									type="text"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
									onBlur={handleBlur}
									value={email}
									placeholder="E-Mail Adresse"
									className={
										errors["email"] === "Required"
											? "mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-red-500 rounded-md"
											: "mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
									}
								/>
							</div>

							<div className="col-span-8 sm:col-span-4 mb-2">
								<input
									type="password"
									name="pasword"
									id="password"
									onChange={(e) => setPassword(e.target.value)}
									onBlur={handleBlur}
									value={password}
									placeholder="Passwort"
									className={
										errors["password"] === "Required"
											? "mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-red-500 rounded-md"
											: "mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
									}
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="inline-flex justify-center p-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Login
							</button>
						</form>
					);
				}}
			</Formik>
		</div>
	);
};

export default LoginPage;
