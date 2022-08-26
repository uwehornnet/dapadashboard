export default function ActivityIndicator() {
	return (
		<div className="flex items-center justify-center">
			<div
				className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-red-400"
				role="status"
				style={{ borderTopColor: "rgba(248, 113, 113, 0.2)" }}
			>
				<span className="visually-hidden"></span>
			</div>
		</div>
	);
}
