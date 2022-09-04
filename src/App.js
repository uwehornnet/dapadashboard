import React from "react";
import { Routes, Route } from "react-router-dom";

const AppWrapper = React.lazy(() => import("./components/AppWrapper"));
const LoginPage = React.lazy(() => import("./pages/auth/login.js"));
const HomePage = React.lazy(() => import("./pages/home/index.js"));
const EntryCreatePage = React.lazy(() => import("./pages/entry/create.js"));
const EntryUpdatePage = React.lazy(() => import("./pages/entry/update.js"));
const InvoicePage = React.lazy(() => import("./pages/invoice/index.js"));
const InvoiceCreatePage = React.lazy(() => import("./pages/invoice/create.js"));
const UserPage = React.lazy(() => import("./pages/settings/user/index.js"));
const UserCreatePage = React.lazy(() => import("./pages/settings/user/create.js"));
const SettingsPage = React.lazy(() => import("./pages/settings/index.js"));
const ProfileSettings = React.lazy(() => import("./pages/settings/profile/index.js"));
const Locations = React.lazy(() => import("./pages/settings/location/index.js"));
const LocationCreate = React.lazy(() => import("./pages/settings/location/create.js"));
const CustomerPage = React.lazy(() => import("./pages/customer/index.js"));
const CustomerCreatePage = React.lazy(() => import("./pages/customer/create.js"));
const CustomerUpdatePage = React.lazy(() => import("./pages/customer/update.js"));

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
				path="/entry/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<EntryCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/entry/update/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<EntryUpdatePage />
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
				path="/customer"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<CustomerPage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/customer/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<CustomerCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/customer/update/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<CustomerUpdatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/settings"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<SettingsPage>
								<ProfileSettings />
							</SettingsPage>
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/settings/location"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<SettingsPage>
								<Locations />
							</SettingsPage>
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/settings/location/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<SettingsPage>
								<LocationCreate />
							</SettingsPage>
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/settings/user"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<SettingsPage>
								<UserPage />
							</SettingsPage>
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/settings/user/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<SettingsPage>
								<UserCreatePage />
							</SettingsPage>
						</AppWrapper>
					</React.Suspense>
				}
			/>
		</Routes>
	);
}

export default App;
