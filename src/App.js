import React from "react";
import { Routes, Route } from "react-router-dom";

const AppWrapper = React.lazy(() => import("./components/AppWrapper"));
const LoginPage = React.lazy(() => import("./pages/auth/login.js"));
const HomePage = React.lazy(() => import("./pages/home/index.js"));
const DocumentPage = React.lazy(() => import("./pages/document/index.js"));
const DocumentCreatePage = React.lazy(() => import("./pages/document/create.js"));
const InvoicePage = React.lazy(() => import("./pages/invoice/index.js"));
const InvoiceCreatePage = React.lazy(() => import("./pages/invoice/create.js"));
const UserPage = React.lazy(() => import("./pages/user/index.js"));
const UserCreatePage = React.lazy(() => import("./pages/user/create.js"));

function App() {
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<React.Suspense fallback={<>...</>}>
						<LoginPage />
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<HomePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/upload"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<DocumentPage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/upload/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<DocumentCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/invoice"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<InvoicePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/invoice/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<InvoiceCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/user"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<UserPage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/user/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<UserCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
		</Routes>
	);
}

export default App;
