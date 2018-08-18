import React, { Component } from "react";
import AddFishForm from "./addFishForm.js";
import base from "../base.js";

class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);

    this.state = {
      uid: null,
      owner: null
    };
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  logOut() {
    base.unauth();
    this.setState({
      uid: null
    });
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    console.log(authData);

    if (err) {
      console.log(err);
      return;
    }

    //get store info from firebase
    const storeReference = base.database().ref(this.props.storeId);

    //query the firebase once for the store data
    storeReference.once("value", snapshot => {
      const data = snapshot.val() || {};

      if (!data.owner) {
        storeReference.set({
          owner: authData.user.uid
        });
      }
      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your stores inventory</p>
        <button className="github" onClick={() => this.authenticate("github")}>
          Log in with Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate("facebook")}
        >
          Log in with Facebook
        </button>
      </nav>
    );
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
    const logout = <button onClick={this.logOut}>Log Out!</button>;
    //check if user is not logged in
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    //check if user is owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store</p>
          {logout}
        </div>
      );
    }
    return (
      <div>
        <h2>Inventory</h2>
        <button className="github" onClick={() => this.authenticate("github")}>
          Log in with Github
        </button>
        {logout}
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
  addfish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default Inventory;
