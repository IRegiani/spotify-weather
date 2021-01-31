import React from 'react';
import { shallow } from 'enzyme';
// import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';

// import { requestLoginAction } from '../../state/actions';

import LoginPage from './index';

describe('LoginPage', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toBeDefined();
    expect(wrapper).toMatchSnapshot();
  });
});
