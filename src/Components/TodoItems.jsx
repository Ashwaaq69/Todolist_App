import './Css/TodoItems.css';
import tick from './Assets/tick.png';
import not_tick from './Assets/not_tick.png';
import cross from './Assets/cross.png';

const TodoItems = ({ no, display, text, setTodos, todos }) => {

  const deleteTodo = (no) =>{
    const updatedTodos = todos.filter((item) => item.no!== no);
    setTodos(updatedTodos);
   
  }
     
  const toggle = () => {
    const updatedTodos = todos.map((item) => {
      if (item.no === no) {
        return { ...item, display: item.display === "" ? "line-through" : "" };
      }
      return item;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Update localStorage with updated todos
  };

  return (
    <div className="todoitems">
      <div className={`todo-items-container ${display}`} onClick={toggle}>
        {display === "" ? <img src={not_tick} alt="" /> : <img src={tick} alt="" />}
        <div className="todoitems-text" style={{ textDecoration: display }}>{text}</div>
      </div>
      <img className='todoitems-cross-icon' onClick={()=>{deleteTodo(no)}} src={cross} alt="" />
    </div>
  );
}

export default TodoItems;
