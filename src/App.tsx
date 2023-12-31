import React from "react";
import "./App.css";
import Header from "./organisms/layout/Header";
import Nav from "./organisms/layout/Nav";
import { Main } from "./components/Main";
import { FormDataProvider } from "./provider/FormDataProvider";
// import Login from "./pages/Login";

function App() {
	return (
		<>
			{/* // <Login /> */}
			<div className="App">
				<div className="min-h-screen bg-gray-100">
					<Nav />
					<Header />
					<FormDataProvider>
						<Main />
					</FormDataProvider>
				</div>
			</div>
		</>
	);
}

export default App;
