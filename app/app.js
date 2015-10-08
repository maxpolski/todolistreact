var List = React.createClass({
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
    var self = this;
    var changeView = this.changeViewState;
    var addNewTask = this.addNewTask;

    var todos = this.state.todoList.map(function(todo, idx, todos) {
      var handleChange = self.handleChildChange.bind(self, idx);
      var handleEdit   = self.handleChildEdit.bind(self, idx);
      var handleRemove = self.handleChildRemove.bind(self, idx);
      // console.log('idx', idx);

          return <Todo
                      viewState={self.state.viewState}
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

var Todo = React.createClass({
  getInitialState: function() {
    return this.props.data;
  },
  isCompletedToggle: function() {
    this.setState({ completed: !this.state.completed });
    this.props.itemStateChange();
  },
  handleEdit: function(e) {
    e.stopPropagation();
    this.props.itemStateEdit();

  },
  handleRemove: function(e) {
    e.stopPropagation();
    this.props.itemStateRemove();
  },
  render: function() {
    var item = <li className={ this.state.completed ? 'completed' : ''}
              onClick={this.isCompletedToggle}
           >
            {this.props.text}
           <span onClick={this.handleEdit} className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
           <span onClick={this.handleRemove} className="glyphicon glyphicon-remove"></span>
           </li>
    switch (this.props.viewState) {
      case 'SHOW_ALL':

        return item;

        break;
      case 'SHOW_COMPLETED':
        return this.props.data.completed && item;
      case 'SHOW_UNCOMPLETED':
        return !this.props.data.completed && item;
      default:
        throw new Error("Unsupported view style");
    }
  }
});

var todos = [
  { text: 'Some Task', completed: false},
  { text: 'Some Another Task', completed: false}
];

React.render(
  <List todoList={ todos } />,
  document.body
)
