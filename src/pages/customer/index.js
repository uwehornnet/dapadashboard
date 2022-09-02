import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";
import Inner from "../../components/Inner";

const TableRow = ({ index, id, uid, total, customer }) => {
	return (
		<tr className={index % 2 == 0 ? null : "bg-gray-50"}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="flex-shrink-0 text-sm">{id}</div>
					<div className="ml-4">
						<div className="text-sm font-medium text-gray-900">{uid}</div>
					</div>
				</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm font-medium text-gray-900">{customer?.name}</div>
				<div className="text-sm text-gray-500">{customer?.email}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{total}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				{index % 2 == 0 ? (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
						Buchung
					</span>
				) : (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-500">
						Reservierung
					</span>
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
		</tr>
	);
};

function CustomerPage() {
	const [endpoint, setEndpoint] = useState(`/api/customer`);
	const { loading, error, data } = useFetch({ endpoint });

	const innerRender = () => {
		return (
			<ul className="flex items-center justify-start gap-4 text-slate-600 text-sm">
				<li>
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
								strokeWidth={1.5}
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						Kunden
					</span>
				</li>
			</ul>
		);
	};

	return (
		<Inner render={innerRender}>
			<div className="border border-slate-300 rounded-lg  mx-auto bg-white">
				<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
					<div>
						<h2 className="text-xl">Kunden</h2>
						<p className="text-slate-400">Übersicht aller Kunden in der Datenbank</p>
					</div>
					<Link to="/customer/create">
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
							Kunden anlegen
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
						<Table head={["ID", "UID", "Kunde", "Betrag"]}>
							{data.data.map((entry, i) => (
								<TableRow key={i} index={i} {...entry} />
							))}
						</Table>

						<div className="p-4">
							<Pagination
								{...data}
								type="Kunden"
								onClick={(url) => setEndpoint(`/api/customer?${url.split("?")[1]}`)}
							/>
						</div>
					</div>
				)}
			</div>
		</Inner>
	);
}

export default CustomerPage;
