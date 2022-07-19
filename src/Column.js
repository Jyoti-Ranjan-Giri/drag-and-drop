import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
const Container = styled.div`
	margin: 8px auto;
	border: 1px solid lightblue;
	border-radius: 10px;
	width: 50vw;
	margin: 10px;
`;
const Title = styled.h3`
	padding: 8px;
`;
const Divider = styled.hr`
	color: lightblue;
`;
const Tasklist = styled.div`
	margin: 10px;
	padding: 8px;
	background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
	/* transition: background-color 0.4s ease; */
	transition: all 0.5s ease-out;
	min-height: 100px;
`;
class Column extends React.Component {
	render() {
		return (
			<Container>
				<Title>{this.props.column.title}</Title>
				<Divider />
				<Droppable droppableId={this.props.column.id}>
					{(provided, snapshot) => (
						<Tasklist
							ref={provided.innerRef}
							{...provided.droppableProps}
							isDraggingOver={snapshot.isDraggingOver}
						>
							{this.props.tasks.map((task, index) => (
								<Task key={task.id} task={task} index={index} />
							))}
							{provided.placeholder}
						</Tasklist>
					)}
				</Droppable>
			</Container>
		);
	}
}
export default Column;
