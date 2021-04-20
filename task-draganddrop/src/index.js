import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
  state = initialData;

  onDragEnd = ({source, destination}) => {
    // TODO: reorder our column
    console.log(source.index, destination.index);
    //change source in array's index to destination

    const slicedEle = this.state.tasks[source.index];
    const data = this.state.tasks.map((a,i)=> i === source.index ? 0 : a);
    data.splice(destination.index, 0, slicedEle);
    this.setState(data.filter(a => a));
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
