import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './index';

describe('HomePage', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
