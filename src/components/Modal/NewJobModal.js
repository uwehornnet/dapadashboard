import { Formik } from "formik";
import { useFetch } from "../../hooks/useFetch";
import { baseURI } from "../../utils/baseURI";

const initialValues = {
	fahrzeughalter: {
		name: "",
		telefon: "",
	},
	fahrzeug: {
		marke: "",
		modell: "",
		kennzeichen: "",
		kraftstoff: "",
	},
	standort: {
		strasse: "",
		hausnummer: "",
		plz: "",
		ort: "",
	},
	bemerkung: "",
};

const NewJobModal = ({ visible, showModal }) => {
	const { loading, data, error } = useFetch({ endpoint: "/api/user" });

	const handleSubmitAsync = async (values) => {
		const geocode = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${values.standort.strasse}%20${values.standort.hausnummer}%20${values.standort.plz}%20${values.standort.ort}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoidWhvcm4iLCJhIjoiY2w4MGx1a2IzMDdkcjNucDdydHVxaWZsMCJ9.QhX9eI_2FUK6wMfc-7DayA`
		);
		const geocodeData = await geocode.json();
		const req = await fetch(`${baseURI}/api/job/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...values,
				standort: {
					...values.standort,
					coords: geocodeData.features.length ? geocodeData.features[0].center : null,
				},
			}),
		});
		const res = await req.json();
		if (res.ok) {
			showModal(false);
		}
	};

	return (
		visible && (
			<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:flex items-center justify-center p-8">
				<div className="bg-white w-full max-h-full max-w-[560px] rounded-lg shadow-lg shadow-zinc-700 overflow-scroll no-scrollbar">
					<div className="p-8 bg-indigo-700 flex items-center justify-between gap-2">
						<div className="flex-1">
							<div className="font-medium text-white uppercase">Auftrag anlegen</div>
							<div className="text-sm text-white">
								Welche Arte von Dokument möchtest du zum ausgewählten Fahrzeug erstellen?
							</div>
						</div>

						<span
							onClick={() => showModal(false)}
							className="text-white cursor-pointer min-w-[60px] min-h-[60px] flex items-center justify-center"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</span>
					</div>
					<div className="bg-white">
						<Formik initialValues={initialValues} onSubmit={handleSubmitAsync} enableReinitialize>
							{({ values, setValues, handleSubmit }) => (
								<>
									<div className="w-full border-b border-dashed border-neutral-300 p-4">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mt-6 mb-2 inline-block">
											Angaben zum Fahrzeughalter
										</span>
										<label className="text-sm  block mt-2">Name, Vorname</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												value={values.fahrzeughalter.name}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeughalter: {
															...values.fahrzeughalter,
															name: e.target.value,
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
											/>
										</div>
										<label className="text-sm  block mt-2">Telefonnummer</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												value={values.fahrzeughalter.telefon}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeughalter: {
															...values.fahrzeughalter,
															telefon: e.target.value,
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
											/>
										</div>
									</div>
									<div className="w-full border-b border-dashed border-neutral-300 p-4">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mt-6 mb-2 inline-block">
											Angaben zum Fahrzeug
										</span>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm  block mt-2">Marke</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														value={values.fahrzeug.marke}
														onChange={(e) =>
															setValues({
																...values,
																fahrzeug: {
																	...values.fahrzeug,
																	marke: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm  block mt-2">Modell</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														value={values.fahrzeug.modell}
														onChange={(e) =>
															setValues({
																...values,
																fahrzeug: {
																	...values.fahrzeug,
																	modell: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
										</div>

										<label className="text-sm  block mt-2">Kennzeichen</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												value={values.fahrzeug.kennzeichen}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: {
															...values.fahrzeug,
															kennzeichen: e.target.value,
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
											/>
										</div>
										<label className="text-sm  block mt-2">Kraftstoff</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												value={values.fahrzeug.kraftstoff}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: {
															...values.fahrzeug,
															kraftstoff: e.target.value,
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
											/>
										</div>
									</div>
									<div className="w-full border-b border-dashed border-neutral-300 p-4">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mt-6 mb-2 inline-block">
											Angaben zum Standort
										</span>

										<div className="flex gap-4 w-full">
											<div className="flex-1">
												<label className="text-sm  block mt-2">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														value={values.standort.strasse}
														onChange={(e) =>
															setValues({
																...values,
																standort: {
																	...values.standort,
																	strasse: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
											<div className="max-w-[80px]">
												<label className="text-sm  block mt-2">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														value={values.standort.hausnummer}
														onChange={(e) =>
															setValues({
																...values,
																standort: {
																	...values.standort,
																	hausnummer: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
										</div>

										<div className="flex gap-4 w-full">
											<div className="max-w-[160px]">
												<label className="text-sm  block mt-2">PLZ</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														value={values.standort.plz}
														onChange={(e) =>
															setValues({
																...values,
																standort: {
																	...values.standort,
																	plz: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm  block mt-2">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														value={values.standort.ort}
														onChange={(e) =>
															setValues({
																...values,
																standort: {
																	...values.standort,
																	ort: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="w-full border-b border-dashed border-neutral-300 p-4">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mt-6 mb-2 inline-block">
											Bemerkungen
										</span>

										<div className="flex gap-4 w-full">
											<div className="flex-1">
												<label className="text-sm  block mt-2">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<textarea
														value={values.bemerkung}
														onChange={(e) =>
															setValues({
																...values,
																bemerkung: e.target.value,
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
													/>
												</div>
											</div>
										</div>
									</div>

									<div className="p-4">
										<button
											type="submit"
											onClick={handleSubmit}
											className="block w-full bg-indigo-700 text-white rounded-md py-3 px-6"
										>
											Auftrag anlegen
										</button>
									</div>
								</>
							)}
						</Formik>
					</div>
				</div>
			</div>
		)
	);
};

export default NewJobModal;
