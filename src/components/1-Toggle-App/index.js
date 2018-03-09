import React, { Component } from 'react';
import Proptypes from 'prop-types';

// The problem with mapping children is that we don't have structural flexbility, meaning that the elements being rendered always have to be direct descendands of their parent otherwhise, the functionality breaks. To solve this we need to use context

const TOGGLE_CONTEXT = '__toggle__';

const ToggleOn = ({ children }, context) => {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? children : null;
};

ToggleOn.contextTypes = { [TOGGLE_CONTEXT]: Proptypes.object.isRequired };

const ToggleOff = ({ children }, context) => {
  const { on } = context[TOGGLE_CONTEXT];
  return on ? null : children;
};

ToggleOff.contextTypes = { [TOGGLE_CONTEXT]: Proptypes.object.isRequired };

const ToggleButton = (props, context) => {
  const { on, toggle } = context[TOGGLE_CONTEXT];
  return <Switch on={on} onClick={toggle} {...props} />;
};

ToggleButton.contextTypes = { [TOGGLE_CONTEXT]: Proptypes.object.isRequired };

class Toggle extends Component {
  static On = ToggleOn;
  static Off = ToggleOff;
  static Button = ToggleButton;
  static defaultProps = { onToggle: () => {} };
  static childContextTypes = {
    [TOGGLE_CONTEXT]: Proptypes.object.isRequired
  };
  state = { on: false };

  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on)
    );

  getChildContext = () => ({
    [TOGGLE_CONTEXT]: {
      on: this.state.on,
      toggle: this.toggle
    }
  });

  render() {
    return <div>{this.props.children}</div>;
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
