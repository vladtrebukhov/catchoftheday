import React from "react";
import Header from "./components/header.js";
import StorePicker from "./components/storepicker.js";
import Order from "./components/order.js";
import Inventory from "./components/inventory.js";

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    // initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    //update state (take copy of current state THEN update it )
    const fishes = {
      ...this.state.fishes
    };
    //add in new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({
      fishes: fishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>{" "}
        <Order />
        <Inventory addfish={this.addFish} />{" "}
      </div>
    );
  }
}

export default App;
