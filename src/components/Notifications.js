import { useEffect } from "react";

const Notification = ({ type, message }) => {
	useEffect(() => {
		setTimeout(() => {}, 5000);
	}, []);

	return (
		<div className="bg-white rounded-lg shadow-lg z-[999] mt-4 mr-4 min-w-[240px]">
			<div className="p-2">
				<p>
					{type === "note" ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-blue-600 mr-4 inline-block"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					) : type === "error" ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-red-500 mr-4 inline-block"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-green-500 mr-4 inline-block"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
							/>
						</svg>
					)}
					{message}
				</p>
			</div>
		</div>
	);
};

function Notifications() {
	const notifications = [];

	return notifications.length ? (
		<div className="fixed top-0 right-0">
			{notifications.map((item, index) => (
				<Notification key={index} {...item} />
			))}
		</div>
	) : null;
}

export default Notifications;
