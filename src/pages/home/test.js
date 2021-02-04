import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './index';

jest.mock('react-router-dom');

describe('HomePage', () => {
  test.skip('renders correctly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
