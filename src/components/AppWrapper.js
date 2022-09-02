import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppWrapper({ children }) {
	return (
		<div className="h-[100vh] flex flex-row bg-slate-50">
			<Notifications />
			<div className="h-full lg:w-[100px] bg-indigo-700">
				<Sidebar />
			</div>
			<div className="h-full flex-1 overflow-hidden">
				<div className="h-full w-wull overflow-y-scroll">
					<TopBar />
					{children}
				</div>
			</div>
		</div>
	);
}

export default AppWrapper;
