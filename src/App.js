import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./pages/UserPage";

const AppWrapper = React.lazy(() => import("./components/AppWrapper"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SinglePage = React.lazy(() => import("./pages/SinglePage"));
const DocumentPage = React.lazy(() => import("./pages/DocumentPage"));

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
				path="/document"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<DocumentPage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact={true}
				path="/object/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<SinglePage />
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
		</Routes>
	);
}

export default App;
