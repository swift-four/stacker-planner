import React from "react";
import classes from "../Navbar/Navbar.module.css";

const navbar = () => (
	<header className={classes.navbarWrapper}>
		<div className={classes.navbarContainer}>
			<h2 className={classes.navbarHeading}>Stacker</h2>
			<button className={classes.logOutButton}>Logout</button>
		</div>
	</header>
);

export default navbar;
