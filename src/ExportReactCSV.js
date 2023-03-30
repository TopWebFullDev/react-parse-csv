import React from 'react';
import { CSVLink } from 'react-csv';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2),
		float: "right",
	},
}));

export const ExportReactCSV = ({ csvData, fileName }) => {
	const classes = useStyles();
	return (
		<Button
			variant="contained"
			color="primary"
			size="large"
			className={classes.button}
			endIcon={<GetAppIcon />}
		>
			<CSVLink data={csvData} filename={fileName}>Export</CSVLink>
		</Button>
	);
}







