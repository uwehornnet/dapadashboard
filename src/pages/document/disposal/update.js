import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { useFetch } from "../../../hooks/useFetch";
import { baseURI } from "../../../utils/baseURI";

let formValues = {
	status: "",
	type: "Verwertung",
	uid: "",
	betriebsnummer: "M57AVW045",
	date: "",
	file: "",
	fahrzeughalter: {
		name: "",
		strasse: "",
		nr: "",
		plz: "",
		ort: "",
	},
	fahrzeug: {
		klasse: "",
		marke: "",
		modell: "",
		identnummer: "",
		kennzeichen: "",
		zulassung: "",
		gewicht: "",
	},
	annahme: {
		name: "",
		strasse: "",
		nr: "",
		plz: "",
		ort: "",
		telefon: "",
		fax: "",
		anerkannt: {
			name: "",
			strasse: "",
			nr: "",
			plz: "",
			ort: "",
			telefon: "",
			fax: "",
		},
	},
	demontage: {
		name: "DAPA GmbH",
		strasse: "Kranichblick",
		nr: "32",
		plz: "18442",
		ort: "Duvendiek",
		telefon: "038321-363",
		fax: "038321-66475",
		anerkannt: {
			name: "TOS J.Spilgies",
			strasse: "Sanitzer Str.",
			nr: "22b",
			plz: "18190",
			ort: "Reppelin",
			telefon: "038209-82096",
			fax: "038209-82095",
		},
		behoerde: {
			name: "STAUN",
			strasse: "Badenstr.",
			nr: "18",
			plz: "18439",
			ort: "Stralsund",
		},
	},
};

const DisposalUpdatePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [initialValues, setInitialValues] = useState(formValues);

	const [submitting, isSubmitting] = useState(false);
	const [disabled, setDiabled] = useState(false);
	const [entry, setEntry] = useState(null);
	const { loading, data: disposal, error } = useFetch({ endpoint: `/api/document/${id}` });

	const handleFormSubmit = async (values) => {
		try {
			if (submitting) {
				return;
			}
			isSubmitting(true);
			// create contact
			const customerReq = await fetch(`${baseURI}/api/customer/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: `${values.annahme.name}`,
					address: `${values.annahme.strasse} ${values.annahme.nr}, ${values.annahme.plz} ${values.annahme.ort}`,
				}),
			});
			const customerRes = await customerReq.json();
			const customer = customerRes.data;

			// create document
			const payload = {
				type: values.type,
				status: values.status,
				uid: values.uid,
				entry: values.entry,
				customer: customer.id,
				data: {
					betriebsnummer: values.betriebsnummer,
					fahrzeughalter: values.fahrzeughalter,
					fahrzeug: values.fahrzeug,
					annahme: values.annahme,
					demontage: values.demontage,
				},
			};
			const beleg = await fetch(`${baseURI}/api/document/update/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			}).then((res) => res.json());

			window.alert(`Verwertungsbeleg ${beleg.data.uid} wurde aktualisiert.`);
			isSubmitting(false);
			navigate("/document");
		} catch (err) {
			console.log(err);
			isSubmitting(false);
		}
	};

	const fetchInvoiceAsync = async () => {
		try {
			const req = await fetch(`${baseURI}/api/document/${id}`);
			const res = await req.json();
			const data = JSON.parse(res.data.invoice.items);

			setInitialValues({
				status: res.data.invoice.status,
				type: res.data.invoice.type,
				uid: res.data.invoice.uid,
				betriebsnummer: data.betriebsnummer,
				date: res.data.invoice.date,
				file: res.data.invoice.file,
				entry: res.data.invoice.entry,
				fahrzeughalter: {
					...data.fahrzeughalter,
				},
				fahrzeug: {
					...data.fahrzeug,
				},
				annahme: {
					...data.annahme,
				},
				demontage: {
					...data.demontage,
				},
			});
			setEntry(JSON.parse(res.data.entry.data));
			setDiabled(res.data.invoice.status === "saved");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchInvoiceAsync();
	}, [disposal]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleFormSubmit} enableReinitialize>
			{({ handleSubmit, setValues, values, setErrors, errors }) => (
				<div className="w-full h-full flex flex-col justify-start">
					<div className="p-4 flex-1">
						<div className="w-full bg-white flex-1 h-full mx-auto max-w-[1024px] shadow-lg border border-zinc-200 rounded-lg">
							{/** Dokumentendetails */}
							<div className="w-full border-b border-dashed border-neutral-300 p-4 bg-zinc-100">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Dokumentendetails
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
									<div className="col-span-1">
										<h1 className="text-2xl">Verwertungsbeleg</h1>
										<p className="text-xs">Erstelle einen neuen Verwertungsbeleg</p>
									</div>
									<div className="col-span-1">
										<label className="text-sm  block">Status</label>
										<select
											name="status"
											id="status"
											value={values.status}
											disabled={values.status === "saved"}
											onChange={(e) => {
												setValues({ ...values, status: e.target.value });
											}}
											className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
										>
											<option value="preview">Entwurf</option>
											<option value="saved">Festgeschrieben</option>
										</select>
									</div>
								</div>
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
												disabled={values.status === "saved"}
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
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm  block mt-2">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
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
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1 max-w-[80px]">
												<label className="text-sm  block mt-2">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
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
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
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
														disabled={values.status === "saved"}
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
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm  block mt-2">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
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
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-span-1">
										<div className="col-span-1">
											<label className="text-sm  block mt-2">lfd. Nr.</label>
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.uid}
												onChange={(e) => setValues({ ...values, uid: e.target.value })}
												className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="col-span-1">
											<label className="text-sm  block mt-2">Datum</label>
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.date}
												onChange={(e) => setValues({ ...values, date: e.target.value })}
												className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
								</div>
							</div>
							{/** Angaben zum Fahrzeug */}
							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Angaben zum Fahrzeug
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
									<div className="col-span-1">
										<label className="text-sm  block mt-2">Fahrzeugklasse</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.klasse}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, klasse: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Fahrzeugmarke</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.marke}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, marke: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Fahrzeugmodell</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.modell}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, modell: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Fahrzeugidentnummer</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.identnummer}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, identnummer: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
									<div className="col-span-1">
										<label className="text-sm  block mt-2">letztes amtliches Kennzeichen</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.kennzeichen}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, kennzeichen: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Tag der ersten Zulassung</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.zulassung}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, zulassung: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Fahrzeugleergewicht</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.fahrzeug.gewicht}
												onChange={(e) =>
													setValues({
														...values,
														fahrzeug: { ...values.fahrzeug, gewicht: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
								</div>
							</div>
							{/** Angaben zur Annahme-/Rücknahmestelle */}
							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Angaben zur Annahme-/Rücknahmestelle
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
									<div className="col-span-1">
										<label className="text-sm  block mt-2">Name, Vorname</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.annahme.name}
												onChange={(e) =>
													setValues({
														...values,
														annahme: { ...values.annahme, name: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm  block mt-2">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.annahme.strasse}
														onChange={(e) =>
															setValues({
																...values,
																annahme: { ...values.annahme, strasse: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1 max-w-[80px]">
												<label className="text-sm  block mt-2">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.annahme.nr}
														onChange={(e) =>
															setValues({
																...values,
																annahme: { ...values.annahme, nr: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
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
														disabled={values.status === "saved"}
														value={values.annahme.plz}
														onChange={(e) =>
															setValues({
																...values,
																annahme: { ...values.annahme, plz: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm  block mt-2">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.annahme.ort}
														onChange={(e) =>
															setValues({
																...values,
																annahme: { ...values.annahme, ort: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<label className="text-sm  block mt-2">Telefon</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.annahme.telefon}
												onChange={(e) =>
													setValues({
														...values,
														annahme: { ...values.annahme, telefon: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Fax</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.annahme.fax}
												onChange={(e) =>
													setValues({
														...values,
														annahme: { ...values.annahme, fax: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
									<div className="col-span-1">
										<label className="text-sm  block mt-2">Anerkannt von: Name</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.annahme.anerkannt.name}
												onChange={(e) =>
													setValues({
														...values,
														annahme: {
															...values.annahme,
															anerkannt: {
																...values.annahme.anerkannt,
																name: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm  block mt-2">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.annahme.anerkannt.strasse}
														onChange={(e) =>
															setValues({
																...values,
																annahme: {
																	...values.annahme,
																	anerkannt: {
																		...values.annahme.anerkannt,
																		strasse: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1 max-w-[80px]">
												<label className="text-sm  block mt-2">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.annahme.anerkannt.nr}
														onChange={(e) =>
															setValues({
																...values,
																annahme: {
																	...values.annahme,
																	anerkannt: {
																		...values.annahme.anerkannt,
																		nr: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
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
														disabled={values.status === "saved"}
														value={values.annahme.anerkannt.plz}
														onChange={(e) =>
															setValues({
																...values,
																annahme: {
																	...values.annahme,
																	anerkannt: {
																		...values.annahme.anerkannt,
																		plz: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm  block mt-2">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.annahme.anerkannt.ort}
														onChange={(e) =>
															setValues({
																...values,
																annahme: {
																	...values.annahme,
																	anerkannt: {
																		...values.annahme.anerkannt,
																		ort: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<label className="text-sm  block mt-2">Telefon</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.annahme.anerkannt.telefon}
												onChange={(e) =>
													setValues({
														...values,
														annahme: {
															...values.annahme,
															anerkannt: {
																...values.annahme.anerkannt,
																telefon: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm  block mt-2">Fax</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.annahme.anerkannt.fax}
												onChange={(e) =>
													setValues({
														...values,
														annahme: {
															...values.annahme,
															anerkannt: {
																...values.annahme.anerkannt,
																fax: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
								</div>
							</div>
							{/** Angaben zum Demontagebetrieb */}
							<div className="w-full p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Angaben zum Demontagebetrieb
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
									<div className="col-span-1">
										<label className="text-sm block mt-2">Name, Vorname</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.name}
												onChange={(e) =>
													setValues({
														...values,
														demontage: {
															...values.demontage,
															name: e.target.value,
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm block mt-2">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.strasse}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	strasse: e.target.value,
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1 max-w-[80px]">
												<label className="text-sm  mt-2 block">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.nr}
														onChange={(e) =>
															setValues({
																...values,
																demontage: { ...values.demontage, nr: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm mt-2 block">PLZ</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.plz}
														onChange={(e) =>
															setValues({
																...values,
																demontage: { ...values.demontage, plz: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm mt-2 block">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.ort}
														onChange={(e) =>
															setValues({
																...values,
																demontage: { ...values.demontage, ort: e.target.value },
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<label className="text-sm mt-2 block">Telefon</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.telefon}
												onChange={(e) =>
													setValues({
														...values,
														demontage: { ...values.demontage, telefon: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm mt-2 block">Fax</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.fax}
												onChange={(e) =>
													setValues({
														...values,
														demontage: { ...values.demontage, fax: e.target.value },
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
									<div className="col-span-1">
										<label className="text-sm mt-2 block">
											Anerkannt durch Sachverständigen: Name
										</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.anerkannt.name}
												onChange={(e) =>
													setValues({
														...values,
														demontage: {
															...values.demontage,
															anerkannt: {
																...values.demontage.anerkannt,
																name: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm mt-2 block">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.anerkannt.strasse}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	anerkannt: {
																		...values.demontage.anerkannt,
																		strasse: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1 max-w-[80px]">
												<label className="text-sm mt-2 block">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.anerkannt.nr}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	anerkannt: {
																		...values.demontage.anerkannt,
																		nr: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm mt-2 block">PLZ</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.anerkannt.plz}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	anerkannt: {
																		...values.demontage.anerkannt,
																		plz: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm mt-2 block">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.anerkannt.ort}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	anerkannt: {
																		...values.demontage.anerkannt,
																		ort: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<label className="text-sm mt-2 block">Telefon</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.anerkannt.telefon}
												onChange={(e) =>
													setValues({
														...values,
														demontage: {
															...values.demontage,
															anerkannt: {
																...values.demontage.anerkannt,
																telefon: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<label className="text-sm mt-2 block">Fax</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.anerkannt.fax}
												onChange={(e) =>
													setValues({
														...values,
														demontage: {
															...values.demontage,
															anerkannt: {
																...values.demontage.anerkannt,
																fax: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
									</div>
									<div className="col-span-1">
										<label className="text-sm mt-2 block">
											Für den Demontagebetrieb zuständige Genehmigungsbehörde
										</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												disabled={values.status === "saved"}
												value={values.demontage.behoerde.name}
												onChange={(e) =>
													setValues({
														...values,
														demontage: {
															...values.demontage,
															behoerde: {
																...values.demontage.behoerde,
																name: e.target.value,
															},
														},
													})
												}
												className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
											/>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm mt-2 block">Strasse</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.behoerde.strasse}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	behoerde: {
																		...values.behoerde.anerkannt,
																		strasse: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1 max-w-[80px]">
												<label className="text-sm mt-2 block">Nr.</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.behoerde.nr}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	behoerde: {
																		...values.demontage.behoerde,
																		nr: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
										<div className="flex gap-4">
											<div className="flex-1">
												<label className="text-sm mt-2 block">PLZ</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.behoerde.plz}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	behoerde: {
																		...values.demontage.behoerde,
																		plz: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
											<div className="flex-1">
												<label className="text-sm mt-2 block">Ort</label>
												<div className="flex items-center border border-neutral-200 rounded-sm">
													<input
														type="text"
														disabled={values.status === "saved"}
														value={values.demontage.behoerde.ort}
														onChange={(e) =>
															setValues({
																...values,
																demontage: {
																	...values.demontage,
																	behoerde: {
																		...values.demontage.behoerde,
																		ort: e.target.value,
																	},
																},
															})
														}
														className="p-2 bg-white block w-full focus:ring-0 focus:outline-none disabled:cursor-not-allowed disabled:text-zinc-300"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full p-4 border-t border-slate-300 flex items-center justify-end">
								<button
									type="submit"
									disabled={values.status === "saved"}
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
		</Formik>
	);
};

export default DisposalUpdatePage;
