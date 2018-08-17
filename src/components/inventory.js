import React, { Component } from "react";
import AddFishForm from "./addFishForm.js";

class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, eachFish) {
    const fish = this.props.fishes[eachFish];

    //take a copy of that fish and update it with the new data
    const updatedFish = { ...fish, [event.target.name]: event.target.value };

    this.props.updateFish(eachFish, updatedFish);
  }

  renderInventory(eachFish) {
    const fish = this.props.fishes[eachFish];
    return (
      <div className="fish-edit" key={eachFish}>
        <input
          onChange={event => this.handleChange(event, eachFish)}
          defaultValue={fish.name}
          name="name"
          type="text"
          placeholder="Fish Name"
        />
        <input
          onChange={event => this.handleChange(event, eachFish)}
          defaultValue={fish.price}
          name="price"
          type="text"
          placeholder="Fish Price"
        />
        <select
          onChange={event => this.handleChange(event, eachFish)}
          defaultValue={fish.status}
          type="text"
          name="status"
          placeholder="Fish Status"
        >
          <option defaultValue="available">Fresh!</option>
          <option defaultValue="unavailable">Sold Out!</option>
        </select>
        <textarea
          onChange={event => this.handleChange(event, eachFish)}
          defaultValue={fish.desc}
          type="text"
          name="desc"
          placeholder="Fish Desc"
        />
        <input
          onChange={event => this.handleChange(event, eachFish)}
          defaultValue={fish.image}
          name="image"
          type="text"
          placeholder="Fish Image"
        />
        <button
          onClick={() => {
            this.props.removeFish(eachFish);
          }}
        >
          Remove Fish
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addfish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired
};

export default Inventory;
