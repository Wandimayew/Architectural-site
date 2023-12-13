import React from "react";

const ChatBoard = () => {
  return (
    <div id="chat" className="h-screen w-full flex flex-col">
      <div className="h-4/6 w-full">
        <div className="h-1/6 flex justify-center items-center ">
          <h1 className="font-extrabold text-xl">ChatBoard</h1>
        </div>
        <div className="border-t-4 flex justify-center items-center border-gray-400 h-5/6">
          <p className="h-full">Hello</p>
        </div>
      </div>
      <div className="h-2/6 border-t-4 border-gray-600">

      </div>
    </div>
  );
};

export default ChatBoard;
