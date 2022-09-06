import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import ActivityIndicator from "../../components/ActivityIndicator";
import { baseURI } from "../../utils/baseURI";
import { status } from "../../utils/config";

const initialValues = {
	status: "",
	standort: "",
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
	file: null,
};

function EntryCreatePage() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [locations, setLocations] = useState([]);

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

			const req = await fetch(`${baseURI}/api/entry/create/`, {
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
							<div className="flex w-full flex-col lg:flex-row gap-8">
								<div className="flex-1 p-8 lg:sticky lg:top-16 lg:self-start">
									<label className="text-sm mb-2 block">Upload</label>
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
											}}
											className="form-control hidden"
										/>
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
									</label>
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
											<option value="" disabled>
												Bitte wählen
											</option>
											{locations.map((location) => (
												<option value={location.id} key={location.id}>
													{location.name}
												</option>
											))}
										</select>
									</div>
									<div className="p-4 border-b border-dashed border-slate-300">
										<span className="bg-zinc-200 p-1 text-zinc-600 text-xs mb-6 inline-block">
											Status
										</span>
										<select
											name="status"
											id="status"
											value={values.status}
											onChange={(e) => {
												setValues({ ...values, status: e.target.value });
											}}
											className="p-2 bg-transparent border border-neutral-200 block w-full rounded-sm focus:ring-0 focus:outline-none"
										>
											<option value="" disabled>
												Bitte wählen
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
										<button
											onClick={handleSubmit}
											className="mt-8 px-4 py-3 bg-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-indigo-100 hover:shadow-lg shadow-sm rounded-md cursor-pointer flex items-center space-x-4"
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
						)}
					</>
				)}
			</Formik>
		</div>
	);
}

export default EntryCreatePage;
