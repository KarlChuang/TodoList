import React, { Component } from 'react';
import TodoList from './TodoList.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatus: "All",
      TitleArray: []
    }
  }
  ArrayMapping = (inputArray) => {
    let newArray = [];
    for(let i=0; i<inputArray.length; i++) {
      newArray.splice(i,0,(
        <TodoList key={i.toString()}
                  num={i}
                  titleName={inputArray[i].content}
                  titleShow={inputArray[i].inputShow}
                  showStatus={inputArray[i].showStatus}
                  onChangeClick={this.handleChangeTitleClick}
                  onChangeContent={this.handleChangeTitleContent}
                  onDelete={this.handleTitleDelete}
                  onChangeKeyDown={this.handleTitleChangeKeyDown}
                  ItemArray={this.state.TitleArray[i].ItemArray}
                  onChangeItemContent={this.handleChangeItemContent}
                  onChangeItemKeyDown={this.handleChangeItemKeyDown}
                  onItemChangeClick={this.handleItemChangeClick}
                  onItemDelete={this.handleItemDelete}
                  onAddButtonClick={this.handleAddButtonClick}
                  onItemCompleteClick={this.handleItemCompleteClick}
                  onAllButtonClick={this.handleAllButtonClick}
                  onCompleteButtonClick={this.handleCompleteButtonClick}
                  onUndoButtonClick={this.handleUndoButtonClick} />
      ))
    }
    return newArray;
  }
  handleChangeItemContent = (num1, num, value) => {
    this.setState((prevState) => {
      let newList = prevState.TitleArray;
      newList[num1].ItemArray[num].content = value;
      return {TitleArray: newList};
    })
  }
  handleChangeItemKeyDown = (num1, num, event) => {
    if (event.target.value === 13 || event.keyCode === 13) {
      this.setState((prevState) => {
        let newList = prevState.TitleArray;
        newList[num1].ItemArray[num].inputShow = false;
        return {TitleArray: newList};
      })
    }
  }
  handleItemChangeClick = (num1, num) => {
    this.setState((prevState) => {
      let newList = prevState.TitleArray;
      newList[num1].ItemArray[num].inputShow = !(newList[num1].ItemArray[num].inputShow);
      return {TitleArray: newList};
    })
  }
  handleItemDelete = (num1, num) => {
    this.setState((prevState) => {
      let newList = prevState.TitleArray;
      newList[num1].ItemArray.splice(num, 1);
      return {TitleArray: newList};
    })
  }

  handleTitleDelete = (num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray.splice(num, 1);
      return {TitleArray: newTitleArray};
    });
  }
  handleTitleChangeKeyDown = (num, event) => {
    if ( event.target.value === 13 || event.keyCode === 13 ) {
      this.setState((prevState) => {
        let newTitleArray = prevState.TitleArray;
        newTitleArray[num].inputShow = false;
        return {TitleArray: newTitleArray};
      })
    }
  }
  handleChangeTitleClick = (num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num].inputShow = !(newTitleArray[num].inputShow);
      return {TitleArray: newTitleArray};
    })
  }
  handleChangeTitleContent = (num, value) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num].content = value;
      return {TitleArray: newTitleArray};
    })
  }
  handleAddButtonClick = (num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num].ItemArray.push({
        complete: false, content: "", inputShow: true
      });
      return {TitleArray: newTitleArray};
    })
  }
  handleListAddButtonClick = () => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray.push(
        {content: "", inputShow: true, showStatus: this.state.showStatus, ItemArray: []}
      );
      return {TitleArray: newTitleArray};
    })
  }
  handleItemCompleteClick = (num1, num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num1].ItemArray[num].complete = !(newTitleArray[num1].ItemArray[num].complete);
      return {TitleArray: newTitleArray};
    })
  }
  handleAllButtonClick = (num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num].showStatus = "All";
      return {TitleArray: newTitleArray};
    })
  }
  handleCompleteButtonClick = (num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num].showStatus = "Complete";
      return {TitleArray: newTitleArray};
    })
  }
  handleUndoButtonClick = (num) => {
    this.setState((prevState) => {
      let newTitleArray = prevState.TitleArray;
      newTitleArray[num].showStatus = "Undo";
      return {TitleArray: newTitleArray};
    })
  }
  render() {
    let newTodoList = this.ArrayMapping(this.state.TitleArray);
    const ListNumber = this.state.TitleArray.length;

    return (
      <div className="App">
        <h1>TODO-LIST ({(ListNumber>1) ? ListNumber + " Lists" : ListNumber+ " List"})</h1>
        <div>
          {newTodoList}
          <div className="AddButton"
                onClick={this.handleListAddButtonClick}
          >+</div>
        </div>
      </div>
    );
  }
}

export default App;
