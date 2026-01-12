import { useState } from "react";
import "./styles/App.css";

function App() {
  return (
    <>
      <div>
        <h1>🎬 CineComment</h1>
        <form action="#">
          <label htmlFor="name">ชื่อ</label>
          <input type="text" id="name" />
          <label htmlFor="email">อีเมล</label>
          <input type="email" id="email" />
        </form>
      </div>
    </>
  );
}

export default App;
