import React from 'react';
import Todo  from './ItemView';

export default React.createClass({
  getInitialState: function() {
    return { viewState: 'SHOW_ALL', todoList: this.props.todoList || [] };
  },
  changeViewState: function(e) {
    var self = this;
    this.setState({viewState: e.target.getAttribute('data-view')});

  },
  handleChildChange: function(idx) {
    var prevTodoList = this.state.todoList;
    var nextTodoList = prevTodoList;
        nextTodoList[idx].completed = !prevTodoList[idx].completed;

    this.setState({todoList: nextTodoList});
  },
  handleChildEdit(idx, newText) {
    console.log('want to edit', idx);
    var element = document.getElementById('newTodo');
    element.setAttribute('data-idx', idx);
    element.value = this.state.todoList[idx].text;
    element.focus();
  },
  handleChildRemove(idx) {
    var prevTodoList = this.state.todoList;
    var nextTodoList = prevTodoList;
        delete nextTodoList[idx];

    this.setState({todoList: nextTodoList});
  },
  addNewTask: function(e) {
    text = e.target.value;

    if(e.keyCode == "13" && text.length > 3) {
      var prevTodoList = this.state.todoList;
      var nextTodoList = prevTodoList;
      console.log('e.tar.get...', e.target.getAttribute('data-idx'))
      if(e.target.getAttribute('data-idx') != null) {
        var idx = e.target.getAttribute('data-idx');
        nextTodoList[idx] = {
          text: text,
          completed: prevTodoList[idx].completed
        }
      } else {
        var todoListLength = this.state.todoList.length;
        nextTodoList[todoListLength] = {
          text: text,
          completed: false
        };
      }

      this.setState({todoList: nextTodoList});

      e.target.value = '';
    }

  },
  render: function() {
    var changeView = this.changeViewState;
    var addNewTask = this.addNewTask;

    var todos = this.state.todoList.map((todo, idx, todos) => {
      var handleChange = this.handleChildChange.bind(this, idx);
      var handleEdit   = this.handleChildEdit.bind(this, idx);
      var handleRemove = this.handleChildRemove.bind(this, idx);
      // console.log('idx', idx);

          return <Todo
                      viewState={this.state.viewState}
                      itemStateChange = {handleChange}
                      itemStateEdit = {handleEdit}
                      itemStateRemove = {handleRemove}
                      data={todo}
                      text={todo.text}
                      completed={todo.completed}
                      data-idx={idx}
                 />;
    });

    return <div className="list-container">
            <h1>Todo List</h1>
            <ul className="list" type="none">
              {todos}
            </ul>
            <ul id="controlPane">
              <input
                    type="text"
                    id="newTodo"
                    placeholder="New Task here"
                    onKeyDown={ addNewTask }
              />
              <br />
              <li>
                <a
                    href="#"
                    onClick={ changeView }
                    data-view='SHOW_ALL'
                >
                  Show All
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={ changeView }
                  data-view='SHOW_COMPLETED'
                >
                  Show Completed
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={ changeView }
                  data-view='SHOW_UNCOMPLETED'
                >
                  Show Uncompleted
                </a>
              </li>
            </ul>
           </div>
    }
});
