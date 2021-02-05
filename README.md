![GitHub pull requests](https://img.shields.io/github/issues-pr/IRegiani/spotify-weather)
![GitHub package.json version](https://img.shields.io/github/package-json/v/IRegiani/spotify-weather)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/IRegiani/spotify-weather)
### Suggested playlist according to the weather in your location
#### How to use

You can access the [demo](https://iregiani.github.io/spotify-weather/), and your location will be requested. You can also manually change it by clicking on the city.

You can create a new private playlist by picking tracks from the suggested playlists and save to listen later.


### Developing

In order to run locally, beware to set the following environment variables:
- `OPEN_WEATHER_KEY`: Create an accounnt at [OpenWeather](https://home.openweathermap.org/api_keys) and get an API key 
- `SPOTIFY_CLIENT_ID`: Register an application at [Spotify](https://developer.spotify.com/dashboard/applications) and get the `Client id`

You can also run the container image: `docker run -e SPOTIFY_CLIENT_ID=ID -e OPEN_WEATHER_KEY=KEY -p 9000:9000 irregiani/spotify-weather`

All components should have Unit Tests, the Action requires all tests passing to allow a PR or deploy. So, `npm run test` is mandatory.

Current project status: `In progress`
