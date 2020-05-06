import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import CardAsset from "./CardAsset";

const Container = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	margin-right: 10px;
	background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
	width: 220px;
	display: flex;
	flex-direction: column;
`;

const CardTitle = styled.h4`
	color: red;
	padding: 8px;
	margin: 0;
`;

const CardCopy = styled.p`
	font-size: 14px;
`;

class Task extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container
						innerRef={provided.innerRef}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						isDragging={snapshot.isDragging}>
						<CardTitle> {this.props.task.content}</CardTitle>
						<CardAsset />
						<CardCopy>This is some text to simulate copy</CardCopy>
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Task;
