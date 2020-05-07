import React, { Component } from "react";
import Row from "../../components/Row/Row";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import classes from "../Calendar/Calendar.module.css";

class Calendar extends Component {
	state = {
		currentCalendar: {
			cards: {
				"card-1": { id: "card-1", content: "Instagram - 15:00pm" },
				"card-2": { id: "card-2", content: "Facebook - 16:00pm" },
				"card-3": { id: "card-3", content: "Instagram - 17:00pm" },
				"card-4": { id: "card-4", content: "Twitter - 20:00pm" },
			},
			rows: {
				"row-1": {
					id: "row-1",
					title: "Monday 4th May",
					cardIds: ["card-1", "card-2", "card-3", "card-4"],
				},
				"row-2": {
					id: "row-2",
					title: "Tuesday 5th May",
					cardIds: [],
				},
				"row-3": {
					id: "row-3",
					title: "Thursday 7th May",
					cardIds: [],
				},
				"row-4": {
					id: "row-4",
					title: "Friday 8th May",
					cardIds: [],
				},
			},
			rowOrder: ["row-1", "row-2", "row-3", "row-4"],
		},
	};

	onDragEnd = (result) => {
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

		if (type === "row") {
			const newRowOrder = Array.from(this.state.rowOrder);
			newRowOrder.splice(source.index, 1);
			newRowOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...this.state,
				rowOrder: newRowOrder,
			};

			this.setState(newState);
			return;
		}

		const start = this.state.currentCalendar.rows[source.droppableId];
		const finish = this.state.currentCalendar.rows[destination.droppableId];

		if (start === finish) {
			const newCardIds = Array.from(start.cardIds);
			newCardIds.splice(source.index, 1);
			newCardIds.splice(destination.index, 0, draggableId);

			const newRow = {
				...start,
				cardIds: newCardIds,
			};

			const newState = {
				...this.state.currentCalendar,
				rows: {
					...this.state.currentCalendar.rows,
					[newRow.id]: newRow,
				},
			};

			this.setState(newState);
			return;
		}

		const startCardIds = Array.from(start.cardIds);
		startCardIds.splice(source.index, 1);
		const newStart = {
			...start,
			cardIds: startCardIds,
		};

		const finishCardIds = Array.from(finish.cardIds);
		finishCardIds.splice(destination.index, 0, draggableId);
		const newFinish = { ...finish, cardIds: finishCardIds };

		const newState = {
			...this.state.currentCalendar,
			rows: {
				...this.state.currentCalendar.rows,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};

		this.setState(newState);
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="all-rows" direction="vertical" type="row">
					{(provided) => (
						<div
							className={classes.calendarContainer}
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{this.state.currentCalendar.rowOrder.map((rowId, index) => {
								const row = this.state.currentCalendar.rows[rowId];
								const cards = row.cardIds.map(
									(cardId) => this.state.currentCalendar.cards[cardId]
								);
								return (
									<Row key={row.id} row={row} cards={cards} index={index} />
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

export default Calendar;
