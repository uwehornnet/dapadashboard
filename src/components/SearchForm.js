import { Formik, Form, Field } from "formik";

function SearchForm({ onSubmit, onClose }) {
	return (
		<div className="absolute right-0 z-50 bg-white rounded-md shadow-md">
			<div className="flex items-center w-full justify-between border-b border-slate-200 p-4">
				<p>Ausgabe anpassen</p>

				<span className="cursor-pointer" onClick={() => onClose()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</span>
			</div>

			<div className="p-4">
				<Formik
					initialValues={{
						id: "",
						customer: "",
					}}
					onSubmit={onSubmit}
				>
					{({ values, isSubmitting }) => {
						return (
							<Form>
								<div className="mb-2">
									<Field
										type="text"
										name="id"
										value={values?.id}
										placeholder="Buchungsnummer"
										className="border-2 border-slate-200 p-2 rounded-md"
									/>
								</div>
								<div>
									<Field
										type="text"
										name="customer"
										value={values?.customer}
										placeholder="Firma, Email, etc ..."
										className="border-2 border-slate-200 p-2 rounded-md"
									/>
								</div>
								<div className="mt-4">
									<button
										type="submit"
										disabled={isSubmitting}
										className="text-center block w-full p-2 text-blue-800 rounded-full cursor-pointer"
									>
										filtern
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default SearchForm;
