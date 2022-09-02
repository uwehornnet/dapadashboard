import SettingsNav from "../../components/SettingsNav";

const SettingsPage = ({ children }) => {
	return (
		<div className="flex flex-1 justify-start h-full">
			<div className="max-w-[200px] w-full h-full border-r border-slate-300 bg-white">
				<SettingsNav />
			</div>
			<div className="flex-1 p-4 bg-slate-50">{children}</div>
		</div>
	);
};

export default SettingsPage;
