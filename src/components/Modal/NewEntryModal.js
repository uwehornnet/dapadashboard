import { useState } from "react";

const options = [
	{
		value: "Gutscrhift",
		description: "Füge einen neuen Bestand hinzu",
		endpoint: "/document/credit/create?entry=",
	},
	{
		value: "Rechnung",
		description: "Füge ein neuen Eintrag deine Fuhrpark hinzu",
		endpoint: "/document/invoice/create?entry=",
	},
	{
		value: "Verwertung",
		description: "Füge ein neuen Eintrag der Verwertung hinzu",
		endpoint: "/document/disposal/create?entry=",
	},
];

const NewEntryModal = ({ visible, onClose, id }) => {
	const [current, setCurrent] = useState(null);
	return visible ? (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
			<div className="ml-auto mr-0 h-full lg:w-1/3 w-full shadow-lg rounded-tl-xl rounded-bl-xl overflow-hidden bg-white">
				<div className="p-8 bg-indigo-700">
					<div className="font-medium text-white uppercase">Dokument anlegen</div>
					<div className="text-sm text-white">
						Welche Arte von Dokument möchtest du zum ausgewählten Fahrzeug erstellen?
					</div>
				</div>

				<div className="p-8">
					{options.map((option, i) => (
						<div
							key={i}
							onClick={() => setCurrent(option)}
							className={`flex items-center justify-start gap-8 mx-auto max-w-[400px] mb-8 rounded-md border-2 ${
								current === option ? "border-indigo-500" : "border-slate-100"
							} p-8 cursor-pointer hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-300 `}
						>
							<div
								className={`rounded-full h-4 w-4 border-2 ${
									current === option ? "border-indigo-500" : "border-slate-300"
								}`}
							></div>
							<div className="flex-1">
								<div className="font-medium text-slate-900 uppercase">{option.value}</div>
								<div className="text-sm text-slate-500">{option.description}</div>
							</div>
						</div>
					))}

					<button
						disabled={current === null}
						onClick={() => {
							onClose({
								...current,
								endpoint: `${current.endpoint}${id}`,
							});
						}}
						className="block bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white text-center w-full max-w-[400px] mx-auto rounded-md py-3 cursor-pointer hover:bg-indigo-600"
					>
						weiter
					</button>
				</div>
			</div>
		</div>
	) : null;
};

export default NewEntryModal;
