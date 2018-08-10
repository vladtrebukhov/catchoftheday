import React from "react";
import { getFunName } from "../helpers.js";

class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    // first grab text from the box
    const storeId = this.storeInput.value;
    //second transition from / to /store/:storeid
    console.log(`Going to ${storeId}`);
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      <form
        className="store-selector"
        onSubmit={event => this.goToStore(event)}
      >
        {/* This is the syntax for comments inside JSX */}
        <h2> Please Enter a Store </h2>
        <input
          ref={input => {
            this.storeInput = input;
          }}
          type="text"
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit"> Visit Store - > </button>
      </form>
    );
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
};

export default StorePicker;
