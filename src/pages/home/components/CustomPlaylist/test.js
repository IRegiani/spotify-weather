import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line no-unused-vars
import CustomPlaylist, { savePlaylist, generateListItem } from './index';

jest.mock('react-router-dom');

describe('CustomPlaylist Widget', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<CustomPlaylist playlist={[]} updatePlaylist={{ removeTrack: jest.fn() }} />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test.skip('renders item correctly', () => {
    const Component = generateListItem()();
    const wrapper = shallow(<Component />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test.todo('save playlist func');
});
