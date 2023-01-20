import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { baseURI } from "../../utils/baseURI";

const CustomerCreatePage = () => {
	const [loading, setLoading] = useState(false);
	const onUserFormSubmit = async (values) => {
		if (loading) return;
		setLoading(true);
		const req = await fetch(`${baseURI}/api/customer/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/text",
			},
			body: JSON.stringify(values),
		});
		const res = await req.json();
		setLoading(false);
		console.log({ res });
	};

	return (
		<div class="p-4">
			<div className="max-w-[800px] mx-auto border border-zinc-300 rounded-lg bg-white ">
				<Formik
					initialValues={{
						name: "",
						email: "",
						address: "",
					}}
					onSubmit={onUserFormSubmit}
				>
					{({ values, isSubmitting, setValues }) => {
						return (
							<Form>
								<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
									<div>
										<h2 className="text-xl">Kunden anlegen</h2>
										<p className="text-slate-400">
											Füge einen neuen Kunden in die Kundendatenbank ein
										</p>
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
										<label className="text-xs uppercase text-slate-600 font-medium">Name</label>
										<Field
											type="text"
											name="name"
											value={values?.name}
											className="border border-slate-200 p-2 rounded-md block w-full"
											onChange={(e) =>
												setValues({
													...values,
													name: e.target.value,
												})
											}
										/>
									</div>
									<div className="mb-6">
										<label className="w-full text-xs uppercase text-slate-600 font-medium">
											Anschrift
										</label>
										<textarea
											name="address"
											value={values?.address}
											className="border border-slate-200 p-2 rounded-md block w-full min-h-[160px]"
											onChange={(e) =>
												setValues({
													...values,
													address: e.target.value,
												})
											}
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
											className="border border-slate-200 p-2 rounded-md block w-full"
											onChange={(e) =>
												setValues({
													...values,
													email: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default CustomerCreatePage;
