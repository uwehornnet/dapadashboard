import { Formik, Form, Field } from "formik";

const ProfileSettings = () => {
	const onUserFormSubmit = (values) => {};
	return (
		<div className="max-w-[800px] mx-auto border border-zinc-300 rounded-lg bg-white">
			<Formik
				initialValues={{
					username: "",
					email: "",
					oldPassword: "",
					password: "",
				}}
				onSubmit={onUserFormSubmit}
			>
				{({ values, isSubmitting }) => {
					return (
						<Form>
							<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
								<div>
									<h2 className="text-xl">Benutzereinstellungen</h2>
									<p className="text-slate-400">Ändere deine Benutzereinstellungen</p>
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-6 py-3 rounded-lg"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
										/>
									</svg>
									speichern
								</button>
							</div>
							<div className="px-4 py-6">
								<div className="mb-6">
									<label className="text-xs uppercase text-slate-600 font-medium">Benutzername</label>
									<Field
										type="text"
										name="useranme"
										value={values?.username}
										placeholder="Benutzername"
										className="border border-slate-200 p-2 rounded-md block w-full"
									/>
								</div>
								<div className="mb-6">
									<label className="w-full text-xs uppercase text-slate-600 font-medium">
										Email Adresse
									</label>
									<Field
										type="text"
										name="email"
										value={values?.email}
										placeholder="Emailadresse"
										className="border border-slate-200 p-2 rounded-md block w-full"
									/>
								</div>
								<div className="mb-6">
									<label className="w-full text-xs uppercase text-slate-600 font-medium">
										Passwort
									</label>
									<Field
										type="text"
										name="password"
										value={values?.password}
										placeholder="Passwort"
										className="border border-slate-200 p-2 rounded-md block w-full"
									/>
								</div>
								<div>
									<label className="w-full text-xs uppercase text-slate-600 font-medium">
										altes Passwort
									</label>
									<Field
										type="password"
										name="oldPassword"
										value={values?.oldPassword}
										placeholder="altes Passwort"
										className="border border-slate-200 p-2 rounded-md block w-full"
									/>
								</div>
								<div className="mt-16">
									<label className="w-full text-xs uppercase text-slate-600 font-medium block">
										Benutzerrolle
									</label>
									<select className="appearance-none border border-slate-200 p-2 rounded-md block w-full">
										<option value="admin">Admin</option>
										<option value="user">User</option>
									</select>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};
export default ProfileSettings;
