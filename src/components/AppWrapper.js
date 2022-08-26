import Notifications from "./Notifications";
import Sidebar from "./Sidebar";
function AppWrapper({ children }) {
	return (
		<div className="h-[100vh] flex flex-row ">
			<Notifications />
			<div className="h-full lg:w-[240px]">
				<Sidebar />
			</div>
			<div className="h-full flex-1 bg-white overflow-hidden">
				<div className="h-full w-wull overflow-y-scroll">{children}</div>
			</div>
		</div>
	);
}

export default AppWrapper;
