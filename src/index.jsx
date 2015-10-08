import React from 'react';
import ListView from './components/ListView';

var todos = [
  { text: 'Some Task', completed: false},
  { text: 'Some Another Task', completed: false}
];

React.render(
  <ListView todoList={ todos } />,
  document.getElementById('app')
)
