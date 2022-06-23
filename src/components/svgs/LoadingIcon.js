const LoadingIcon = (props) => {
	return (
	<svg
		viewBox="0 0 24 24"
		xmlns="<http://www.w3.org/2000/svg>"
    {...props}
	>
		<circle
			cx="12" cy="12" r="8"
			strokeWidth="3" stroke={props.stroke || "tomato"}
			fill="none"
		/>

	</svg>
	)
}

export default LoadingIcon;