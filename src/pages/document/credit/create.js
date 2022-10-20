import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useFetch } from "../../../hooks/useFetch";
import { baseURI } from "../../../utils/baseURI";

let formValues = {
	status: "",
	type: "Gutschrift",
	file: "",
	customerId: "",
	customer: "",
	address: "",
	subject: "",
	uid: "",
	date: "",
	headText:
		"Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihren Auftrag und das damit verbundene Vertrauen! Hiermit stelle ich Ihnen die folgenden Leistungen in Rechnung:",
	footText:
		"Bitte überweisen Sie den Rechnungsbetrag unter Angabe der Rechnungsnummer auf das unten angegebene Konto. Der Rechnungsbetrag ist sofort fällig.\n\nMit freundlichen Grüßen",
	items: [
		{
			position: "",
			qty: 1,
			price: 0,
			total: 0,
			description: "",
		},
	],
	besteuerung: "",
	total: 0,
	tax: 0,
	netto: 0,
};

const CreditCreatePage = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [entry, setEntry] = useState(null);
	const [modal, showModal] = useState(false);
	const [submitting, isSubmitting] = useState(false);
	const [initialValues, setInitialValues] = useState(formValues);
	const [besteuerung, setBesteuerung] = useState(null);
	const { loading, data: location, error } = useFetch({ endpoint: "/api/location" });
	const { loading: customerLoading, data: customer, error: customerError } = useFetch({ endpoint: "/api/customer" });

	const handleFormSubmit = async (values) => {
		try {
			if (submitting) {
				return;
			}
			isSubmitting(true);
			// create contact
			let customer;
			if (!values.customerId) {
				const customerReq = await fetch(`${baseURI}/api/customer/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: values.customer,
						address: values.address,
					}),
				});
				const customerRes = await customerReq.json();
				customer = customerRes.data.id;
			} else {
				customer = values.customerId;
			}

			// create document

			const invoice = await fetch(`${baseURI}/api/document/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customer: customer,
					type: values.type,
					besteuerung: values.besteuerung,
					subject: values.subject,
					uid: values.uid,
					date: values.date,
					headText: values.headText,
					footText: values.footText,
					items: values.items,
					total: values.total,
					tax: values.tax,
					entry: searchParams.get("entry"),
				}),
			}).then((res) => res.json());

			window.alert(`Rechnung wurde erstellt.`);
			isSubmitting(false);
			navigate("/document");
		} catch (err) {
			console.log(err);
			isSubmitting(false);
		}
	};

	const fetchFileAsync = async (id) => {
		const req = await fetch(`${baseURI}/api/entry/${id}`);
		const res = await req.json();
		const data = JSON.parse(res.data.data);

		setEntry(data);
		setInitialValues({
			...initialValues,
			besteuerung: data.besteuerung,
			file: id,
			footText: `${
				data.besteuerung === "regelbesteuert"
					? ""
					: "Dieser Umsatz unterliegt der Differenzbesteuerung nach §25a UStG.\n\n"
			}${initialValues.footText}`,
			items: [
				{
					qty: 1,
					price: 0,
					total: 0,
					position: `${data?.fahrzeug?.marke} ${data?.fahrzeug?.modell}`,
					description: `Hersteller: ${data?.fahrzeug?.marke}\nTyp: ${data?.fahrzeug?.modell}\nZulassung: ${data?.fahrzeug?.zulassung}\nSchlüsselnummer: ${data?.fahrzeug?.identnummer}\nKraftstoff: ${data?.fahrzeug?.kraftstoff}\nHubraum: ${data?.fahrzeug?.hubraum}\nLeistung: ${data?.fahrzeug?.leistung}\nLeergewicht: ${data?.fahrzeug?.gewicht}\nKFZ-Brief: ${data?.fahrzeug?.kfzbrief}`,
				},
			],
		});
		setBesteuerung(data.besteuerung);
	};

	useEffect(() => {
		if (searchParams.get("entry") && !entry) {
			fetchFileAsync(searchParams.get("entry"));
		}
	}, [searchParams]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleFormSubmit} enableReinitialize>
			{({ handleSubmit, setValues, values, setErrors, errors }) => (
				<div className="w-full h-full flex flex-col justify-start">
					{modal && (
						<div className="w-full h-full fixed top-0 left-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center">
							<div className="bg-white border-slate-300 rounded-md lg:w-[400px]">
								<div className="p-4 flex items-center justify-between border-b border-slate-300">
									<h2 className="text-xl font-semibold">Kunden suchen</h2>
									<span onClick={() => showModal(false)} className="cursor-pointer">
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
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</span>
								</div>
								<div className="p-4">
									<label className="text-sm mb-2 block">Kunde</label>
									<select
										name="type"
										id="type"
										value={values.customerId}
										onChange={(e) => {
											console.log({
												ev: e.target.value,
												customer: customer.data,
											});
											const selectedCustomer = customer.data.find((c) => c.id == e.target.value);
											setValues({
												...values,
												customerId: selectedCustomer.id,
												customer: selectedCustomer.name,
												address: selectedCustomer.address,
											});
										}}
										className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
									>
										<option value="">Kunde wählen</option>
										{customer.data.map((c) => (
											<option key={c.id} value={c.id}>
												{c.name}
											</option>
										))}
									</select>
								</div>
								<div className="p-4 border-t border-slate-300">
									<span
										className="w-full text-indigo-800 bg-indigo-300 p-4 text-center block font-medium uppercase text-xs tracking-wider cursor-pointer rounded-sm"
										onClick={() => showModal(false)}
									>
										übernehmen
									</span>
								</div>
							</div>
						</div>
					)}
					<div className="p-4 flex-1">
						<div className="w-full bg-white flex-1 h-full mx-auto max-w-[1024px] shadow-lg border border-zinc-200 rounded-lg">
							<div className="w-full border-b border-dashed border-neutral-300 p-4 bg-zinc-100">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Dokumentendetails
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
									<div className="col-span-1">
										<h1 className="text-2xl">Gutschrift</h1>
										<p className="text-xs">Erstelle eine neue Gutschrift</p>
									</div>
									<div className="col-span-1">
										<label className="text-sm mb-2 block">Status</label>
										<select
											name="status"
											id="status"
											value={values.status}
											onChange={(e) => {
												setValues({ ...values, status: e.target.value });
											}}
											className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										>
											<option value="preview">Entwurf</option>
											<option value="saved">Festgeschrieben</option>
										</select>

										<label className="text-sm mb-2 mt-4 block">Besteuerung</label>
										<select
											name="besteuerung"
											id="besteuerung"
											value={values.besteuerung}
											onChange={(e) => {
												setValues({ ...values, besteuerung: e.target.value });
												setBesteuerung(e.target.value);
											}}
											className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										>
											<option value="regelbesteuert">regelbesteuert</option>
											<option value="differenzbesteuert">differenzbesteuert</option>
										</select>
									</div>
								</div>
							</div>
							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Kontakt- und Dokumentinformationen
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
									<div className="col-span-1">
										<label className="text-sm mb-2 block">Kunde</label>
										<div className="flex items-center border border-neutral-200 rounded-sm">
											<input
												type="text"
												value={values.customer}
												onChange={(e) => setValues({ ...values, customer: e.target.value })}
												className="p-2 bg-transparent block w-full focus:ring-0 focus:outline-none"
											/>
											<span className="p-2 cursor-pointer" onClick={() => showModal(true)}>
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
														d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
													/>
												</svg>
											</span>
										</div>
										<label className="text-sm mb-2 mt-4 block">Anschrift</label>
										<textarea
											name="address"
											id="address"
											placeholder="Adresse"
											value={values.address}
											onChange={(e) => setValues({ ...values, address: e.target.value })}
											className="p-2 min-h-[100px] w-full border border-neutral-200 rounded-sm text-sm"
										></textarea>
									</div>
									<div className="col-span-1">
										<label className="text-sm mb-2 block">Betreff</label>
										<select
											name="status"
											id="status"
											value={values.subject}
											onChange={(e) => {
												setValues({ ...values, subject: e.target.value });
											}}
											className="p-2 bg-white border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										>
											<option value="Ankauf">Ankauf</option>
											<option value="Export">Export</option>
											<option value="Fuhrpark">Fuhrpark</option>
											<option value="Verkauf">Verkauf</option>
										</select>

										<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
											<div className="col-span-1">
												<label className="text-sm mb-2 block">Nummer</label>
												<input
													type="text"
													value={values.uid}
													onChange={(e) => setValues({ ...values, uid: e.target.value })}
													className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
												/>
											</div>
											<div className="col-span-1">
												<label className="text-sm mb-2 block">Leistungszeitraum</label>
												<input
													type="text"
													value={values.date}
													onChange={(e) => setValues({ ...values, date: e.target.value })}
													className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Kopftext
								</span>
								<textarea
									name="headtext"
									id="headtext"
									placeholder="Anschreiben"
									value={values.headText}
									onChange={(e) => setValues({ ...values, headText: e.target.value })}
									className="p-2 min-h-[100px] w-full border border-neutral-200 rounded-sm text-sm"
								></textarea>
							</div>

							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Produkte
								</span>
								<table className="w-full">
									<thead className=" text-xs tracking-wider">
										<tr>
											<th className="uppercase px-2 py-3 font-medium"></th>
											<th className="uppercase px-2 py-3 font-medium text-left">Position</th>
											<th className="uppercase px-2 py-3 font-medium text-left">Menge</th>
											<th className="uppercase px-2 py-3 font-medium text-left">Einzelpreis</th>
											<th className="uppercase px-2 py-3 font-medium text-right">Betrag</th>
											<th className="uppercase px-2 py-3 font-medium text-right"></th>
										</tr>
									</thead>
									<tbody>
										{values.items.map((item, index) => (
											<>
												<tr key={index} className="">
													<td className="p-2 w-[40px]">{index + 1}.</td>
													<td className="p-2 flex-1">
														<input
															type="text"
															className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
															value={item.position}
															onChange={(e) => {
																setValues({
																	...values,
																	items: [
																		...values.items.map((entry, i) => {
																			if (i === index) {
																				return {
																					...entry,
																					position: e.target.value,
																				};
																			}
																			return entry;
																		}),
																	],
																});
															}}
														/>
													</td>
													<td className="p-2 w-[100px]">
														<input
															type="number"
															min="0"
															className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
															value={item.qty}
															onBlur={(e) => {
																let t = 0;
																values.items.forEach((entry, i) => {
																	if (i === index) {
																		t += e.target.value * entry.price;
																	} else {
																		t += entry.qty * entry.price;
																	}
																});
																setValues({
																	...values,
																	items: [
																		...values.items.map((entry, i) => {
																			if (i === index) {
																				return {
																					...entry,
																					total: e.target.value * entry.price,
																				};
																			}
																			return entry;
																		}),
																	],
																	total: t,
																	tax:
																		besteuerung === "regelbesteuert"
																			? t * 1.19 - t
																			: 0,
																	netto:
																		besteuerung === "regelbesteuert"
																			? t * 1.19
																			: t * 1,
																});
															}}
															onChange={(e) => {
																setValues({
																	...values,
																	items: [
																		...values.items.map((entry, i) => {
																			if (i === index) {
																				return {
																					...entry,
																					qty: e.target.value,
																				};
																			}
																			return entry;
																		}),
																	],
																});
															}}
														/>
													</td>
													<td className="p-2 max-w-[100px]">
														<input
															type="number"
															className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
															value={item.price}
															onBlur={(e) => {
																let t = 0;
																values.items.forEach((entry, i) => {
																	if (i === index) {
																		t += e.target.value * entry.qty;
																	} else {
																		t += entry.price * entry.qty;
																	}
																});
																setValues({
																	...values,
																	items: [
																		...values.items.map((entry, i) => {
																			if (i === index) {
																				return {
																					...entry,
																					total: e.target.value * entry.qty,
																				};
																			}
																			return entry;
																		}),
																	],
																	total: t,
																	tax:
																		besteuerung === "regelbesteuert"
																			? t * 1.19 - t
																			: 0,
																	netto:
																		besteuerung === "regelbesteuert"
																			? t * 1.19
																			: t * 1,
																});
															}}
															onChange={(e) => {
																setValues({
																	...values,
																	items: [
																		...values.items.map((entry, i) => {
																			if (i === index) {
																				return {
																					...entry,
																					price: e.target.value,
																				};
																			}
																			return entry;
																		}),
																	],
																});
															}}
														/>
													</td>
													<td className="p-2 max-w-[80px]">
														<input
															type="text"
															disabled
															className="text-right p-2 w-full"
															value={`${item.total.toFixed(2)} EUR`}
														/>
													</td>
													<td>
														<span
															className="cursor-pointer text-blue-400 hover:text-blue-700"
															onClick={() => {
																let t = 0;
																values.items.forEach((entry, i) => {
																	if (i !== index) {
																		t += entry.total;
																	}
																});
																setValues({
																	...values,
																	items: values.items.filter((_, i) => i !== index),
																	total: t,
																	tax:
																		besteuerung === "regelbesteuert"
																			? t * 1.19 - t
																			: 0,
																	netto:
																		besteuerung === "regelbesteuert"
																			? t * 1.19
																			: t * 1,
																});
															}}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																strokeWidth={1.5}
																stroke="currentColor"
																className="w-5 h-5"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
																/>
															</svg>
														</span>
													</td>
												</tr>
												<tr>
													<td></td>
													<td colSpan={5} className="p-2">
														<textarea
															name="desription"
															id="desription"
															className="min-h-[160px] p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
															value={item.description}
															onChange={(e) =>
																setValues({
																	...values,
																	description: e.target.value,
																})
															}
														></textarea>
													</td>
												</tr>
											</>
										))}
									</tbody>
								</table>

								<button
									className="mt-8 text-blue-500 font-medium uppercase text-xs tracking-wider flex items-center space-x-6"
									onClick={() =>
										setValues({
											...values,
											items: [
												...values.items,
												{
													position: "",
													qty: 1,
													price: 0,
													total: 0,
													description: "",
												},
											],
										})
									}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-4 h-4"
									>
										<path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
									</svg>
									neue Position hinzfügen
								</button>
							</div>

							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">Fußtext</span>
								<textarea
									name="foottext"
									id="foottext"
									placeholder="Bemerkung"
									value={values.footText}
									onChange={(e) => setValues({ ...values, footText: e.target.value })}
									className="p-2 min-h-[100px] w-full border border-neutral-200 rounded-sm text-sm"
								></textarea>
							</div>

							<div className="w-full p-4">
								<div className="border-b border-neutral-300 flex items-center justify-between p-3">
									<p>Gesamtsumme Netto</p>
									<p>{values.total.toFixed(2)} Euro</p>
								</div>
								<div className="border-b border-neutral-300 flex items-center justify-between p-3">
									<p>Umsatzsteuer</p>
									<p>{besteuerung === "differenzbesteuert" ? "0.00" : values.tax.toFixed(2)} Euro</p>
								</div>

								<div className="flex items-center justify-between p-3 text-lg font-medium">
									<p>Gesamt</p>
									<p>
										{besteuerung === "differenzbesteuert"
											? values.total.toFixed(2)
											: values.netto.toFixed(2)}{" "}
										Euro
									</p>
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
		</Formik>
	);
};

export default CreditCreatePage;
