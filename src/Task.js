import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
const Container = styled.div`
	border: 1px solid lightblue;
	border-radius: 10px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
	transition: background-color 0.5s ease-out;
	display: flex;
`;
// const Handle = styled.div`
// 	height: 24px;
// 	width: 24px;
// 	background-color: orange;
// 	border-radius: 2px;
// 	margin-right: 5px;
// `;

class Task extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
					>
						{/* <Handle {...provided.dragHandleProps} /> */}
						{this.props.task.content}
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Task;
