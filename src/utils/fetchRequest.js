import { baseURI } from "./baseURI";

export const postAsync = async ({ action, payload }) => {
	const token = window.sessionStorage.getItem("_") ? JSON.parse(window.sessionStorage.getItem("_")).token : null;
	const response = await fetch(`${baseURI}${action}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload),
	})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});

	return response;
};
