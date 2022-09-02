import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";

import ActivityIndicator from "../../components/ActivityIndicator";
import { baseURI } from "../../utils/baseURI";

const initialValues = {
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

	const handleSubmitAsync = async (values) => {
		if (loading) return;
		setLoading(true);

		let req;
		if (values.file) {
			const formData = new FormData();
			formData.append("file", values.file);

			const fileReq = await fetch(`${baseURI}/api/file/create`, {
				method: "POST",
				body: formData,
			});
			const fileRes = await fileReq.json();
			if (!fileRes.ok) {
				setError(fileRes.error);
			}
			req = await fetch(`${baseURI}/api/file/update/${fileRes.data.id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data: values }),
			});
		} else {
			req = await fetch(`${baseURI}/api/file/create/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data: values }),
			});
		}

		const res = await req.json();

		if (res.ok) {
			return navigate(`/entry/update/${res.data.id}`);
		}

		setLoading(false);
		setError(res.error);
	};

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
									<span className="text-slate-300">Eintrag erstellen</span>
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
										speichern
									</span>
								</li>
							</ul>
						</div>
						{loading ? (
							<ActivityIndicator />
						) : (
							<div className="flex w-full flex-col lg:flex-row p-8 gap-8">
								<div className="flex-1 flex flex-col">
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

								<div className="lg:w-[400px]">
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
												onChange={(e) => setValues({ ...values, hersteller: e.target.value })}
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
						)}
					</>
				)}
			</Formik>
		</div>
	);
}

export default EntryCreatePage;
