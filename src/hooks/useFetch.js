import { useEffect, useState } from "react";
import { baseURI } from "../utils/baseURI";

export const useFetch = ({ endpoint, payload }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const headersList = {
		Accept: "application/json",
		"Content-Type": "application/json",
	};

	const getDataAsync = async ({ endpoint }) => {
		try {
			setLoading(true);
			const req = await fetch(`${baseURI}${endpoint}`, {
				method: "GET",
				headers: headersList,
			});
			const res = await req.json();
			if (res.ok) {
				setData(res.data);
			} else {
				setError(res.data);
			}
			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	};

	const postDataAsync = async ({ endpoint, payload }) => {
		try {
			setLoading(true);
			const req = await fetch(`${baseURI}${endpoint}`, {
				method: "POST",
				headers: headersList,
				body: JSON.stringify(payload),
			});
			const res = await req.json();
			if (res.ok) {
				setData(res.data);
			} else {
				setError(res.data);
			}

			setLoading(false);
		} catch (err) {
			setError(err);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (payload) {
			postDataAsync({ endpoint, payload });
		} else {
			getDataAsync({ endpoint });
		}
	}, [endpoint, payload]);

	return { data, loading, error };
};
