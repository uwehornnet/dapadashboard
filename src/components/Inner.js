const Inner = ({ children, render }) => {
	return (
		<div className="w-full h-full">
			<div className="flex flex-row justify-between items-center sticky top-0 bg-white border-b border-neutral-200 py-4 px-6 ">
				{render()}
			</div>

			<div className="p-4">{children}</div>
		</div>
	);
};
export default Inner;
