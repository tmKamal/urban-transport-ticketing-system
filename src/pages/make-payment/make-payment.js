import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useHttpClient } from '../../hooks/http-hook';
import {
	CssBaseline,
	Typography,
	Grid,
	TextField,
	Button,
	makeStyles
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(5),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	paper: {
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3)
		}
	},

	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	}
}));

const MakePayment = () => {
	const type = 'Machine';
	const classes = useStyles();
	const [values, setValues] = useState({
		userId: '',
		amount: 500
	});
	const {  sendRequest } = useHttpClient();
	const { userId, amount } = values;

	const onValueChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const paymentInfo = {
			userId,
			amount,
			payhereId: 'testingid',
			type
		};

		try {
			let response = await sendRequest(
				`${process.env.REACT_APP_BACKEND_API}/api/payment/add-payment`,
				'POST',
				JSON.stringify(paymentInfo),
				{ 'Content-Type': 'application/json' }
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleScan = async (data) => {
		setValues({ ...values, userId: data });
	};
	const handleError = (err) => {
		console.error(err);
	};
	return (
		<React.Fragment>
			<CssBaseline />

			<Container
				maxWidth='lg'
				style={{ backgroundColor: '#fff', height: '100vh' }}>
				<Typography
					style={{ marginBottom: '20px', paddingTop: '20px' }}
					component='h1'
					variant='h4'
					align='center'>
					Make payment
				</Typography>

				<Container maxWidth='xs' style={{ marginBottom: '20px' }}>
					<div>
						<QrReader
							delay={1000}
							facingMode='environment'
							onError={handleError}
							onScan={handleScan}
							style={{ width: '100%' }}
						/>
					</div>
				</Container>

				<Typography align='center'>
					Scan or Enter user id or email
				</Typography>

				<Container maxWidth='xs'>
					<form
						className={classes.form}
						noValidate
						method='POST'
						onSubmit={(e) => onSubmit(e)}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									value={userId}
									id='userId'
									onChange={(e) => onValueChange(e)}
									name='userId'
									variant='outlined'
									label='UserId or email'
									fullWidth
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id='amount'
									value={amount}
									name='amount'
									onChange={(e) => onValueChange(e)}
									variant='outlined'
									label='Amount'
									fullWidth
								/>
							</Grid>
						</Grid>

						<div className={classes.buttons}>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								className={classes.button}>
								Submit
							</Button>
						</div>
					</form>
				</Container>
			</Container>
		</React.Fragment>
	);
};

export default MakePayment;
