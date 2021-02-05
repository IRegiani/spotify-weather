import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line no-unused-vars
import Playlist, { fetchData, skeletonCard, generateListItem } from './index';

jest.mock('react-router-dom');

describe('Playlist Widget', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Playlist weatherInfo={{ description: 'description' }} />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('renders loading skeletons correctly', () => {
    expect(skeletonCard).toMatchSnapshot();
  });

  test.skip('renders list item correctly', () => {
    const Component = generateListItem()();
    const wrapper = shallow(<Component />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test.todo('fetchData func');
});
