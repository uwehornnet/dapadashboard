import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppWrapper({ children }) {
	return (
		<div className="h-[100vh] flex flex-row bg-rose-700">
			<Notifications />
			<div className="h-full lg:w-[100px] ">
				<Sidebar />
			</div>
			<div className="h-full flex-1 overflow-hidden bg-slate-50 rounded-tl-xl rounded-bl-xl">
				<div className="h-full w-wull overflow-y-scroll">{children}</div>
			</div>
		</div>
	);
}

export default AppWrapper;
