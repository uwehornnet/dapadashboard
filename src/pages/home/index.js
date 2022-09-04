import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";

const TableRow = ({ index, id, data, status }) => {
	const navigate = useNavigate();
	const { kennzeichen, hersteller, typ, kraftstoff, standort } = data ? JSON.parse(data) : {};
	return (
		<tr className={index % 2 === 0 ? null : "bg-gray-50"}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="flex-shrink-0 text-sm">{id}</div>
				</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{kennzeichen || "-"}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{`${hersteller || "-"} ${typ || ""}`}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{kraftstoff || "-"}</div>
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
				<span
					className="cursor-pointer hover:text-slate-900"
					onClick={() => navigate(`/invoice/create?entry=${id}`)}
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
				</span>
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
	const [endpoint, setEndpoint] = useState(`/api/entry`);
	const { loading, error, data } = useFetch({ endpoint });

	return (
		<div className="p-4">
			<div className="border border-slate-300 rounded-lg  mx-auto bg-white">
				<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
					<div>
						<h2 className="text-xl">Dashboard</h2>
						<p className="text-slate-400">Übersicht aller Autos</p>
					</div>
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
							neuer Eintrag
						</button>
					</Link>
				</div>
				{loading ? (
					<div className="p-8">
						<ActivityIndicator />
					</div>
				) : error ? (
					<div>{JSON.stringify(error)}</div>
				) : (
					<div>
						<Table head={["ID", "Kennzeichen", "Hersteller/Typ", "Kraftstoff", "Standort", "Status"]}>
							{data.data.map((entry, i) => (
								<TableRow key={i} index={i} {...entry} />
							))}
						</Table>

						<div className="p-4">
							<Pagination
								{...data}
								type=""
								onClick={(url) => setEndpoint(`/api/files?${url.split("?")[1]}`)}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default HomePage;
