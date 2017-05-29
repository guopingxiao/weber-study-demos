import React from 'react';
import FilterLink from '../containers/FilterLink';

// 常见的是逻辑组件包含显示组件，但是在复杂的组件中，显示组件也可以包含逻辑组件
const Footer = () => (
		<p>
			Show:
			{' '}
			<FilterLink filter="SHOW_ALL">
				ALL
			</FilterLink>
			{', '}
			<FilterLink filter="SHOW_ACTIVE">
				ACTIVE
			</FilterLink>
			{', '}
			<FilterLink filter="SHOW_COMPLETED">
				COMPLETED
			</FilterLink>
		</p>
	);

export default Footer;