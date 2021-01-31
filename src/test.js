import React from 'react';
import { shallow } from 'enzyme';
import Routes from './routes';

import LoginPage from './pages/login';

describe('Routes', () => {
  test('renders app correctly', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });

  test('renders components matching routes', () => {
    const wrapper = shallow(<Routes />);
    const expectedLoginPage = wrapper.childAt(1).props().render();

    expect(expectedLoginPage).toEqual(<LoginPage />);
  });
});
