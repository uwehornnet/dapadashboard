function Table({ head, children, noActions }) {
	return (
		<div className={`overflow-hidden overflow-x-auto `}>
			<table className="min-w-full divide-y divide-gray-200 border-b border-slate-300">
				<thead className="bg-slate-100">
					<tr>
						{head.map((key, index) => (
							<th
								key={index}
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{key}
							</th>
						))}
						{!noActions ? (
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only"></span>
							</th>
						) : null}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
			</table>
		</div>
	);
}

export default Table;
