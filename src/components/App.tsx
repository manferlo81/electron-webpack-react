import React, { Component } from "react";

interface AppState {
  name: string;
  description: string;
}

class App extends Component<{}, AppState> {

  public state = {
    name: "",
    description: "",
  };

  public async componentDidMount() {
    const { name, description } = await import("../../package.json");
    this.setState({ name, description });
  }

  public render() {
    const { name, description } = this.state;
    return (
      <div>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    );
  }

}

export default App;
