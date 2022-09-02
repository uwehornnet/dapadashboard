import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";

import ActivityIndicator from "../../components/ActivityIndicator";
import { baseURI } from "../../utils/baseURI";
import { useFetch } from "../../hooks/useFetch";
import { locations, status } from "../../utils/config";

function EntryUpdatePage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { loading, error, data: file } = useFetch({ endpoint: `/api/file/${id}` });
	const [initialValues, setInitialValues] = useState({
		standort: "",
		status: "",
		kennzeichen: "",
		halter: "",
		zulassung: "",
		schluesselnummer: "",
		hersteller: "",
		typ: "",
		kraftstoff: "",
		hubraum: "",
		leistung: "",
		leergewicht: "",
		kfzbrief: "",
	});

	const handleSubmitAsync = async (values) => {
		const req = await fetch(`${baseURI}/api/file/update/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data: values }),
		});
		const res = await req.json();
	};

	useEffect(() => {
		if (file) {
			setInitialValues({ ...JSON.parse(file.data) });
		}
	}, [file]);

	return (
		<div className="w-full h-full">
			<Formik initialValues={initialValues} onSubmit={handleSubmitAsync} enableReinitialize>
				{({ handleSubmit, setValues, values }) => (
					<>
						<div className="p-4 bg-white sticky top-0 self-start  w-full flex items-center justify-between border-b border-slate-200">
							<ul className="flex items-center justify-start gap-4 text-slate-600 text-sm">
								<li>
									<Link to="/">
										<span className="text-slate-600 flex items-center gap-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={2}
												stroke="currentColor"
												className="w-4 h-4"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
												/>
											</svg>
											Dashboard
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
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8.25 4.5l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</li>
								<li>
									<span className="text-slate-300">Eintrag bearbeiten</span>
								</li>
							</ul>
							<ul className="flex items-center justify-end text-sm space-x-6">
								<li>
									<span
										onClick={async () => {
											const req = await fetch(`${baseURI}/api/file/delete/${id}`, {
												method: "GET",
												headers: {
													Accept: "application/json",
													"Content-Type": "application/json",
												},
											});
											const res = req.json();
											console.log(res);
											if (!res.ok) {
												window.alert("Upppps, da ist etwas schief gelaufen.");
											}
											navigate("/");
										}}
										className="px-4 py-3 text-slate-300 hover:text-slate-600 cursor-pointer flex items-center space-x-4"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5 mr-2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
										löschen
									</span>
								</li>
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
										speichern
									</span>
								</li>
							</ul>
						</div>
						{loading ? (
							<ActivityIndicator />
						) : (
							<div className="flex w-full flex-col lg:flex-row gap-8 bg-slate-50">
								<div className="flex-1 p-8 sticky top-16 self-start">
									<label className="text-sm mb-2 block">Upload</label>
									<div className="border border-zinc-200 p-4 flex items-center justify-center bg-white">
										<img
											src={`http://${file?.filename}`}
											alt={file?.filename}
											className="w-full h-auto 16/9"
										/>
									</div>
								</div>
								<div className="lg:w-[400px] border-l border-slate-300 bg-white">
									<div className="p-4 border-b border-dashed border-slate-300">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
											Standort
										</span>
										<select
											name="standort"
											id="standort"
											value={values.standort}
											onChange={(e) => {
												setValues({ ...values, standort: e.target.value });
											}}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										>
											<option value="Standort wählen" disabled>
												Standort wählen
											</option>
											{locations.map((l) => (
												<option value={l} key={l}>
													{l}
												</option>
											))}
										</select>
									</div>
									<div className="p-4 border-b border-dashed border-slate-300">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
											Status
										</span>
										<select
											name="statsu"
											id="status"
											value={values.status}
											onChange={(e) => {
												setValues({ ...values, status: e.target.value });
											}}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										>
											<option value="Standort wählen" disabled>
												Status wählen
											</option>
											{status.map((s) => (
												<option value={s} key={s}>
													{s}
												</option>
											))}
										</select>
									</div>
									<div className=" p-4">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
											KFZ & Zulassung
										</span>
										<label className="text-sm mb-2 block">Kennzeichen</label>
										<input
											type="text"
											value={values.kennzeichen}
											onChange={(e) => setValues({ ...values, kennzeichen: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>
										<label className="text-sm mb-2 mt-4 block">Halter</label>
										<textarea
											name="halter"
											id="halter"
											value={values.halter}
											onChange={(e) => setValues({ ...values, halter: e.target.value })}
											className="p-2 min-h-[100px] w-full border border-neutral-200 rounded-sm text-sm"
										></textarea>

										<label className="text-sm mb-2 mt-4 block">Zulassung</label>
										<input
											type="text"
											value={values.zulassung}
											onChange={(e) => setValues({ ...values, zulassung: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>

										<label className="text-sm mb-2 mt-4 block">Schlüsselnummer</label>
										<input
											type="text"
											value={values.schluesselnummer}
											onChange={(e) => setValues({ ...values, schluesselnummer: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>

										<div className="grid lg:grid-cols-2 gap-8">
											<div className="grid-cols-1">
												<label className="text-sm mb-2 mt-4 block">Hersteller</label>
												<input
													type="text"
													value={values.hersteller}
													onChange={(e) =>
														setValues({ ...values, hersteller: e.target.value })
													}
													className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
												/>
											</div>
											<div className="grid-cols-1">
												<label className="text-sm mb-2 mt-4 block">Typ</label>
												<input
													type="text"
													value={values.typ}
													onChange={(e) => setValues({ ...values, typ: e.target.value })}
													className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
												/>
											</div>
										</div>

										<label className="text-sm mb-2 mt-4 block">Kraftstoff</label>
										<input
											type="text"
											value={values.kraftstoff}
											onChange={(e) => setValues({ ...values, kraftstoff: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>

										<div className="grid lg:grid-cols-2 gap-8">
											<div className="grid-cols-1">
												<label className="text-sm mb-2 mt-4 block">Hubraum</label>
												<input
													type="text"
													value={values.hubraum}
													onChange={(e) => setValues({ ...values, hubraum: e.target.value })}
													className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
												/>
											</div>
											<div className="grid-cols-1">
												<label className="text-sm mb-2 mt-4 block">Leistung in KW</label>
												<input
													type="text"
													value={values.leistung}
													onChange={(e) => setValues({ ...values, leistung: e.target.value })}
													className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
												/>
											</div>
										</div>

										<label className="text-sm mb-2 mt-4 block">Leergewicht</label>
										<input
											type="text"
											value={values.leergewicht}
											onChange={(e) => setValues({ ...values, leergewicht: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>

										<label className="text-sm mb-2 mt-4 block">KFZ Brief</label>
										<input
											type="text"
											value={values.kfzbrief}
											onChange={(e) => setValues({ ...values, kfzbrief: e.target.value })}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										/>
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

export default EntryUpdatePage;
