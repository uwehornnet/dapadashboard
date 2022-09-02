import { Link, useLocation } from "react-router-dom";

const SettingsNav = () => {
	const { pathname } = useLocation();
	return (
		<ul>
			<li className="border-b border-slate-300">
				<Link
					to="/settings"
					className={
						pathname === "/settings"
							? "p-4 flex items-center gap-4 text-slate-600 text-sm  hover:bg-slate-100 bg-slate-100"
							: "p-4 flex items-center gap-4 text-slate-600 text-sm bg-white hover:bg-slate-100"
					}
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
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
					Profil
				</Link>
			</li>
			<li className="border-b border-slate-300">
				<Link
					to="/settings/location"
					className={
						pathname === "/settings/location" || pathname === "/settings/location/create"
							? "p-4 flex items-center gap-4 text-slate-600 text-sm  hover:bg-slate-100 bg-slate-100"
							: "p-4 flex items-center gap-4 text-slate-600 text-sm bg-white hover:bg-slate-100"
					}
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
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
					Standorte
				</Link>
			</li>
			<li className="border-b border-slate-300">
				<Link
					to="/settings/user"
					className={
						pathname === "/settings/user" || pathname === "/settings/user/create"
							? "p-4 flex items-center gap-4 text-slate-600 text-sm  hover:bg-slate-100 bg-slate-100"
							: "p-4 flex items-center gap-4 text-slate-600 text-sm bg-white hover:bg-slate-100"
					}
				>
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
					Benutzer
				</Link>
			</li>
		</ul>
	);
};
export default SettingsNav;
