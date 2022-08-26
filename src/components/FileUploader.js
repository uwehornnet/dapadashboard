import { Formik } from "formik";

const FileUploader = () => {
	const handleFileUpload = async (e) => {
		console.log(e);
	};

	return (
		<Formik initialValues={{ file: null }} onSubmit={handleFileUpload}>
			{({ handleSubmit, setFieldValue }) => (
				<form className="block w-full">
					<label className="w-full min-h-[240px] bg-blue-100/50 rounded-md border-4 border-blue-900/60 border-dashed flex items-center justify-center cursor-copy">
						<input
							id="file"
							name="file"
							type="file"
							onChange={(e) => {
								setFieldValue("file", e.target.files[0]);
								handleSubmit();
							}}
							className="form-control hidden"
						/>
						<span className="text-blue-900/60 uppercase text-2xl tracking-widest font-medium flex items-center gap-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
								/>
							</svg>
							upload file
						</span>
					</label>
				</form>
			)}
		</Formik>
	);
};

export default FileUploader;
