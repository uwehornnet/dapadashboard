function Pagination({ from, to, total, type, onClick, current_page, prev_page_url, next_page_url, path, links }) {
	return links.length ? (
		<div className="py-3 flex items-center justify-between">
			<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						<span className="font-medium">{from}</span> bis <span className="font-medium">{to}</span> von{" "}
						<span className="font-medium">{total}</span> {type}
					</p>
				</div>
				<div>
					<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
						<a
							href="#"
							onClick={() => {
								prev_page_url && onClick(prev_page_url);
							}}
							className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<span className="sr-only">zurück</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
						{links
							.filter((l) => !["pagination.previous", "pagination.next"].includes(l.label))
							.map((link, index) => (
								<a
									key={index}
									href="#"
									onClick={() => link.url && onClick(link.url)}
									aria-current="page"
									className={
										link.active
											? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative  items-center px-4 py-2 border text-sm font-medium hidden lg:inline-flex"
											: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative items-center px-4 py-2 border text-sm font-medium hidden lg:inline-flex"
									}
								>
									{link.label}
								</a>
							))}
						<a
							href="#"
							onClick={() => {
								next_page_url && onClick(next_page_url);
							}}
							className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
						>
							<span className="sr-only">nächste</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</nav>
				</div>
			</div>
		</div>
	) : null;
}

export default Pagination;
