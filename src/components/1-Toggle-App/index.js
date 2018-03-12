import React, { Component } from 'react';
import Proptypes from 'prop-types';

const TOGGLE_CONTEXT = '__toggle__';

const withToggle = Component => {
  // To fix the prop namespace clash I put a toggle name to wrap all the props that come from the Toggle context
  const Wrapper = (props, context) => {
    const componentContext = context[TOGGLE_CONTEXT];
    return <Component toggle={componentContext} {...props} />;
  };

  Wrapper.contextTypes = {
    [TOGGLE_CONTEXT]: Proptypes.object.isRequired
  };

  return Wrapper;
};

const ToggleOn = withToggle(({ children, toggle: { on } }) => {
  return on ? children : null;
});

const ToggleOff = withToggle(({ children, toggle: { on } }) => {
  return on ? null : children;
});

const ToggleButton = withToggle(({ toggle: { on, toggle } }, props) => {
  return <Switch on={on} onClick={toggle} {...props} />;
});

const MyOwnToggleBtn = withToggle(({ toggle: { on, toggle } }) => (
  <button onClick={toggle}>{on ? 'on' : 'off'}</button>
));

// Component with prop namespace clash. In this case when we use the withToggle HOC we are returning the new component with the props from withToggle but we are also providing props to the MyEventComp and with the same name (on). When this happens it's called a prop namespace clash, where a prop with the same name overwrites the functionality of the other prop

const MyEventComp = withToggle(({ toggle, on, event }) => {
  const props = { [event]: on };

  return toggle.on ? <button {...props}>The {event} event</button> : null;
});

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
      <hr />
      <MyEventComp event="onClick" on={e => console.log(e.type)} />
    </Toggle>
  );
};

export default ToggleWrap;
