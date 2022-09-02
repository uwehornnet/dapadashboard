export default function ActivityIndicator() {
	return (
		<div className="flex items-center justify-center">
			<div
				className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-indigo-400"
				role="status"
				style={{ borderTopColor: "rgba(0, 0, 0, 0.1)" }}
			>
				<span className="visually-hidden"></span>
			</div>
		</div>
	);
}
