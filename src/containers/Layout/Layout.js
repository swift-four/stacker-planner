import React from "react";
import Navbar from "../../components/Navigation/Navbar/Navbar";
import Aux from "../../components/hoc/Aux";

const layout = (props) => (
	<Aux>
		<Navbar />
		<main>{props.children}</main>
	</Aux>
);

export default layout;
