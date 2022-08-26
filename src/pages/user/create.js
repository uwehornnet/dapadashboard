import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FileUploader from "../../components/FileUploader";

const UserCreatePage = () => {
	return (
		<div className="w-full h-full">
			<div className="p-6 bg-white sticky top-0 self-start border-b border-neutral-200">
				<ul className="flex items-center justify-start gap-4 text-slate-600 text-sm">
					<li>
						<Link to="/user">Benutzer</Link>
					</li>
					<li>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={4}
							stroke="currentColor"
							className="w-2 h-2"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
						</svg>
					</li>
					<li>
						<span className="text-slate-300">Benutzer erstellen</span>
					</li>
				</ul>
			</div>

			<div className="p-6">
				<FileUploader />
			</div>
		</div>
	);
};

export default UserCreatePage;
