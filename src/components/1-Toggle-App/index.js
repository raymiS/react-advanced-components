import React, { Component } from 'react';

const Switch = ({ on, className = '', ...props }) => {
  return (
    <div className="toggle">
      <input className="toggle-input" type="checkbox" />
      <button
        className={`${className} toggle-btn ${
          on ? 'toggle-btn-on' : 'toggle-btn-off'
        }`}
        aria-expanded={on}
        {...props}
      />
    </div>
  );
};

// Working with render props allows us to crate a function and return it in the render method of a class component. This way we have more control over how to diplay our components and functionality with any kind of tree html depth that we want without using things like the Context API

class Toggle extends Component {
  state = { on: false };
  static defaultProps = { onToggle: () => {} };

  toggle = () => {
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );
  };

  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle
    });
  }
}

function render({ on, toggle }) {
  return <Switch on={on} onClick={toggle} />;
}

const ToggleWrap = () => {
  return (
    <Toggle
      onToggle={on => console.log('toggle', on)}
      //render={render}
      render={({ on, toggle }) => (
        <div>
          <Switch on={on} onClick={toggle} />
          <div>
            <h1>{on ? 'on' : 'off'}</h1>
          </div>
        </div>
      )}
    />
  );
};

export default ToggleWrap;
