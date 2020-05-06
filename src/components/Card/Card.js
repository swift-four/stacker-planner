import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import AssetGallery from "../Card/AssetGallery/AssetGallery";
import classes from "../Card/Card.module.css";

class Card extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.card.id} index={this.props.index}>
				{(provided, snapshot) => (
					<div
						className={classes.cardContainer}
						innerRef={provided.innerRef}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						isDragging={snapshot.isDragging}>
						<div>{this.props.card.content}</div>
						<AssetGallery />
						<div className={classes.cardCopy}>
							This is some text to simulate copy
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

export default Card;
