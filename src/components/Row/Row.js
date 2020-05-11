import React, { Component } from "react";
import Card from "../Card/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import classes from "../Row/Row.module.css";
import Aux from "../hoc/Aux";

class Row extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.row.id} index={this.props.index}>
				{(provided) => (
					<Aux>
						<div
							className={classes.rowContainer}
							{...provided.dragHandleProps}
							{...provided.draggableProps}
							ref={provided.innerRef}>
							<Droppable
								droppableId={this.props.row.id}
								type="card"
								direction="horizontal">
								{(provided, snapshot) => (
									<ExpansionPanel>
										<ExpansionPanelSummary
											expandIcon={<ExpandMoreIcon />}
											aria-controls="panel1a-content"
											id="panel1a-header">
											<input
												defaultValue={this.props.row.title}
												className={classes.rowHeaderInput}></input>
										</ExpansionPanelSummary>
										<div
											className={classes.cardList}
											isDraggingOver={snapshot.isDraggingOver}
											ref={provided.innerRef}
											{...provided.droppableProps}>
											{this.props.cards.map((card, index) => (
												<Card key={card.id} card={card} index={index} />
											))}
											{provided.placeholder}
										</div>
									</ExpansionPanel>
								)}
							</Droppable>
						</div>
					</Aux>
				)}
			</Draggable>
		);
	}
}

export default Row;
