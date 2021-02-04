import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 250,
    textAlign: 'center',
    margin: '20px',
    display: 'grid',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
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
  input: {
    fontSize: '18px',
    marginTop: '5px',
  },
});
