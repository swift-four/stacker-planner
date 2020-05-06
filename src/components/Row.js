import React, { Component } from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

const Container = styled.div`
	background-color: white;
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	display: flex;
	flex-direction: column;
`;
const Title = styled.div``;
const TaskList = styled.div`
	padding: 8px;
	background-color: ${(props) =>
		props.isDraggingOver ? "lightgrey" : "inherit"};
	flex-grow: 1;
	display: flex;
	min-height: 100px;
`;

class Column extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.column.id} index={this.props.index}>
				{(provided) => (
					<Container
						{...provided.dragHandleProps}
						{...provided.draggableProps}
						innerRef={provided.innerRef}
						ref={provided.innerRef}>
						<Droppable
							droppableId={this.props.column.id}
							type="task"
							direction="horizontal">
							{(provided, snapshot) => (
								<ExpansionPanel>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header">
										<Title
											defaultValue={this.props.column.title}
											onChange={this.handleTitleChange}>
											{this.props.column.title}
										</Title>
									</ExpansionPanelSummary>
									<TaskList
										isDraggingOver={snapshot.isDraggingOver}
										innerRef={provided.innerRef}
										ref={provided.innerRef}
										{...provided.droppableProps}>
										{this.props.tasks.map((task, index) => (
											<Task key={task.id} task={task} index={index} />
										))}
										{provided.placeholder}
									</TaskList>
								</ExpansionPanel>
							)}
						</Droppable>
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Column;
