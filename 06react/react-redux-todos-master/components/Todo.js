import React from 'react';

//completed, text 是由 ...todo传递进来的 ,箭头函数就有return的意思，这样写是错误的。
/*const Todo = (completed, text, onClick) => {
	return(
		<li
			style ={{ textDecoration: completed ? 'line-through' : 'none'}}
			onClick={onClick}
		>
			{text}
		</li>
	);
};*/
//Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children,
// use an array instead or wrap the object using createFragment(object) from the React add-ons

// const Todo = ({completed, text, onClick}) => (
// 		<li
// 			style ={{ textDecoration: completed ? 'line-through' : 'none'}}
// 			onClick={onClick}
// 		>
// 			{text}
// 		</li>
// 	);


const Todo = ({ onClick, completed, text}) =>(
	<li onClick={onClick} style={{textDecoration:completed ? "line-through" : "none"}}>
		{text}
	</li>
)

export default Todo;
