import React from "react";

function Error404({ error }) {
  return (
    <div className="flex justify-center place-items-center text-center w-screen h-screen mt-auto dark:bg-neutral-800 dark:bg-opacity-95 dark:text-white">
      <div className="dark:text-white text-black">Error: ({error})</div>
    </div>
  );
}

export default Error404;
