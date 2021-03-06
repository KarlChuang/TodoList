import React, { Component } from 'react';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.ArrayMapping = this.ArrayMapping.bind(this);
  }

  ArrayMapping(inputArray, showStatus) {
    const newArray = [];
    for (let i = 0; i < inputArray.length; i += 1) {
      newArray.splice(i, 0, (
        <TodoItem
          key={i.toString()}
          num={i}
          complete={inputArray[i].complete}
          content={inputArray[i].content}
          inputShow={inputArray[i].inputShow}
          onChangeContent={(num, value) => this.props.onChangeItemContent(this.props.num, num, value)}
          onChangeKeyDown={(num, event) => this.props.onChangeItemKeyDown(this.props.num, num, event)}
          onChangeClick={num => this.props.onItemChangeClick(this.props.num, num)}
          onDelete={num => this.props.onItemDelete(this.props.num, num)}
          onCompleteClick={num => this.props.onItemCompleteClick(this.props.num, num)} 
        />
      ));
    }
    if (showStatus !== 'All') {
      for (let i = inputArray.length - 1; i >= 0; i -= 1) {
        if (inputArray[i].complete !== (showStatus === 'Complete')) {
          newArray.splice(i, 1);
        }
      }
    }
    return newArray;
  }

  render() {
    const num = this.props.num;
    // Title
    const TitleName = this.props.titleName;
    const titleInputShow = this.props.titleShow;
    const handleChangeTitleClick = this.props.onChangeClick;
    const handleChangeTitleContent = this.props.onChangeContent;
    const handleTitleDelete = this.props.onDelete;
    const handleChangeTitleKeyDown = this.props.onChangeKeyDown;
    // Items
    const newTodoItemList = this.ArrayMapping(this.props.ItemArray, this.props.showStatus);
    const ItemNumber = this.props.ItemArray.length;
    let CompleteItemNumber = 0;
    let UndoItemNumber = 0;
    for (let i = 0; i < ItemNumber; i += 1) {
      if (this.props.ItemArray[i].complete === true) {
        CompleteItemNumber += 1;
      } else {
        UndoItemNumber += 1;
      }
    }
    const handleAddButtonClick = this.props.onAddButtonClick;
    const handleAllButtonClick = this.props.onAllButtonClick;
    const handleCompleteButtonClick = this.props.onCompleteButtonClick;
    const handleUndoButtonClick = this.props.onUndoButtonClick;

    return (
      <div className="TodoList">
        <TodoListTitle
          titleName={TitleName}
          inputShow={titleInputShow}
          onChangeClick={() => handleChangeTitleClick(num)}
          onChangeContent={value => handleChangeTitleContent(num, value)}
          onChangeKeyDown={event => handleChangeTitleKeyDown(num, event)}
          onDelete={() => handleTitleDelete(num)}
        />
        <div className="line">----------------------------------</div>
        <div className="TodoItemList">
          {newTodoItemList}
          <div
            className="AddButton"
            onClick={() => handleAddButtonClick(num)}
          >+</div>
        </div>
        <div>
          <div className={(this.props.showStatus === 'All') ? 'ToolBarDown' : 'ToolBar'} onClick={() => { handleAllButtonClick(num); }}>All ( {ItemNumber} )</div>
          <div className={(this.props.showStatus === 'Complete') ? 'ToolBarDown' : 'ToolBar'} onClick={() => { handleCompleteButtonClick(num); }}>Done ( {CompleteItemNumber} )</div>
          <div className={(this.props.showStatus === 'Undo') ? 'ToolBarDown' : 'ToolBar'} onClick={() => { handleUndoButtonClick(num); }}>Undone ( {UndoItemNumber} )</div>
        </div>
      </div>
    );
  }
}

class TodoListTitle extends Component {
  render() {
    const titleName = this.props.titleName;
    const inputShow = this.props.inputShow;
    const handleChangeClick = this.props.onChangeClick;
    const handleChangeContent = this.props.onChangeContent;
    const handleChangeKeyDown = this.props.onChangeKeyDown;
    const handleDelete = this.props.onDelete;
    return (
      <div className="TodoListTitle">
        {(inputShow) ? (
          <input
            type="text" className="Input"
            value={titleName}
            onChange={event => handleChangeContent(event.target.value)}
            onKeyDown={event => handleChangeKeyDown(event)}
          />
        ) : (<div className="title">{titleName}</div>)}
        <div className="buttonDiv">
          <img
            className="delete" src={require('./pic/delete.png')} alt="delete"
            onClick={handleDelete}
          />
          <img
            className="write" src={require('./pic/write.png')} alt="write"
            onClick={handleChangeClick}
          />
        </div>
        <br />
      </div>
    );
  }
}

class TodoItem extends Component {
  render() {
    const num = this.props.num;
    const complete = this.props.complete;
    const content = this.props.content;
    const inputShow = this.props.inputShow;
    const handleChangeContent = this.props.onChangeContent;
    const handleChangeKeyDown = this.props.onChangeKeyDown;
    const handleChangeClick = this.props.onChangeClick;
    const handleDelete = this.props.onDelete;
    const handleCompleteClick = this.props.onCompleteClick;
    return (
      <div className="TodoItem" >
        <div className={(complete) ? 'buttonComplete' : 'button'} onClick={() => handleCompleteClick(num)} />
        {(inputShow) ? (
          <input
            type="text" className="Input"
            value={content}
            onChange={event => handleChangeContent(num, event.target.value)}
            onKeyDown={event => handleChangeKeyDown(num, event)}
          />
          ) : (<div className={(complete) ? 'thingComplete' : 'thing'}>{content}</div>) }
        <div className="buttonDiv">
          <img
            className="delete" src={require('./pic/delete.png')} alt="delete"
            onClick={() => handleDelete(num)}
          />
          <img
            className="write" src={require('./pic/write.png')} alt="write"
            onClick={() => handleChangeClick(num)}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
