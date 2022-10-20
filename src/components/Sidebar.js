import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
	const { pathname } = useLocation();

	return (
		<div className="h-[100vh]">
			<div className="flex flex-col h-full justify-between">
				<ul className="list-none p-2 m-0 mb-6 text-rose-400 space-y-1">
					<li
						className={
							pathname === "/"
								? "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer text-rose-100 bg-rose-800"
								: "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer"
						}
					>
						<Link to="/">
							<span className=" flex flex-col items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 lg:mb-2 "
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
									/>
								</svg>
								<span className="hidden lg:block lg:uppercase lg:text-[10px]">Dashboard</span>
							</span>
						</Link>
					</li>

					<li
						className={
							pathname.includes("/document")
								? "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer text-rose-100 bg-rose-800"
								: "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer"
						}
					>
						<Link to="/document">
							<span className="flex flex-col items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 lg:mb-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
									/>
								</svg>
								<span className="hidden lg:block lg:uppercase lg:text-[10px]">Dokumente</span>
							</span>
						</Link>
					</li>
					<li
						className={
							pathname.includes("/customer")
								? "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer text-rose-100 bg-rose-800"
								: "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer"
						}
					>
						<Link to="/customer">
							<span className="flex flex-col items-center justify-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 lg:mb-2"
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
								<span className="hidden lg:block lg:text-[10px]">Kunden</span>
							</span>
						</Link>
					</li>

					<li
						className={
							pathname.includes("/job")
								? "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer text-rose-100 bg-rose-800"
								: "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer"
						}
					>
						<Link to="/job">
							<span className="flex flex-col items-center justify-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="h-6 w-6 lg:mb-2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
									/>
								</svg>
								<span className="hidden lg:block lg:text-[10px]">Aufträge</span>
							</span>
						</Link>
					</li>
				</ul>
				<ul className="list-none p-2 m-0 text-rose-400 space-y-1">
					<li
						className={
							pathname.includes("/settings")
								? "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer text-rose-100 bg-rose-800"
								: "rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer"
						}
					>
						<Link to="/settings">
							<span className="flex flex-col items-center justify-start">
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
										d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
									/>
								</svg>

								<span className="hidden lg:block lg:text-[10px]">Einstellungen</span>
							</span>
						</Link>
					</li>
					<li className="rounded-lg hover:bg-rose-800 hover:text-rose-100 p-2 cursor-pointer">
						<Link to="/logout">
							<span className="flex flex-col items-center justify-start">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 lg:mb-2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
									/>
								</svg>

								<span className="hidden lg:block lg:text-[10px]">Logout</span>
							</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
