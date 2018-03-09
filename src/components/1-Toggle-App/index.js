import React, { Component } from 'react';
import Proptypes from 'prop-types';

/* If we wanted to add another component inside our Toggle component tree we need to wire Context to it. But what happens if we wanted to use the Toggle component across the application? It's not very safe to wire it with Context because at the time it's an experimental API so any changes or updates on the API, might cause big trouble for the whole app. To work around this we'll create a Higher Order Component and inside that HOC we will "save" the context functionality so that we can only wire Context to a children instead to the entire Toggle Component parent

Higher Order Components allows us to separate functinality that can be rehuse across different components. It doesn't matter which kind, the HOC "saves" the functionality and we just add the component that we want to enhanced the functionality to.
*/

const TOGGLE_CONTEXT = '__toggle__';

const withToggle = Component => {
  const Wrapper = (props, context) => {
    const componentContext = context[TOGGLE_CONTEXT];
    return <Component {...componentContext} {...props} />;
  };

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: Proptypes.object.isRequired
  };

  return Wrapper;
};

const ToggleOn = withToggle(({ children, on }) => {
  return on ? children : null;
});

const ToggleOff = withToggle(({ children, on }) => {
  return on ? null : children;
});

const ToggleButton = withToggle(({ on, toggle }, props) => {
  return <Switch on={on} onClick={toggle} {...props} />;
});

const MyOwnToggleBtn = withToggle(({ on, toggle }) => (
  <button onClick={toggle}>{on ? 'on' : 'off'}</button>
));

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
      <MyOwnToggleBtn />
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  );
};

export default ToggleWrap;
