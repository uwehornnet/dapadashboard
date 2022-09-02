import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";

import ActivityIndicator from "../../components/ActivityIndicator";
import { baseURI } from "../../utils/baseURI";
import { useFetch } from "../../hooks/useFetch";
import { locations, status } from "../../utils/config";

function EntryUpdatePage() {
	const { id } = useParams();
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
		try {
			const req = await fetch(`${baseURI}/api/file/update/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data: values }),
			});
			const res = await req.json();
			console.log({ res });
		} catch (err) {
			console.log(err);
		}
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
						{loading ? (
							<ActivityIndicator />
						) : error ? (
							<div className="p-8">
								<h2>Upppps, Error occured</h2>
								<p>{JSON.stringify(error)}</p>
							</div>
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
