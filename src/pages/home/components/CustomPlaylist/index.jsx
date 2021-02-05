import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar, Button, InputBase, Tooltip } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveIcon from '@material-ui/icons/Save';

import { createPlaylist } from '../../../../api/spotify';
import { useStyles } from './style';

// TODO: Add description

export const savePlaylist = async (accessToken, description, playlistName, setLoading, { id }, tracks, disableButton) => {
  await createPlaylist(accessToken, id, playlistName, description, tracks);
  setLoading(false);
  disableButton(true);
};

export const generateListItem = (listSize, { removeTrack }) => (track, index) => {
  const secondaryComponent = `${track.album.name} | ${track.artists.map((artist, inx) => (track.artists.length - 1 === inx ? artist.name : `${artist.name} - `))}`;

  return (
    <div key={track.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={track.album.images[0].url} alt="track-cover" />
        </ListItemAvatar>
        <ListItemText primary={track.name} secondary={secondaryComponent} />
        <DeleteOutlinedIcon onClick={() => removeTrack(track)} />
      </ListItem>
      {index === listSize - 1 ? null : <Divider />}
    </div>
  );
};

const CustomPlaylistsWidget = ({ playlist, updatePlaylist, userProfile, accessToken }) => {
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [isLoading, setLoading] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const classes = useStyles();

  const onSaveClick = () => { setLoading(true); savePlaylist(accessToken, undefined, playlistName, setLoading, userProfile, playlist, setButtonDisabled); };

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        <Tooltip title="Rename your playlist!" leaveDelay={500} placement="right" arrow>
          <InputBase
            className={classes.input}
            value={playlistName}
            onChange={({ target: { value } }) => setPlaylistName(value)}
            onClick={() => setPlaylistName('')}
            inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
            type="text"
          />
        </Tooltip>
        <List>
          {playlist.map(generateListItem(playlist.length, updatePlaylist, classes))}
        </List>
        <Button onClick={onSaveClick} disabled={isLoading || isButtonDisabled} startIcon={isLoading ? null : <SaveIcon />}>
          {isButtonDisabled ? 'Saved' : 'Save Playlist'}
        </Button>
      </CardContent>
    </Card>
  );
};

CustomPlaylistsWidget.defaultProps = {
};

CustomPlaylistsWidget.propTypes = {
  accessToken: PropTypes.string.isRequired,
  userProfile: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  updatePlaylist: PropTypes.shape({
    removeTrack: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  playlist: PropTypes.array.isRequired,
};

export default CustomPlaylistsWidget;
