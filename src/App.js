import { useState } from 'react';
import { RecoilRoot } from 'recoil'; 
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <header className="App-header">
          <ItemCreator />
          <TodoList />
        </header>
      </div>
    </RecoilRoot>
  );
}


function ItemCreator () {
  const [text, setText] = useState('');

  const onChangeText = (e) => {
    setText(e.target.value)
  }
  return (
    <div>
      <input value={text} onChange={onChangeText} />
      <button> Agregar </button>
    </div>
  );
}

const todos = [
  { id: 1, text: "Todo 1", isCompleted: false },
  { id: 2, text: "Todo 2", isCompleted: true },
  { id: 3, text: "Todo 3", isCompleted: false },
  { id: 4, text: "Todo 4", isCompleted: true },
  { id: 5, text: "Todo 5", isCompleted: false },
];

function TodoList () {
  return (<div>
    {
      todos.map(item => <TodoItem key={item.id} {...item} />)
    }
  </div>)
}

function TodoItem ({ id, text, isCompleted }) {

  const onChangeTodoItem = e => {
    console.log('onChangeTodoItem');
  }

  return (
    <div>
      <input value={text} onChange={onChangeTodoItem} />
      <input type="checkbox" checked={isCompleted} />
      <button> X </button>
    </div>
  );
}

export default App;
