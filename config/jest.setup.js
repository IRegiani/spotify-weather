/* eslint-disable no-console */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime';

configure({ adapter: new Adapter() });

console.log = () => null;
console.error = () => null;
console.group = () => null;
console.warn = () => null;
