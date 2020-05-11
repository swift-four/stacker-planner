import React, { Component } from "react";
import classes from "../Toolbar/Toolbar.module.css";

class Toolbar extends Component {
	render() {
		return (
			<div className={classes.toolbarWrapper}>
				<div className={classes.toolbarContainer}>
					<div className={classes.leftToolbar}></div>
					<div className={classes.rightToolbar}>
						<button className={classes.collapseButton}>Collapse All</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Toolbar;
