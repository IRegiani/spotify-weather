import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    maxWidth: '850px',
    maxHeight: '940px',
    textAlign: 'start',
    margin: '20px',
    display: 'grid',
    justifyContent: 'start',
    // overflowY: 'auto', // WIP: FIX THIS
  },
  title: {
    fontSize: 18,
    margin: '5px',
    textTransform: 'capitalize',
    paddingBottom: '5px',
  },
  description: {
    margin: '5px',
    paddingBottom: '15px',
  },
  artists: {
    marginLeft: '5px',
    margin: '5px',
  },
});
