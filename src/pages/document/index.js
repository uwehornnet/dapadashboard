import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ActivityIndicator from "../../components/ActivityIndicator";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { baseURI } from "../../utils/baseURI";

const TableRow = ({ index, id, uid, total, customer, status, type }) => {
	const [endpoint, setEndpoint] = useState("");

	useEffect(() => {
		switch (type) {
			case "Rechnung":
				setEndpoint(`/document/invoice/update/${id}`);
				break;
			case "Gutschrift":
				setEndpoint(`/document/credit/update/${id}`);
				break;
			case "Verwertung":
				setEndpoint(`/document/disposal/update/${id}`);
				break;
			default:
				break;
		}
	}, [type, id]);

	return (
		<tr className={index % 2 === 0 ? null : "bg-gray-50"}>
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
				<div className="text-sm text-gray-500">{customer?.address}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-gray-900">{total ? `${total.toFixed(2)} EUR` : "-"}</div>
			</td>

			<td className="px-6 py-4 whitespace-nowrap">
				{type === "Gutschrift" ? (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
						{type}
					</span>
				) : (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
						{type}
					</span>
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				{status === "saved" ? (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
						festgeschrieben
					</span>
				) : (
					<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-100 text-zinc-600">
						Entwurf
					</span>
				)}
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end">
				<a
					href={`${baseURI}/api/document/pdf/${id}`}
					target="_blank"
					className="text-zinc-400 hover:text-indigo-900 hover:bg-zinc-100 p-2 rounded-md"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</a>
				<Link to={endpoint} className="text-zinc-400 hover:text-indigo-900 hover:bg-zinc-100 p-2 rounded-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
						/>
					</svg>
				</Link>
			</td>
		</tr>
	);
};

function InvoicePage() {
	const [endpoint, setEndpoint] = useState(`/api/document`);
	const { loading, error, data } = useFetch({ endpoint });
	console.log({ data });
	return (
		<div className="p-4">
			<div className="border border-slate-300 rounded-lg  mx-auto bg-white">
				<div className="p-4 border-b border-zinc-300 flex items-center justify-between">
					<div>
						<h2 className="text-xl">Dokumente</h2>
						<p className="text-slate-400">Übersicht aller Dokumente</p>
					</div>
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
								<Table head={["ID, Rechnungsnummer", "Kunde", "Betrag", "Typ", "Status"]}>
									{data.data.map((entry, i) => (
										<TableRow key={i} index={i} {...entry} />
									))}
								</Table>

								<div className="p-4">
									<Pagination
										{...data}
										type="Dokumente"
										onClick={(url) => setEndpoint(`/api/document?${url.split("?")[1]}`)}
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
	);
}

export default InvoicePage;
