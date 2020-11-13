var React = require('react');
var ReactDOM = require('react-dom');
export default class SelectColor extends React.Component {
  render() {
    return (
      <select id={this.props.id} value={this.props.value} onChange={ this.props.onChange } >
        <option className='default'>default</option>
        <option className='red'>red</option>
        <option className='green'>green</option>
        <option className='blue'>blue</option>
        <option className='purpure'>purpure</option>
        <option className='yellow'>yellow</option>
      </select>
    );
  }
}