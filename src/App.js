import React from 'react';
import initialData from './initial-data';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	margin: 10px;
`;

class App extends React.Component {
	state = initialData;
	// const handleOnDragEnd = () => {};
	// onDragStart = () => {
	// 	document.body.style.color = 'orange';
	// 	document.body.style.transition = 'background-color 0.5s ease';
	// };

	// onDragUpdate = (update) => {
	// 	const { destination } = update;
	// 	const opacity = destination
	// 		? destination.index / Object.keys(this.state.tasks).length
	// 		: 0;
	// 	document.body.style.backgroundColor = `rgb(157,141,217,${opacity})`;
	// };

	onDragEnd = (result) => {
		// document.body.style.color = 'inherit';
		// document.body.style.backgroundColor = 'inherit';
		const { destination, source, draggableId } = result;
		console.log('destination', destination);
		console.log('source', source);
		console.log('draggableId', draggableId);

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = this.state.columns[source.droppableId];
		// id: 'column-1',
		// title: 'To do',
		// taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
		const finish = this.state.columns[destination.droppableId];

		// checking for same column
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
		// moving from one list to another
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};
		const finishTasksIds = Array.from(finish.taskIds);
		finishTasksIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTasksIds,
		};

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
			<DragDropContext
				onDragEnd={this.onDragEnd}
				// onDragStart={this.onDragStart}
				// onDragUpdate={this.onDragUpdate}
			>
				<Container>
					{this.state.columnOrder.map((columnId) => {
						const column = this.state.columns[columnId];

						const tasks = column.taskIds.map(
							(taskId) => this.state.tasks[taskId]
						);

						return <Column key={column.id} column={column} tasks={tasks} />;
					})}
				</Container>
			</DragDropContext>
		);
	}
}
export default App;
