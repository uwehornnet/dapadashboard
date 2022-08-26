import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
	const asPath = [];
	const { pathname } = useLocation();

	return (
		<div className="flex flex-col justify-between h-[100vh]">
			<ul className="list-none p-4 m-0 mb-6 text-neutral-600">
				<li
					className={
						pathname === "/"
							? "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5 text-red-600 bg-red-100"
							: "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5"
					}
				>
					<Link to="/">
						<span className=" flex flex-row align-middle justify-start">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 lg:mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							<span className="hidden lg:block">Dashboard</span>
						</span>
					</Link>
				</li>

				<li
					className={
						pathname.includes("/document")
							? "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5 text-red-600 bg-red-100"
							: "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5"
					}
				>
					<Link to="/document">
						<span className="flex flex-row align-middle justify-start">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 lg:mr-2"
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
							<span className="hidden lg:block">Dokumente</span>
						</span>
					</Link>
				</li>
			</ul>
			<ul className="list-none p-4 m-0">
				<li
					className={
						pathname.includes("/profile")
							? "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5 text-red-600 bg-red-100"
							: "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5"
					}
				>
					<Link to="/profile">
						<span className="flex flex-row align-middle justify-start">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 lg:mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span className="hidden lg:block">Profil</span>
						</span>
					</Link>
				</li>
				<li
					className={
						pathname.includes("/user")
							? "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5 text-red-600 bg-red-100"
							: "rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5"
					}
				>
					<Link to="/user">
						<span className=" flex flex-row align-middle justify-start">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 lg:mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
							<span className="hidden lg:block">Benutzer</span>
						</span>
					</Link>
				</li>
				<li className="rounded-lg hover:bg-red-100 hover:text-red-600 p-3 cursor-pointer mb-1.5">
					<Link to="/logout">
						<span className="flex flex-row align-middle justify-start">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 lg:mr-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
								/>
							</svg>

							<span className="hidden lg:block">Logout</span>
						</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}
