import React, { Component } from 'react';

// The problem with mapping children is that we don't have structural flexbility, meaning that the elements being rendered always have to be direct descendands of their parent otherwhise, the functionality breaks. To solve this we need to use context

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
