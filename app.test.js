import { shallow, configure  } from 'enzyme';
import renderer from 'react-test-renderer'
import React from 'react'
import Search from './client/src/components/Search'
import Adapter from 'enzyme-adapter-react-16';
import Chat from './server/index.js';
import openSocket from 'socket.io-client';
import api from './server/alphaVantage/index.js'
const socket = openSocket('http://localhost:3000')

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

test('testing if the message was sent by the correct username', (done) => {
  let obj = {
    username: 'Jay',
    message: 'Hello World'
  }
  
  socket.emit('chat', obj)
  let fetchData = (cb) => {
    socket.on('chat', (data) => {
      cb(data);
    })
  }

  function callback(data) {
    expect(obj.username).toBe(data.username);
    done();
  }

  fetchData(callback);
})

test('testing if the message was sent correctly', (done) => {
  let obj = {
    username: 'Jay',
    message: 'Hello World'
  }
  
  socket.emit('chat', obj)
  let fetchData = (cb) => {
    socket.on('chat', (data) => {
      cb(data);
    })
  }

  function callback(data) {
    expect(obj.message).toBe(data.message);
    done();
  }

  fetchData(callback);
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
