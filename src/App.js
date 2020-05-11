import React, { Component } from "react";
import Calendar from "./containers/Calendar/Calendar";
import Layout from "./containers/Layout/Layout";
import Aux from "./components/hoc/Aux";

class App extends Component {
	render() {
		return (
			<Aux>
				<Layout>
					<Calendar />
				</Layout>
			</Aux>
		);
	}
}
export default App;
