import { useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../../components/ActivityIndicator";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useFetch } from "../../../hooks/useFetch";

const TableRow = ({ index, id, name, zip_code, city, address }) => {
	return (
		<tr className={index % 2 === 0 ? null : "bg-gray-50"}>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm font-medium text-gray-900">{id}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm font-medium text-gray-900">{name}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{address}</div>
				<div className="text-sm text-gray-900">{`${zip_code} ${city}`}</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"></td>
		</tr>
	);
};

const Locations = () => {
	const [endpoint, setEndpoint] = useState(`/api/location`);
	const { loading, error, data } = useFetch({ endpoint });
	return (
		<div className="border border-slate-300 rounded-lg  mx-auto bg-white">
			<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
				<div>
					<h2 className="text-xl">Standorte</h2>
					<p className="text-slate-400">Ändere deine Benutzereinstellungen</p>
				</div>

				<Link to="/settings/location/create">
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
						neuer Standort
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
							<Table head={["ID", "Name", "Adresse"]} className="sm:rounded-0">
								{data.data.map((entry, i) => (
									<TableRow key={i} index={i} {...entry} />
								))}
							</Table>

							<div className="p-4">
								<Pagination
									{...data}
									type="Standorte"
									onClick={(url) => setEndpoint(`/api/location?${url.split("?")[1]}`)}
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
};

export default Locations;
