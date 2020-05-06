import React, { Component } from "react";
import initialData from "./initialData";
import Column from "./Column";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

class App extends Component {
	state = {
		tasks: {
			"task-1": { id: "task-1", content: "Instagram - 15:00pm" },
			"task-2": { id: "task-2", content: "Facebook - 16:00pm" },
			"task-3": { id: "task-3", content: "Instagram - 17:00pm" },
			"task-4": { id: "task-4", content: "Twitter - 20:00pm" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "Monday 4th May",
				taskIds: ["task-1", "task-2", "task-3", "task-4"],
			},
			"column-2": {
				id: "column-2",
				title: "Tuesday 5th May",
				taskIds: [],
			},
			"column-3": {
				id: "column-3",
				title: "Thursday 7th May",
				taskIds: [],
			},
			"column-4": {
				id: "column-4",
				title: "Friday 8th May",
				taskIds: [],
			},
		},
		columnOrder: ["column-1", "column-2", "column-3", "column-4"],
	};

	onDragEnd = (result) => {
		alert("[ondragend] from App.js");
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		if (type === "column") {
			const newColumnOrder = Array.from(this.state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...this.state,
				columnOrder: newColumnOrder,
			};

			this.setState(newState);
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn,
				},
			};

			this.setState(newState);
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = { ...finish, taskIds: finishTaskIds };

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		this.setState(newState);
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="all-columns" direction="vertical" type="column">
					{(provided) => (
						<Container
							{...provided.droppableProps}
							innerRef={provided.innerRef}
							ref={provided.innerRef}>
							{this.state.columnOrder.map((columnId, index) => {
								const column = this.state.columns[columnId];
								const tasks = column.taskIds.map(
									(taskId) => this.state.tasks[taskId]
								);
								return (
									<Column
										key={column.id}
										column={column}
										tasks={tasks}
										index={index}
									/>
								);
							})}
							{provided.placeholder}
						</Container>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default App;
