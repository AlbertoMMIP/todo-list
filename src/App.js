import { useState } from 'react';
import { RecoilRoot, atom, selector, useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'; 
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <header className="App-header">
          <TodoFilter />
          <ItemCreator />
          <TodoList />
        </header>
      </div>
    </RecoilRoot>
  );
}

let idUnico = 0;

const todoListState = atom({
  key: 'todoListState',
  default: []
});

const todoFilterState = atom({
  key: 'todoFilterState',
  default: 'all'
});

const todoFilterSelector = selector({
  key: 'todoFilterSelector',
  get: ({ get }) => {
    const list = get(todoListState);
    const filter = get(todoFilterState);

    switch(filter) {
      case "done":
        return list.filter(item => item.isCompleted);
      case "notDone":
        return list.filter(item => !item.isCompleted)
      default:
        return list;
    }
  }
})

function ItemCreator () {
  const [text, setText] = useState('');
  const setNewTodo = useSetRecoilState(todoListState);

  const onChangeText = (e) => {
    setText(e.target.value)
  }

  const onClick = values => {
    setNewTodo( oldTodoList => ([...oldTodoList, { id: idUnico++, text, isCompleted: false }]));
    setText('');
  }

  return (
    <div>
      <input value={text} onChange={onChangeText} />
      <button onClick={onClick}> Agregar </button>
    </div>
  );
}

/*
const todos = [
  { id: 1, text: "Todo 1", isCompleted: false },
  { id: 2, text: "Todo 2", isCompleted: true },
  { id: 3, text: "Todo 3", isCompleted: false },
  { id: 4, text: "Todo 4", isCompleted: true },
  { id: 5, text: "Todo 5", isCompleted: false },
];
*/

function TodoList () {
  const todos = useRecoilValue(todoFilterSelector);
  return (<div>
    {
      todos.map(item => <TodoItem key={item.id} {...item} />)
    }
  </div>)
}

function changeItem (id, todoList, changedItem) {
  const index = todoList.findIndex(item => item.id === id);
  return [...todoList.slice(0, index), changedItem, ...todoList.slice(index + 1, todoList.lenght)];
}

function deleteItem (id, todoList) {
  return todoList.filter(item => item.id !== id);
}

function TodoItem ({ id, text, isCompleted }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onChangeTodoItem = e => {
    console.log('onChangeTodoItem');
    const textValue = e.target.value;
    const changedItem = {
      id,
      text: textValue,
      isCompleted 
    }
    const todoUpdated = changeItem(id, todoList, changedItem);
    setTodoList(todoUpdated);
  }

  const onToggleCompleted = () => {
    console.log('onToggleCompleted');
    const changedItem = {
      id,
      text,
      isCompleted: !isCompleted 
    }
    const todoUpdated = changeItem(id, todoList, changedItem);
    setTodoList(todoUpdated);
  }

  const onClickDeleted = () => {
    console.log('onClickDeleted');
    const todoUpdated = deleteItem(id, todoList);
    setTodoList(todoUpdated);
  }

  return (
    <div>
      <input value={text} onChange={onChangeTodoItem} />
      <input type="checkbox" checked={isCompleted} onChange={onToggleCompleted} />
      <button onClick={onClickDeleted}> x </button>
    </div>
  );
}

function TodoFilter () {
  const [filterState, setFilterState] = useRecoilState(todoFilterState);

  const onSelectedItem = e => {
    const { value } = e.target;
    setFilterState(value);
  }
  return (
    <div>
      Filtro
      <select value={filterState} onChange={onSelectedItem} >
        <option value="all">Todos</option>
        <option value="done">Realizados</option>
        <option value="notDone">Por realizar</option>
      </select>
    </div>
  )
}

export default App;
