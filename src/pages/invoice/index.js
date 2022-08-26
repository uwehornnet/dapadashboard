import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import SearchForm from "../../components/SearchForm";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";

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

function InvoicePage() {
	const [endpoint, setEndpoint] = useState(`/api/invoice`);
	const { loading, error, data } = useFetch({ endpoint });
	const [filter, setFilter] = useState(false);

	return (
		<div className="w-full h-full">
			<div className="flex flex-row justify-between items-center sticky top-0 bg-white border-b border-neutral-200 py-4 px-6 ">
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
									strokeWidth={2}
									d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
								/>
							</svg>
							Rechnungen
						</span>
					</li>
				</ul>
				<div className="flex items-center space-x-6">
					<Link to="/invoice/create">
						<span className="flex items-center py-2 px-4 bg-indigo-200 rounded-lg shadow-sm cursor-pointer hover:bg-indigo-600 hover:text-indigo-100 text-indigo-600 text-sm uppercase font-medium">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 mr-2 "
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>neue Rechnung</span>
						</span>
					</Link>
					<div className="relative">
						<span className="cursor-pointer" onClick={() => setFilter(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-indigo-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
								/>
							</svg>
						</span>

						{filter && <SearchForm onClose={() => setFilter(false)} onSubmit={() => {}} />}
					</div>
				</div>
			</div>

			<div className="p-4">
				{loading ? (
					<ActivityIndicator />
				) : error ? (
					<div>{JSON.stringify(error)}</div>
				) : (
					<div>
						<Table head={["ID", "UID", "Kunde", "Betrag"]}>
							{data.data.map((entry, i) => (
								<TableRow key={i} index={i} {...entry} />
							))}
						</Table>

						<Pagination
							{...data}
							type="Rechnungen"
							onClick={(url) => setEndpoint(`/api/invoice?${url.split("?")[1]}`)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default InvoicePage;
