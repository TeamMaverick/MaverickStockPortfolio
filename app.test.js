import { shallow, configure  } from 'enzyme';
import renderer from 'react-test-renderer'
import React from 'react'
import Search from './client/src/components/Search'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


test('testing snapshot', () => {
  const component = renderer.create(<Search />)
  let comp = component.toJSON();
  expect(comp).toMatchSnapshot();

})

test('testing matcher', () => {
  expect(1+1).toBe(2)
})

test('testing state', () => {
  const wrapper = shallow(<Search />);
  expect(wrapper.state('checked')).toEqual(0)
})