import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line no-unused-vars
import Weather, { generateCityComponent } from './index';

jest.mock('react-router-dom');

describe('Weather Widget', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Weather setWeatherInfo={jest.fn()} />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('renders city text field', () => {
    expect(generateCityComponent({}, {})).toMatchSnapshot();
    // WIP: expect wrapper to contain input
  });

  test('renders city text field', () => {
    expect(generateCityComponent({}, {})).toMatchSnapshot();
    // WIP: expect wrapper to contain input
  });

  test.todo('renders loading status');
});
