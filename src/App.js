import React from "react";
import { Routes, Route } from "react-router-dom";

const AppWrapper = React.lazy(() => import("./components/AppWrapper"));
const LoginPage = React.lazy(() => import("./pages/auth/login.js"));
const HomePage = React.lazy(() => import("./pages/home/index.js"));
const EntryCreatePage = React.lazy(() => import("./pages/entry/create.js"));
const EntryUpdatePage = React.lazy(() => import("./pages/entry/update.js"));

const InvoicePage = React.lazy(() => import("./pages/document/index.js"));
const InvoiceCreatePage = React.lazy(() => import("./pages/document/invoice/create.js"));
const InvoiceUpdatePage = React.lazy(() => import("./pages/document/invoice/update.js"));
const CreditCreatePage = React.lazy(() => import("./pages/document/credit/create.js"));
const CreditUpdatePage = React.lazy(() => import("./pages/document/credit/update.js"));
const DisposalCreatePage = React.lazy(() => import("./pages/document/disposal/create.js"));
const DisposalUpdatePage = React.lazy(() => import("./pages/document/disposal/update.js"));

const UserPage = React.lazy(() => import("./pages/settings/user/index.js"));
const UserCreatePage = React.lazy(() => import("./pages/settings/user/create.js"));
const SettingsPage = React.lazy(() => import("./pages/settings/index.js"));
const ProfileSettings = React.lazy(() => import("./pages/settings/profile/index.js"));

const Locations = React.lazy(() => import("./pages/settings/location/index.js"));
const LocationCreate = React.lazy(() => import("./pages/settings/location/create.js"));

const CustomerPage = React.lazy(() => import("./pages/customer/index.js"));
const CustomerCreatePage = React.lazy(() => import("./pages/customer/create.js"));
const CustomerUpdatePage = React.lazy(() => import("./pages/customer/update.js"));

const JobPage = React.lazy(() => import("./pages/job/index.js"));
const JobEditPage = React.lazy(() => import("./pages/job/edit.js"));

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
				path="/document"
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
				path="/document/invoice/create"
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
				path="/document/invoice/update/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<InvoiceUpdatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>
			<Route
				exact
				path="/document/credit/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<CreditCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/document/credit/update/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<CreditUpdatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/document/disposal/create"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<DisposalCreatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/document/disposal/update/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<DisposalUpdatePage />
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/job"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<JobPage />
						</AppWrapper>
					</React.Suspense>
				}
			/>

			<Route
				exact
				path="/job/edit/:id"
				element={
					<React.Suspense fallback={<>...</>}>
						<AppWrapper>
							<JobEditPage />
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
