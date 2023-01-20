import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { baseURI } from "../../utils/baseURI";
import { useFetch } from "../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import ActivityIndicator from "../../components/ActivityIndicator";

const CustomerUpdatePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [fetching, setFetching] = useState(false);
	const [inititalValues, setInitialValues] = useState({
		name: "",
		email: "",
		address: "",
	});
	const { loading, data: customer } = useFetch({ endpoint: `/api/customer/${id}` });

	const onUserFormSubmit = async (values) => {
		try {
			if (fetching) return;
			setFetching(true);
			const req = await fetch(`${baseURI}/api/customer/update/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/text",
				},
				body: JSON.stringify(values),
			});
			const res = await req.json();
			setFetching(false);
			if (res.ok) {
				navigate("/customer");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onCustomerDelete = async () => {
		const req = await fetch(`${baseURI}/api/customer/delete/${id}`, {
			method: "GET",
		});

		const res = await req.json();
		const { ok } = res;
		if (ok) {
			navigate("/customer");
		}
	};

	useEffect(() => {
		console.log({ customer });
		if (customer) {
			setInitialValues({ ...customer });
		}
	}, [customer]);

	return (
		<div className="p-8">
			<div className="max-w-[800px] mx-auto border border-zinc-300 rounded-lg bg-white">
				{loading ? (
					<div className="p-8">
						<ActivityIndicator />
					</div>
				) : (
					<Formik initialValues={inititalValues} onSubmit={onUserFormSubmit} enableReinitialize>
						{({ values, isSubmitting, setValues }) => {
							return (
								<Form>
									<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
										<div>
											<h2 className="text-xl">Kunden berabeiten</h2>
											<p className="text-slate-400">Aktualisiere Kundendaten.</p>
										</div>

										<div className="flex items-center gap-2">
											<span
												onClick={onCustomerDelete}
												className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-6 py-3 rounded-lg text-slate-300 hover:text-slate-900"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="w-6 h-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
												löschen
											</span>
											<button
												type="submit"
												disabled={isSubmitting}
												className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-6 py-3 rounded-lg"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
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
				)}
			</div>
		</div>
	);
};
export default CustomerUpdatePage;
