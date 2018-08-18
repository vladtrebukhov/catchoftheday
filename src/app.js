import React from "react";
import Header from "./components/header.js";
import StorePicker from "./components/storepicker.js";
import Order from "./components/order.js";
import Inventory from "./components/inventory.js";
import sampleFishes from "./sample-fishes.js";
import Fish from "./components/fish.js";
import base from "./base.js";

class App extends React.Component {
  constructor() {
    super();
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    // initial state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // sync current state to firebase database
  componentWillMount() {
    //runs before app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });

    //check if there is an order in localstorage

    const localStorageRef = localStorage.getItem(
      `order-${this.props.params.storeId}`
    );

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder(fish) {
    const order = {
      ...this.state.order
    };
    order[fish] = order[fish] + 1 || 1;
    this.setState({
      order: order
    });
  }

  removeFromOrder(eachFish) {
    const order = {
      ...this.state.order
    };

    //here I can use delete since order is not tied to firebase
    delete order[eachFish];

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

  removeFish(eachFish) {
    const fishes = {
      ...this.state.fishes
    };
    fishes[eachFish] = null;

    this.setState({
      fishes: fishes
    });
  }

  updateFish(eachFish, updatedFish) {
    const fishes = {
      ...this.state.fishes
    };

    fishes[eachFish] = updatedFish;
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
            {" "}
            {/* use Object.keys to get an array of the fish from the object, then return each Fish with a unique key and details */}{" "}
            {Object.keys(this.state.fishes).map(fish => {
              return (
                <Fish
                  key={fish}
                  fish={fish}
                  info={
                    this.state.fishes[fish] // used to pass into the fish function since you cant pass in the key PROP
                  }
                  addToOrder={this.addToOrder}
                />
              );
            })}{" "}
          </ul>{" "}
        </div>{" "}
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />{" "}
        <Inventory
          removeFish={this.removeFish}
          fishes={this.state.fishes}
          addfish={this.addFish}
          loadSamples={this.loadSamples}
          updateFish={this.updateFish}
          storeId={this.props.params.storeId}
        />{" "}
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
};

export default App;
