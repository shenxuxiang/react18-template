import React, { memo } from "react";

function List(props: any) {
  console.log(props);
  return (
    <div>
      <h1>hello world page list</h1>
      <div
        onClick={() =>
          props.navigator.push({ pathname: "/home", search: "_UID=4837" })
        }
      >
        to home
      </div>
    </div>
  );
}

export default memo(List);
