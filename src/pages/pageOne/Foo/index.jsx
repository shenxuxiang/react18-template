import React from 'react';

export default class Foo extends React.PureComponent {
  constructor() {
    super();
  }

  render() {
    return React.createElement('div', { children: 'hello world 123456' });
  }
}

export const fooSchema = {
  user: 'shenxuxiang',
  name: 'hello world',
}

export const model = {
  name: '沈旭祥',
  age: 32,
  sex: 'man',
}

export const users = [
  modle, model, model,
]
