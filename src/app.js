import React from "react";
import Header from "./components/header.js";
import StorePicker from "./components/storepicker.js";
import Order from "./components/order.js";
import Inventory from "./components/inventory.js";
import sampleFishes from "./sample-fishes.js";
import Fish from "./components/fish.js";

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    // initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(fish) {
    const order = { ...this.state.order };
    order[fish] = order[fish] + 1 || 1;
    this.setState({
      order: order
    });
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
          <ul className="list-of-fishes">
            {/* use Object.keys to get an array of the fish from the object, then return each Fish with a unique key and details */}
            {Object.keys(this.state.fishes).map(fish => {
              return (
                <Fish
                  key={fish}
                  fish={fish} // used to pass into the fish function since you cant pass in the key PROP
                  info={this.state.fishes[fish]}
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addfish={this.addFish} loadSamples={this.loadSamples} />{" "}
      </div>
    );
  }
}

export default App;
