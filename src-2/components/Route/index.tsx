import React, { memo } from 'react';

function Route(props: any) {
  const { children } = props;
  return children;
}

export default memo(Route);
