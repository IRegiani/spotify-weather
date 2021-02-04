import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, InputBase } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { getWeatherByCity } from '../../../../api/openWeather';
import { useStyles } from './style';

// TODO: Skeleton is not appearing replacing city name while loading
// TODO: Handle when a city is not found
// TODO: Input controlled state warning
// WIP: Handle when a city typed again, the value previous value is being maintained


const generateCityComponent = (weatherInfo, classes, cityOverride, setCityOverride, setWeatherInfo) => {
  const city = weatherInfo === null ? 'Location Blocked' : cityOverride;
  const onKeyPress = ({ key }) => {
    if (key === 'Enter') {
      setWeatherInfo(undefined);
      getWeatherByCity(cityOverride).then(setWeatherInfo);
    }
  };

  if (weatherInfo) {
    return (
      <InputBase
        className={classes.input}
        value={city}
        onChange={({ target: { value } }) => setCityOverride(value)}
        onKeyPress={onKeyPress}
        onClick={() => setCityOverride('')}
        inputProps={{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
        type="text"
      />
    );
  }

  return (<Skeleton className={classes.skeletonText} variant="text" width={65} />);
};


const Home = ({ weatherInfo, setWeatherInfo }) => {
  const { temp, description, icon } = weatherInfo || {};
  // eslint-disable-next-line no-unused-vars
  const [cityOverride, setCityOverride] = useState();
  const classes = useStyles();

  useEffect(() => { setCityOverride(weatherInfo.name); }, [weatherInfo]);

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent>
        {icon
          ? <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
          : <Skeleton className={classes.skeletonCircle} variant="circle" width={45} height={45} />}
        {temp
          ? (
            <Typography className={classes.title} color="textPrimary" align="center">
              {temp}
              &deg;
            </Typography>
          ) : <Skeleton className={classes.skeletonText} variant="text" width={15} />}
        {description
          ? <Typography className={classes.description} color="textSecondary" align="center">{description}</Typography>
          : <Skeleton className={classes.skeletonText} variant="text" width={55} />}
        {generateCityComponent(weatherInfo, classes, cityOverride, setCityOverride, setWeatherInfo)}
      </CardContent>
    </Card>
  );
};

Home.defaultProps = {
  weatherInfo: {},
};

Home.propTypes = {
  weatherInfo: PropTypes.shape({
    temp: PropTypes.number,
    description: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
  }),
  setWeatherInfo: PropTypes.func.isRequired,
};

export default Home;
