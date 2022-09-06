import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../../components/ActivityIndicator";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useFetch } from "../../../hooks/useFetch";

const TableRow = ({ index, id, name, email, role }) => {
	return (
		<tr className={index % 2 === 0 ? null : "bg-gray-50"}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="flex-shrink-0 text-sm">{id}</div>
					<div className="ml-4">
						<div className="text-sm font-medium text-gray-900">{name}</div>
						<div className="text-sm text-gray-500">{email}</div>
					</div>
				</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				{role === "admin" ? (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
						{role}
					</span>
				) : (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
						{role}
					</span>
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
		</tr>
	);
};

function UserPage() {
	const [endpoint, setEndpoint] = useState("/api/user");
	const { loading, data, error } = useFetch({ endpoint });

	return (
		<div className="border border-slate-300 rounded-lg  mx-auto bg-white">
			<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
				<div>
					<h2 className="text-xl">Benutzer</h2>
					<p className="text-slate-400">Übersicht aller registrierter Benutzer</p>
				</div>
				<Link to="/settings/user/create">
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
						Benutzer anlegen
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
					{data.data.length ? (
						<>
							<Table head={["ID & Benutzer", "Benutzerrolle"]}>
								{data.data.map((link, i) => (
									<TableRow key={i} index={i} {...link} />
								))}
							</Table>

							<div className="p-4">
								<Pagination
									{...data}
									type="Benutzer"
									onClick={(url) => setEndpoint(`/api/booking?${url.split("?")[1]}`)}
								/>
							</div>
						</>
					) : (
						<img src="/empty.jpg" className="mx-auto" />
					)}
				</div>
			)}
		</div>
	);
}

export default UserPage;
