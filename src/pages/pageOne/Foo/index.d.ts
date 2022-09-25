import React from 'react';

export default class Foo extends React.PureComponent {
  render: () => React.ReactNode
}

declare const fooSchema: {
  user: string,
  name: string,
}

declare const model: {
  name: string;
  sex: 'man' | 'woman',
  age: number,
}

declare const users: model[];

export {
  fooSchema,
  model,
  users
}

