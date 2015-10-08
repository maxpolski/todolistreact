import React from 'react';
export default React.createClass({
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
