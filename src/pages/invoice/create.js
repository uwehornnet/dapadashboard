import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { useFetch } from "../../hooks/useFetch";
import { baseURI } from "../../utils/baseURI";

const INITIAL_VALUES = {
	customer: "",
	address: "",
	subject: "",
	uid: "",
	date: "",
	headText: "",
	footText: "",
	items: [
		{
			position: "",
			qty: 1,
			price: 0,
			total: 0,
			description: "",
		},
	],
	total: 0,
	tax: 0,
	netto: 0,
};

const InvoiceCreatePage = () => {
	const [submitting, isSubmitting] = useState(false);
	const [endpoint, setEndpoint] = useState("/api/location");
	const { loading, data, error } = useFetch({ endpoint });

	const handleFormSubmit = async (values) => {
		try {
			if (submitting) {
				return;
			}
			isSubmitting(true);
			// create contact
			const customer = await fetch(`${baseURI}/api/customer/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: values.customer,
					address: values.address,
				}),
			}).then((res) => res.json());

			// create document

			const invoice = await fetch(`${baseURI}/api/invoice/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					customer: customer.id,
					subject: values.subject,
					uid: values.uid,
					date: values.date,
					headText: values.headText,
					footText: values.footText,
					items: values.items,
					total: values.total,
					tax: values.tax,
				}),
			}).then((res) => res.json());

			window.alert(`Rechnung ${invoice.uid} wurde erstellt.`);
			isSubmitting(false);
		} catch (err) {
			console.log(err);
			isSubmitting(false);
		}
	};

	return (
		<Formik initialValues={INITIAL_VALUES} onSubmit={handleFormSubmit}>
			{({ handleSubmit, setValues, values, setErrors, errors }) => (
				<div className="w-full h-full flex flex-col justify-start">
					<div className="p-4 bg-white sticky top-0 self-start  w-full flex items-center justify-between">
						<ul className="flex items-center justify-start gap-4 text-slate-600 text-sm">
							<li>
								<Link to="/invoice">
									<span className="text-slate-600 flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
											/>
										</svg>
										Rechnungen
									</span>
								</Link>
							</li>
							<li>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={4}
									stroke="currentColor"
									className="w-2 h-2"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
								</svg>
							</li>
							<li>
								<span className="text-slate-300">Rechnung erstellen</span>
							</li>
						</ul>
						<ul className="flex items-center justify-end text-sm space-x-6">
							<li>
								<span
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
									Als Entwurf speichern
								</span>
							</li>
						</ul>
					</div>
					<div className="p-4 flex-1">
						<div className="w-full bg-white flex-1 h-full mx-auto max-w-[1024px] shadow-lg border border-zinc-200 rounded-lg">
							<div className="w-full border-b border-dashed border-neutral-300 p-4">
								<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
									Kontakt- und Dokumentinformationen
								</span>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16">
									<div className="col-span-1">
										<label className="text-sm mb-2 block">Kunde</label>
										<input
											type="text"
											value={values.customer}
											onChange={(e) => setValues({ ...values, customer: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>
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
										<input
											type="text"
											value={values.subject}
											onChange={(e) => setValues({ ...values, subject: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>

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
																tax: t * 1.19 - t,
																netto: t * 1.19,
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
																tax: t * 1.19 - t,
																netto: t * 1.19,
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
																tax: t * 1.19 - t,
																netto: t * 1.19,
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
									<p>{values.tax.toFixed(2)} Euro</p>
								</div>
								<div className="flex items-center justify-between p-3 text-lg font-medium">
									<p>Gesamt</p>
									<p>{values.netto.toFixed(2)} Euro</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default InvoiceCreatePage;
