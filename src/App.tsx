import React from "react";
import "./App.css";
import Header from "./organisms/layout/Header";
import Nav from "./organisms/layout/Nav";
import Main from "./components/Main";

function App() {
	return (
		<div className="App">
			<div className="min-h-screen bg-gray-100">
        <Nav />
        <Header />
        <Main />
			</div>
		</div>
	);
}

export default App;
