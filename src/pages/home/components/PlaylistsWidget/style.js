import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    maxWidth: '650px',
    maxHeight: '350px',
    textAlign: 'start',
    margin: '20px',
    display: 'grid',
    justifyContent: 'start',
    overflowY: 'auto',
  },
  title: {
    fontSize: 18,
    textTransform: 'capitalize',

  },
  description: {
    textTransform: 'capitalize',
  },
  skeletonCircle: {
    margin: '30px auto',
    marginBottom: '35px',
  },
  skeletonText: {
    margin: '8px auto',
    height: '1.7rem',
  },
  inline: {
    display: 'inline',
  },
});
