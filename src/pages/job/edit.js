import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import { Formik } from "formik";

import "mapbox-gl/dist/mapbox-gl.css";

import { baseURI } from "../../utils/baseURI";
import ActivityIndicator from "../../components/ActivityIndicator";

const formValues = {
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
	fahrer: "",
	status: "",
};

const JobEditPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);
	const [drivers, setDrivers] = useState(null);
	const [error, setError] = useState(null);
	const [initialValues, setInitialValues] = useState(formValues);

	const handleSubmitAsync = async (values) => {
		let geocodeData = null;
		if (!values.standort.coords) {
			const geocode = await fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${values.standort.strasse}%20${values.standort.hausnummer}%20${values.standort.plz}%20${values.standort.ort}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoidWhvcm4iLCJhIjoiY2w4MGx1a2IzMDdkcjNucDdydHVxaWZsMCJ9.QhX9eI_2FUK6wMfc-7DayA`
			);
			geocodeData = await geocode.json();
		}

		const req = await fetch(`${baseURI}/api/job/update/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...values,
				standort: {
					...values.standort,
					coords: geocodeData && geocodeData.features.length ? geocodeData.features[0].center : null,
				},
			}),
		});
		const res = await req.json();
		if (res.ok) {
			navigate("/job");
		}
	};

	const fetchDataAsync = async () => {
		try {
			const req = await fetch(`${baseURI}/api/job/${id}`, {
				method: "GET",
			});
			const res = await req.json();
			const json = JSON.parse(res.data.data);
			setData({
				...res.data,
				data: json,
			});
			setInitialValues({ ...formValues, ...json });
		} catch (error) {
			setError(error);
		}
		setLoading(false);
	};

	const fetchDriverAsync = async () => {
		const req = await fetch(`${baseURI}/api/user/driver/get`);
		const res = await req.json();
		setDrivers(res.data);
		setLoading(false);
	};

	useEffect(() => {
		if (loading) return;
		setLoading(true);
		fetchDataAsync();
		fetchDriverAsync();
	}, []);

	return loading ? (
		<div className="p-8">
			<ActivityIndicator />
		</div>
	) : error ? (
		<div className="p-8">{JSON.stringify(error)}</div>
	) : (
		data && (
			<div className="p-4 h-full">
				<div className="bg-white w-full h-full rounded-lg border border-slate-300 items-stretch flex flex-col-reverse lg:flex-row overflow-auto">
					<div className="bg-slate-200 flex-1 min-h-[50vh] lg:h-full lg:sticky lg:top-0 lg:self-start">
						{data.data.standort.coords && (
							<Map
								initialViewState={{
									longitude: data.data.standort?.coords[0],
									latitude: data.data.standort?.coords[1],
									zoom: 14,
								}}
								style={{ width: "100%", height: "100%" }}
								mapStyle="mapbox://styles/uhorn/cl11tmhys002r14sfxofmkoxz"
								mapboxAccessToken="pk.eyJ1IjoidWhvcm4iLCJhIjoiY2w4MGx1a2IzMDdkcjNucDdydHVxaWZsMCJ9.QhX9eI_2FUK6wMfc-7DayA"
							>
								<Marker
									longitude={data.data.standort?.coords[0]}
									latitude={data.data.standort?.coords[1]}
									color="black"
								/>
							</Map>
						)}
					</div>
					<div className="bg-white lg:w-1/3 border-l border-slate-300">
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
											Angaben zum Fahrer
										</span>

										<label className="text-sm  block mt-2">Fahrer</label>
										<select
											name="fahrer"
											id="fahrer"
											value={values.fahrer}
											onChange={(e) => setValues({ ...values, fahrer: e.target.value })}
											className="appearance-none border border-slate-200 p-2 rounded-md block w-full"
										>
											<option value="" disabled>
												bitte wählen
											</option>
											{drivers &&
												drivers.map((driver) => (
													<option key={driver.id} value={driver.name}>
														{driver.name}
													</option>
												))}
										</select>
									</div>

									<div className="w-full border-b border-dashed border-neutral-300 p-4">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mt-6 mb-2 inline-block">
											Angaben zum Auftragsstatus
										</span>

										<label className="text-sm  block mt-2">Status</label>
										<select
											name="status"
											id="status"
											value={values.status}
											onChange={(e) => setValues({ ...values, status: e.target.value })}
											className="appearance-none border border-slate-200 p-2 rounded-md block w-full"
										>
											<option value="" disabled>
												bitte wählen
											</option>
											<option value="wartend">wartend</option>
											<option value="angenommen">angenommen</option>
											<option value="abgeschlossen">abgeschlossen</option>
										</select>
									</div>

									<div className="p-4">
										<button
											type="submit"
											onClick={handleSubmit}
											className="block w-full bg-indigo-700 text-white rounded-md py-3 px-6"
										>
											Auftrag aktualisieren
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

export default JobEditPage;
