import React, { memo } from "react";

function Home(props: any) {
  console.log(props);
  return (
    <div>
      <h1>hello world page home</h1>
      <div
        onClick={() => props.history.push({ pathname: "/list/23444/998876" })}
      >
        to list
      </div>
      {props.children}
    </div>
  );
}

export default memo(Home);
