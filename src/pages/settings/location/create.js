import { Formik, Form, Field } from "formik";
import { baseURI } from "../../../utils/baseURI";
import { useNavigate } from "react-router-dom";

const LocationCreatePage = () => {
	const navigate = useNavigate();
	const onUserFormSubmit = async (values) => {
		const req = await fetch(`${baseURI}/api/location/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: values.name,
				address: values.address,
				zip_code: values.zipCode,
				city: values.city,
			}),
		});
		const res = await req.json();
		console.log(res);
		if (res.ok) {
			alert("Neuer Standort wurde erfolgreich erstellt!");
			navigate("/settings/location");
		} else {
			alert("Uppps, ein Fehler ist aufgetreten " + res.data);
		}
	};
	return (
		<div className="max-w-[800px] mx-auto border border-zinc-300 rounded-lg bg-white">
			<Formik
				initialValues={{
					name: "",
					address: "",
					zipCode: "",
					city: "",
				}}
				onSubmit={onUserFormSubmit}
			>
				{({ values, isSubmitting, setValues }) => {
					return (
						<Form>
							<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
								<div>
									<h2 className="text-xl">Standorte</h2>
									<p className="text-slate-400">Erstelle einen neuen Standort</p>
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
										placeholder="Name"
										className="border border-slate-200 p-2 rounded-md block w-full"
										onChange={(e) => {
											setValues({ ...values, name: e.target.value });
										}}
									/>
								</div>
								<div className="mb-6">
									<label className="w-full text-xs uppercase text-slate-600 font-medium">
										Strasse und Hausnummer
									</label>
									<Field
										type="text"
										name="address"
										value={values?.address}
										placeholder="Strasse und Hausnummer"
										className="border border-slate-200 p-2 rounded-md block w-full"
										onChange={(e) => {
											setValues({ ...values, address: e.target.value });
										}}
									/>
								</div>
								<div className="mb-6">
									<label className="w-full text-xs uppercase text-slate-600 font-medium">PLZ</label>
									<Field
										type="text"
										name="PLZ"
										value={values?.zipCode}
										placeholder="Postleitzahl"
										className="border border-slate-200 p-2 rounded-md block w-full"
										onChange={(e) => {
											setValues({ ...values, zipCode: e.target.value });
										}}
									/>
								</div>
								<div>
									<label className="w-full text-xs uppercase text-slate-600 font-medium">Stadt</label>
									<Field
										type="text"
										name="city"
										value={values?.city}
										placeholder="Stadt"
										className="border border-slate-200 p-2 rounded-md block w-full"
										onChange={(e) => {
											setValues({ ...values, city: e.target.value });
										}}
									/>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};
export default LocationCreatePage;
