import React, { Component } from 'react';

// Compound components allows you to share implicit state between the parent component and its children with some functionality as well. This gives the developer more control over the order of the component rendering. In this exercice we use three children that get pass some props and the state from the Toggle parent component. To pass the props, React uses a special maps method for that grabs the children that the developers defines, creates a copy of them and sets them up with the props the developers needs the children to have.

const ToggleOn = ({ on, children }) => {
  return on ? children : null;
};

const ToggleOff = ({ on, children }) => {
  return on ? null : children;
};

const ToggleButton = ({ on, toggle, ...props }) => {
  return <Switch on={on} onClick={toggle} {...props} />;
};

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = { onToggle: () => {} };
  state = { on: false };

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  render() {
    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle
      })
    );
    return <div>{children}</div>;
  }
}

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

const ToggleWrap = () => {
  return (
    <Toggle onToggle={on => console.log('toggle', on)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Button />
      <Toggle.Off>The button is off</Toggle.Off>
    </Toggle>
  );
};

export default ToggleWrap;
