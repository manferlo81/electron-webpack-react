import { readFile } from "fs";
import { join } from "path";
import React, { Component } from "react";
import { promisify } from "util";

const read = promisify(readFile);

declare const __static: string;

interface AppState {
  name: string;
  description: string;
  text: string;
}

class App extends Component<{}, AppState> {

  public state: AppState = {
    name: "",
    description: "",
    text: "",
  };

  public async componentDidMount() {
    const { name, description } = await import("../../package.json");
    const buffer = await read(join(__static, "text.txt"));
    this.setState({ name, description, text: buffer.toString() });
  }

  public render() {
    const { name, description, text } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
        <p>{text}</p>
      </div>
    );
  }

}

export default App;
