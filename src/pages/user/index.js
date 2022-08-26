import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import SearchForm from "../../components/SearchForm";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";

const TableRow = ({ index, id, name, email, role, location }) => {
	return (
		<tr className={index % 2 == 0 ? null : "bg-gray-50"}>
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
				<div className="text-sm text-gray-900">{location?.name}</div>
				<div className="text-sm text-gray-500">{location?.city}</div>
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
	const [filter, setFilter] = useState(false);

	return (
		<div className="w-full h-full">
			<div className="py-4 px-6 flex flex-row justify-between items-center bg-white sticky top-0 self-start">
				<ul className="flex items-center justify-start gap-4 text-slate-600 text-sm">
					<li>
						<span className="text-slate-600">Benutzer</span>
					</li>
				</ul>
				<div className="flex items-center space-x-6">
					<Link to="/user/create">
						<span className="flex items-center py-2 px-4 bg-indigo-100 rounded-lg cursor-pointer hover:bg-indigo-200 hover:text-indigo-600 text-indigo-400 shadow-sm">
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
							<span>neuer Benutzer</span>
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
						<Table head={["ID & Benutzer", "Standort", "Benutzerrolle"]}>
							{data.data.map((link, i) => (
								<TableRow key={i} index={i} {...link} />
							))}
						</Table>

						<Pagination
							{...data}
							type="Benutzer"
							onClick={(url) => setEndpoint(`/api/booking?${url.split("?")[1]}`)}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default UserPage;
