import React, { memo } from "react";

function List(props: any) {
  console.log(props);
  return (
    <div>
      <h1>hello world page list</h1>
      <div
        onClick={() =>
          props.history.push({ pathname: "/home/session" })
        }
      >
        to home
      </div>
    </div>
  );
}

export default memo(List);
