import React, { memo } from "react";

function Home(props: any) {
  console.log(props);
  return (
    <div>
      <h1>hello world page home</h1>
      <div
        onClick={() =>
          props.history.push({ pathname: "/list/59457", hash: "992334" })
        }
      >
        to list
      </div>
    </div>
  );
}

export default memo(Home);
