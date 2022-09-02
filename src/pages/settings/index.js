import { Link } from "react-router-dom";
import SettingsNav from "../../components/SettingsNav";

const SettingsPage = ({ children }) => {
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
							Einstellungen
						</span>
					</li>
				</ul>
			</div>

			<div className="flex flex-1 justify-start h-full">
				<div className="max-w-[200px] w-full h-full border-r border-slate-300">
					<SettingsNav />
				</div>
				<div className="flex-1 p-4 bg-slate-50">{children}</div>
			</div>
		</div>
	);
};

export default SettingsPage;
