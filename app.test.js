import { shallow, configure  } from 'enzyme';
import renderer from 'react-test-renderer'
import React from 'react'
import Search from './client/src/components/Search'
import Adapter from 'enzyme-adapter-react-16';
import api from './server/alphaVantage/index.js'

configure({ adapter: new Adapter() });


test('testing snapshot', () => {
  const component = renderer.create(<Search />)
  let comp = component.toJSON();
  expect(comp).toMatchSnapshot();

})

test('testing matcher', () => {
  expect(1+1).toBe(2)
})


// describe('search', () => {
  test('testing state', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.state('checked')).toEqual(0)
  })
  
  test('should retrieve api data', () => {
    const wrapper = shallow(<Search />)
    const input = wrapper.find('input').at(0)
    input.simulate('change', { target: { value: 'aapl'}})
    input.simulate('submit')
    expect(wrapper.state('history')).toEqual('dsfdsf')
  })

  test('api request', () => {
    api.getTickerInfo('aapl')
  })
  
// })