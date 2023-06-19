import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { baseURI } from "../../utils/baseURI";
import NewEntryModal from "../../components/Modal/NewEntryModal";

const TableRow = ({ index, id, data, invoice, setModalEntry }) => {
	const navigate = useNavigate();
	const { fahrzeug, status, standort } = data ? JSON.parse(data) : {};

	return (
		<tr className={index % 2 === 0 ? null : "bg-gray-50"}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="flex-shrink-0 text-sm">{id}</div>
				</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{fahrzeug?.kennzeichen || "-"}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{`${fahrzeug?.marke || "-"} ${fahrzeug?.modell || ""}`}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{fahrzeug?.kraftstoff || "-"}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{standort || "-"}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
					{status}
				</span>
			</td>

			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center space-x-4 text-slate-500">
				{status !== "Rechnung" && status !== "Verwertung" ? (
					<span className={`cursor-pointer hover:text-slate-900`} onClick={() => setModalEntry(id)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</span>
				) : (
					<a
						href={`${baseURI}/api/document/pdf/${invoice}`}
						target="_blank"
						className={`cursor-pointer hover:text-slate-900`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</a>
				)}
				<Link to={`/entry/update/${id}`}>
					<span className="cursor-pointer hover:text-slate-900">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					</span>
				</Link>
			</td>
		</tr>
	);
};

function HomePage() {
	const [modal, showModal] = useState(false);
	const [endpoint, setEndpoint] = useState(`/api/entry`);
	const { loading, error, data } = useFetch({ endpoint });
	const navigate = useNavigate();

	const handleModalClose = ({ endpoint }) => {
		navigate(endpoint);
	};

	return (
		<>
			<NewEntryModal visible={modal} onClose={handleModalClose} id={modal} onBack={() => showModal(false)} />
			<div className="p-4">
				<div className="border border-slate-300 rounded-lg  mx-auto bg-white">
					<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
						<div>
							<h2 className="text-xl">Dashboard</h2>
							<p className="text-slate-400">Übersicht aller Fahrzeuge</p>
						</div>

						{endpoint === `/api/entry/archive` ? (
							<div className="flex items-center justify-end">
								<span
									className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-6 py-3 rounded-lg"
									onClick={() => setEndpoint("/api/entry")}
								>
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
											d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
										/>
									</svg>
								</span>
							</div>
						) : (
							<div className="flex items-center justify-end">
								<span
									className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-6 py-3 rounded-lg"
									onClick={() => setEndpoint("/api/entry/archive")}
								>
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
											d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
										/>
									</svg>
									Archiv
								</span>
								<Link to="/entry/create">
									<button className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-6 py-3 rounded-lg">
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
												d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
											/>
										</svg>
										Fahrzeug anlegen
									</button>
								</Link>
							</div>
						)}
					</div>
					{loading ? (
						<div className="p-8">
							<ActivityIndicator />
						</div>
					) : error ? (
						<div>{JSON.stringify(error)}</div>
					) : (
						<div>
							{data.data.length ? (
								<>
									<Table
										head={[
											"ID",
											"Kennzeichen",
											"Hersteller/Typ",
											"Kraftstoff",
											"Standort",
											"Status",
										]}
									>
										{data.data.map((entry, i) => (
											<TableRow
												key={i}
												index={i}
												{...entry}
												setModalEntry={(id) => showModal(id)}
											/>
										))}
									</Table>

									<div className="p-4">
										<Pagination
											{...data}
											type=""
											onClick={(url) => setEndpoint(`/api/files?${url.split("?")[1]}`)}
										/>
									</div>
								</>
							) : (
								<img src="/empty.jpg" className="mx-auto" />
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default HomePage;
