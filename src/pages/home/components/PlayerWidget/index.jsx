/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, List, ListItem, Button, ListItemText, Divider } from '@material-ui/core';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { loadTracksFromPlaylist } from '../../../../api/spotify';
import { useStyles } from './style';

// TODO: Add loading skeletons
// TODO: Paginate items
// TODO: add fav playlist heart
// TODO: check convertMilis func

const convertMilis = (s) => {
  const pad = (n) => `00 + ${n}`.slice(-2);

  const ms = s % 1000;
  const remainingMs = (s - ms) / 1000;
  const secs = remainingMs % 60;
  const remainingSecs = (remainingMs - secs) / 60;
  const mins = remainingSecs % 60;

  return `${pad(mins)}:${pad(secs)}:${pad(ms)}`;
};

const fetchData = async (accessToken, id, setPlaylistTracks, setCurrentTrack, setLoading) => {
  const tracks = await loadTracksFromPlaylist(accessToken, id);
  // contains next offset
  const tracksWithPreview = tracks.items.filter((item) => !!item.track.preview_url);
  setPlaylistTracks(tracksWithPreview.map(({ track }) => track));
  setCurrentTrack({ ...tracksWithPreview[0].track, index: 0 });
  setLoading(false);
};

const generateTrackList = (tracks, currentTrack, setCurrentTrack, trackStatus, updateCustomPlaylist, customPlaylist) => {
  const onPlaylistClick = (track) => () => { console.log('Adding track', track.id); }; // previous status should be checked

  console.log('tracks', tracks);
  return (
    <List style={{ minHeight: '200px', overflowY: 'auto', maxHeight: '500px', gridTemplateRow: '2' }}>
      {tracks.map(((track, index) => (
        <>
          <ListItem alignItems="flex-start" button onClick={() => setCurrentTrack({ ...track, index })} key={track.id}>
            {/* WIP: add playing / pause icon, using trackStatus & currentTrack index */}
            <ListItemText primary={track.name} secondary={convertMilis(track.duration_ms)} />
            <Button onClick={onPlaylistClick(track)}>Add to your playlist</Button>
          </ListItem>
          { index === tracks.length - 1 ? null : <Divider />}
        </>
      )))}
    </List>
  );
};

const PlayerWidget = ({ currentPlaylist, accessToken, updateCustomPlaylist, customPlaylist }) => {
  const { image, name, description, id } = currentPlaylist;
  const [trackStatus, setTrackStatus] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const classes = useStyles();

  const nextTrack = () => {
    const index = currentTrack.index + 1;
    if (currentTrack.index !== playlistTracks.length - 1) setCurrentTrack({ ...playlistTracks[index], index });
  };

  useEffect(() => {
    if (name) {
      fetchData(accessToken, id, setPlaylistTracks, setCurrentTrack, setLoading);
    }
  }, [currentPlaylist]);

  return (
    <Card variant="outlined" className={classes.root}>
      <div style={{ display: 'grid', gridTemplateRows: '3' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2', gridTemplateRow: '1' }}>
          <img src={image} alt="current-playlist-cover" style={{ maxHeight: '270px', gridColumn: 1, margin: '5px' }} />
          <div style={{ gridColumn: 2, alignSelf: 'center', paddingLeft: '5px' }}>
            <Typography className={classes.title} color="textPrimary" align="start">
              {name}
            </Typography>
            {description && (
              <Typography className={classes.description} color="textSecondary" align="start">
                {description}
              </Typography>
            )}
            {currentTrack && currentTrack.name && (
              <Typography className={classes.trackName} color="textSecondary" align="start">
                {currentTrack.name}
              </Typography>
            )}
            {currentTrack && currentTrack.artists && (
              <Typography className={classes.artists} color="textSecondary" align="start">
                {currentTrack.artists.map((artist) => (<a href={artist.external_urls[0]} rel="noopener noreferrer" target="_blank">{artist.name}</a>))}
              </Typography>
            )}
          </div>
        </div>
        {generateTrackList(playlistTracks, currentTrack, setCurrentTrack, trackStatus, updateCustomPlaylist, customPlaylist)}
        <AudioPlayer
          autoPlay
          src={currentTrack.preview_url}
          header={currentTrack && currentTrack.name && (
            <Typography className={classes.description} color="textSecondary" align="start">
              {`${currentTrack.name} | `}
              {currentTrack.artists.map((artist, index) => (currentTrack.artists.length - 1 === index ? artist.name : `${artist.name} - `))}
            </Typography>
          )}
          onPlay={() => setTrackStatus({ [currentTrack.id]: 'playing' })}
          onPause={() => setTrackStatus({ [currentTrack.id]: 'stopped' })}
          onEnded={nextTrack}
          // onClickNext={nextTrack}
          onError={console.error}
          style={{ gridTemplateRow: '3', maxWidth: '550px' }}
        />
      </div>
    </Card>
  );
};

PlayerWidget.defaultProps = {
  currentPlaylist: null,
};

PlayerWidget.propTypes = {
  currentPlaylist: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
  }),
  accessToken: PropTypes.string.isRequired,
  updateCustomPlaylist: PropTypes.shape({
    addTrack: PropTypes.func.isRequired,
    removeTrack: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  customPlaylist: PropTypes.array.isRequired,
};

export default PlayerWidget;
