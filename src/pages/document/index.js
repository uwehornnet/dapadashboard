import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import SearchForm from "../../components/SearchForm";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";

const TableRow = ({ index }) => {
	return (
		<tr className={index % 2 == 0 ? null : "bg-gray-50"}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="flex items-center">
					<div className="flex-shrink-0 text-sm">#123</div>
					<div className="ml-4">
						<div className="text-sm font-medium text-gray-900">Kundenname</div>
						<div className="text-sm text-gray-500">Zusatzinfo</div>
					</div>
				</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900"></div>
				<div className="text-sm text-gray-500"></div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900"></div>
				<div className="text-sm text-gray-500"></div>
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

function DocumentPage() {
	const [endpoint, setEndpoint] = useState(`/api/files`);
	const { loading, error, data } = useFetch({ endpoint });
	const [filter, setFilter] = useState(false);

	return (
		<div className="w-full h-full">
			<div className="flex flex-row justify-between items-center px-6 py-4 bg-white sticky top-0 self-start border-b border-neutral-200">
				<ul className="flex items-center justify-start gap-4 text-slate-600 text-sm">
					<li>
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
									d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
								/>
							</svg>
							Belege
						</span>
					</li>
				</ul>
				<div className="flex items-center space-x-6">
					<Link to="/upload/create">
						<span className="flex items-center py-2 px-4 bg-red-50 rounded-full cursor-pointer hover:bg-red-200 hover:text-red-600 text-red-400">
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
							<span>neuer Beleg</span>
						</span>
					</Link>
					<div className="relative">
						<span className="cursor-pointer" onClick={() => setFilter(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 text-red-600"
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
						<Table head={["ID", "Dateiname", "erstellt am"]}>
							{data.data.map((entry, i) => (
								<TableRow key={i} index={i} {...entry} />
							))}
						</Table>

						<Pagination
							{...data}
							type="Belege"
							onClick={(url) => setEndpoint(`/api/files?${url.split("?")[1]}`)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default DocumentPage;
