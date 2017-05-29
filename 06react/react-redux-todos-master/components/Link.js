import  React from 'react';

// children 是指FootLink的children
const Link = ({active, children, onLinkClick}) => {
	if (active){
		return <span>{children}</span>
	}
	return (<a
			href="#"
			onClick={e=>{
				e.preventDefault();
				onLinkClick();
			}}
		>
			{children}
		</a>)
};

export default Link;