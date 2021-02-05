import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { loadPlaylistsBySearch } from '../../../../api/spotify';
import { useStyles } from './style';

// TODO: Divider while loading should have left margin
// TODO: Improve suggested playlists
// TODO: Add switch to allow autoplay across playlists

const fetchData = async (accessToken, weatherDescription, setPlaylists, setLoading, selectList) => {
  const playlists = await loadPlaylistsBySearch(accessToken, weatherDescription);
  setPlaylists(playlists);
  setLoading(false);
  const { images, description, name, id } = playlists[0];
  selectList({ id, name, description, image: images && images[0].url });
};

const skeletonCard = (
  <>
    <Skeleton animation="wave" variant="text" width={150} style={{ margin: 'auto' }} />
    <List>
      {new Array(3).fill((
        <>
          <ListItem alignItems="flex-start">
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
            <div style={{ marginLeft: '15px' }}>
              <Skeleton animation="wave" variant="text" width={350} />
              <Skeleton animation="wave" variant="text" width={350} />
            </div>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  </>
);

const generateListItem = (selectList, listSize, classes) => ({ images, description, name, id } = {}, index) => {
  const descriptionComponent = (
    <Typography
      component="span"
      variant="body2"
      className={classes.inline}
      color="textPrimary"
    >
      {description}
    </Typography>
  );
  return (
    <div key={id}>
      <ListItem alignItems="flex-start" button onClick={() => selectList({ id, name, description, image: images && images[0].url })}>
        <ListItemAvatar>
          <Avatar src={images && images[0].url} alt="playlist-cover" />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={descriptionComponent} />
      </ListItem>
      {index === listSize - 1 ? null : <Divider />}
    </div>
  );
};

const PlaylistsWidget = ({ weatherInfo, setCurrentPlaylist, accessToken }) => {
  const { description } = weatherInfo || {};
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (description) {
      fetchData(accessToken, description, setPlaylists, setLoading, setCurrentPlaylist, playlists[0]);
    }
  }, [weatherInfo]);

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        {isLoading
          ? skeletonCard : (
            <>
              <Typography className={classes.title} color="textPrimary" align="center">
                {`${description} Playlists`}
              </Typography>
              <List>
                {playlists.map(generateListItem(setCurrentPlaylist, playlists.length, classes))}
              </List>
            </>
          )}
      </CardContent>
    </Card>
  );
};

PlaylistsWidget.defaultProps = {
  weatherInfo: null,
};

PlaylistsWidget.propTypes = {
  weatherInfo: PropTypes.shape({
    description: PropTypes.string,
  }),
  setCurrentPlaylist: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
};

export default PlaylistsWidget;
