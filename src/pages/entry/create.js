import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import ActivityIndicator from "../../components/ActivityIndicator";
import { baseURI } from "../../utils/baseURI";
import { status } from "../../utils/config";

const initialValues = {
	besteuerung: "",
	status: "",
	standort: "",
	fahrzeughalter: {
		name: "",
		strasse: "",
		nr: "",
		plz: "",
		ort: "",
	},
	fahrzeug: {
		kennzeichen: "",
		zulassung: "",
		identnummer: "",
		marke: "",
		modell: "",
		kraftstoff: "",
		hubraum: "",
		leistung: "",
		gewicht: "",
		kfzbrief: "",
	},
	checkliste: {
		zib1: false,
		zib2: false,
		schluessel: 0,
		serviceheft: false,
	},
	file: null,
};

function EntryCreatePage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [locations, setLocations] = useState([]);

	const [filename, setFilename] = useState("");

	const handleSubmitAsync = async (values) => {
		try {
			if (loading) return;
			setLoading(true);

			let filename = "";
			let path = "";
			if (values.file) {
				const formData = new FormData();
				formData.append("file", values.file);

				const uploadReq = await fetch(`${baseURI}/api/entry/upload`, {
					method: "POST",
					body: formData,
				});
				const uploadRes = await uploadReq.json();
				if (!uploadRes.ok) {
					setError(uploadRes.data);
				}

				filename = uploadRes.data.filename;
				path = uploadRes.data.path;
			}

			const formData = new FormData();
			formData.append("data", JSON.stringify(values));
			formData.append("filename", filename);
			formData.append("path", path);
			formData.append("location", values.standort);
			formData.append("status", values.status);

			const jsonValues = JSON.stringify({
				data: values,
				filename,
				path,
				location: values.standort,
				status: values.status,
			});

			const req = await fetch(`${baseURI}/api/entry/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: values,
					filename,
					path,
					location: values.standort,
					status: values.status,
				}),
			});
			const res = await req.json();

			if (res.ok) {
				return navigate(`/`);
			}

			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const req = await fetch(`${baseURI}/api/location`);
				const res = await req.json();
				setLocations(res.data.data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<div className="w-full h-full">
			<Formik initialValues={initialValues} onSubmit={handleSubmitAsync} enableReinitialize>
				{({ handleSubmit, setValues, values }) => (
					<>
						{loading ? (
							<ActivityIndicator />
						) : error ? (
							<div className="p-8">
								<h2>Upppps, Error occured</h2>
								<p>{JSON.stringify(error)}</p>
							</div>
						) : (
							<div className="w-full h-full flex flex-col justify-start">
								<div className="p-4 flex-1">
									<div className="w-full bg-white flex-1 h-full mx-auto max-w-[1024px] shadow-lg border border-zinc-200 rounded-lg">
										{/** Dokumentendetails */}
										<div className="w-full border-b border-dashed border-neutral-300 p-4 bg-zinc-100">
											<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
												Details
											</span>
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
												<div className="col-span-1">
													<h1 className="text-2xl">Fahrzeugdaten</h1>
													<p className="text-xs">
														Lege ein neues Fahrzeug in der Datenbank an.
													</p>
												</div>
												<div className="col-span-1">
													<label className="text-sm  block">Status</label>
													<select
														name="status"
														id="status"
														value={values.status}
														onChange={(e) => {
															setValues({ ...values, status: e.target.value });
														}}
														className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
													>
														<option value="" disabled>
															Bitte wählen
														</option>
														{status.map((state) => (
															<option value={state}>{state}</option>
														))}
													</select>
												</div>
											</div>
											<div className="col-span-1 grid lg:grid-cols-2 gap-6 lg:gap-16 mt-8">
												<div>
													<label className="text-sm  block">Standort</label>
													<select
														name="standort"
														id="standort"
														value={values.standort}
														onChange={(e) => {
															setValues({ ...values, standort: e.target.value });
														}}
														className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
													>
														<option value="" disabled>
															Bitte wählen
														</option>
														{locations &&
															locations.map((location) => (
																<option value={location.name} key={location.id}>
																	{location.name}
																</option>
															))}
													</select>
												</div>
												<div>
													<label className="text-sm  block">Besteuerung</label>
													<select
														name="besteuerung"
														id="besteuerung"
														value={values.besteuerung}
														onChange={(e) => {
															setValues({ ...values, besteuerung: e.target.value });
														}}
														className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
													>
														<option value="" disabled>
															Bitte wählen
														</option>
														<option value="differenzbesteuert">differenzbesteuert</option>
														<option value="regelbesteuert">regelbesteuert</option>
													</select>
												</div>
											</div>
										</div>
										{/** Fileupload */}
										<div className="w-full border-b border-dashed border-neutral-300 p-4">
											<label className="w-full min-h-[240px] h-[100%] bg-blue-100/50 rounded-md border-4 border-blue-900/60 border-dashed flex items-center justify-center cursor-copy">
												<input
													id="file"
													name="file"
													type="file"
													onChange={(e) => {
														setValues({
															...values,
															file: e.target.files[0],
														});
														setFilename(e.target.files[0].name);
													}}
													className="form-control hidden"
												/>
												{values.file ? (
													<span className="text-blue-900/60 tracking-widest font-medium flex items-center gap-4">
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
														{`speichern um ${values.file.name} hochzuladen`}
													</span>
												) : (
													<span className="text-blue-900/60 uppercase text-2xl tracking-widest font-medium flex items-center gap-4">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={2}
															stroke="currentColor"
															className="w-8 h-8"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
															/>
														</svg>
														upload file
													</span>
												)}
											</label>
										</div>

										{/** Angaben zum Fahrzeughalter */}
										<div className="w-full border-b border-dashed border-neutral-300 p-4">
											<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
												Angaben zum Fahrzeughalter
											</span>
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
												<div className="col-span-1">
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
													<div className="flex gap-4">
														<div className="flex-1">
															<label className="text-sm  block mt-2">Strasse</label>
															<div className="flex items-center border border-neutral-200 rounded-sm">
																<input
																	type="text"
																	value={values.fahrzeughalter.strasse}
																	onChange={(e) =>
																		setValues({
																			...values,
																			fahrzeughalter: {
																				...values.fahrzeughalter,
																				strasse: e.target.value,
																			},
																		})
																	}
																	className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
																/>
															</div>
														</div>
														<div className="flex-1 max-w-[80px]">
															<label className="text-sm  block mt-2">Nr.</label>
															<div className="flex items-center border border-neutral-200 rounded-sm">
																<input
																	type="text"
																	value={values.fahrzeughalter.nr}
																	onChange={(e) =>
																		setValues({
																			...values,
																			fahrzeughalter: {
																				...values.fahrzeughalter,
																				nr: e.target.value,
																			},
																		})
																	}
																	className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
																/>
															</div>
														</div>
													</div>
													<div className="flex gap-4">
														<div className="flex-1">
															<label className="text-sm  block mt-2">PLZ</label>
															<div className="flex items-center border border-neutral-200 rounded-sm">
																<input
																	type="text"
																	value={values.fahrzeughalter.plz}
																	onChange={(e) =>
																		setValues({
																			...values,
																			fahrzeughalter: {
																				...values.fahrzeughalter,
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
																	value={values.fahrzeughalter.ort}
																	onChange={(e) =>
																		setValues({
																			...values,
																			fahrzeughalter: {
																				...values.fahrzeughalter,
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
												<div className="col-span-1"></div>
											</div>
										</div>
										{/** Angaben zum Fahrzeug */}
										<div className="w-full p-4 border-b border-dashed border-neutral-300">
											<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
												Angaben zum Fahrzeug
											</span>
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
												<div className="col-span-1">
													<label className="text-sm  block mt-2">Fahrzeugmarke</label>
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
													<label className="text-sm  block mt-2">Fahrzeugmodell</label>
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
													<label className="text-sm  block mt-2">Hubraum</label>
													<div className="flex items-center border border-neutral-200 rounded-sm">
														<input
															type="text"
															value={values.fahrzeug.hubraum}
															onChange={(e) =>
																setValues({
																	...values,
																	fahrzeug: {
																		...values.fahrzeug,
																		hubraum: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
													<label className="text-sm  block mt-2">Leistung</label>
													<div className="flex items-center border border-neutral-200 rounded-sm">
														<input
															type="text"
															value={values.fahrzeug.leistung}
															onChange={(e) =>
																setValues({
																	...values,
																	fahrzeug: {
																		...values.fahrzeug,
																		leistung: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
												</div>
												<div className="col-span-1">
													<label className="text-sm  block mt-2">Fahrzeugleergewicht</label>
													<div className="flex items-center border border-neutral-200 rounded-sm">
														<input
															type="text"
															value={values.fahrzeug.gewicht}
															onChange={(e) =>
																setValues({
																	...values,
																	fahrzeug: {
																		...values.fahrzeug,
																		gewicht: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
													<label className="text-sm  block mt-2">Fahrzeugidentnummer</label>
													<div className="flex items-center border border-neutral-200 rounded-sm">
														<input
															type="text"
															value={values.fahrzeug.identnummer}
															onChange={(e) =>
																setValues({
																	...values,
																	fahrzeug: {
																		...values.fahrzeug,
																		identnummer: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
													<label className="text-sm  block mt-2">
														letztes amtliches Kennzeichen
													</label>
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
													<label className="text-sm  block mt-2">
														Tag der ersten Zulassung
													</label>
													<div className="flex items-center border border-neutral-200 rounded-sm">
														<input
															type="text"
															value={values.fahrzeug.zulassung}
															onChange={(e) =>
																setValues({
																	...values,
																	fahrzeug: {
																		...values.fahrzeug,
																		zulassung: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
													<label className="text-sm  block mt-2">KFZ Brief</label>
													<div className="flex items-center border border-neutral-200 rounded-sm">
														<input
															type="text"
															value={values.fahrzeug.kfzbrief}
															onChange={(e) =>
																setValues({
																	...values,
																	fahrzeug: {
																		...values.fahrzeug,
																		kfzbrief: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
												</div>
											</div>
										</div>
										{/** Checkliste */}
										<div className="w-full p-4">
											<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
												Checkliste
											</span>
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
												<div className="col-span-1">
													<label className="text-sm  block mt-2">Anzahl der Schlüssel</label>
													<div className="flex items-center border border-neutral-200 rounded-sm mb-6">
														<input
															type="text"
															value={values.checkliste.schluessel}
															onChange={(e) =>
																setValues({
																	...values,
																	checkliste: {
																		...values.checkliste,
																		schluessel: e.target.value,
																	},
																})
															}
															className="p-2 bg-white block w-full focus:ring-0 focus:outline-none"
														/>
													</div>
												</div>
												<div className="col-span-1 flex gap-6">
													<label className="text-sm  block mt-2">
														<input
															className="mr-2"
															type="checkbox"
															value={values.checkliste.zib1}
															onChange={(e) => {
																setValues({
																	...values,
																	checkliste: {
																		...values.checkliste,
																		zib1: e.target.checked,
																	},
																});
															}}
														/>
														ZIB 1
													</label>
													<label className="text-sm  block mt-2">
														<input
															className="mr-2"
															type="checkbox"
															value={values.checkliste.zib2}
															onChange={(e) => {
																setValues({
																	...values,
																	checkliste: {
																		...values.checkliste,
																		zib2: e.target.checked,
																	},
																});
															}}
														/>
														ZIB 2
													</label>
													<label className="text-sm  block mt-2">
														<input
															className="mr-2"
															type="checkbox"
															value={values.checkliste.serviceheft}
															onChange={(e) => {
																setValues({
																	...values,
																	checkliste: {
																		...values.checkliste,
																		serviceheft: e.target.checked,
																	},
																});
															}}
														/>
														Serviceheft
													</label>
												</div>
											</div>
										</div>

										<div className="w-full p-4 border-t border-slate-300 flex items-center justify-end">
											<button
												onClick={handleSubmit}
												className="px-4 py-3 bg-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-indigo-100 hover:shadow-lg shadow-sm rounded-md cursor-pointer flex items-center space-x-4"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="currentColor"
													className="w-5 h-5 mr-3"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
													/>
												</svg>
												speichern
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				)}
			</Formik>
		</div>
	);
}

export default EntryCreatePage;
