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

class Toggle extends Component {
  state = { on: false };

  toggle = () => {
    this.setState(state => ({ on: !this.state.on }));
  };
  render() {
    const { on } = this.state;
    return <Switch on={on} onClick={this.toggle} />;
  }
}

export default Toggle;
