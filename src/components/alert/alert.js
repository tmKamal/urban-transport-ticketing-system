import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarContent, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 600,
		'& > * + *': {
			marginTop: theme.spacing(2)
		},
		position: 'absolute',
		zIndex: 100,
		top: 1,
		right: 1
	}
}));

const Alert = ({ type, message, time, status }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(status);
	const action = (
		<Button
			onClick={() => setOpen(false)}
			variant='text'
			color='inherit'
			className={classes.button}
			startIcon={<CloseIcon />}>
			Close
		</Button>
	);
	useEffect(() => {
		setTimeout(() => {
			setOpen(false);
		}, (time + 1) * 1000);
	}, []);
	return (
		<React.Fragment>
			{open ? (
				<div className={classes.root}>
					{type == 'error' ? (
						<SnackbarContent
							style={{
								color: 'white',
								backgroundColor: '#ff5456'
							}}
							message={message}
							action={action}
						/>
					) : (
						<SnackbarContent
							style={{
								color: 'white',
								backgroundColor: '#2e8563'
							}}
							message={message}
							action={action}
						/>
					)}
				</div>
			) : (
				''
			)}
		</React.Fragment>
	);
};

export default Alert;
