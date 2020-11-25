import React from 'react';
import {
 Select,
 MenuItem
} from '@material-ui/core';

export default class SelectColor extends React.Component {
  render() {
    return (
      <Select id={this.props.id} value={this.props.value || "default"} onChange={ this.props.onChange } variant={'outlined'}>
        <MenuItem value={'default'} className='default'>default</MenuItem>
        <MenuItem value={'red'} className='red'>red</MenuItem>
        <MenuItem value={'green'} className='green'>green</MenuItem>
        <MenuItem value={'blue'} className='blue'>blue</MenuItem>
        <MenuItem value={'purpure'} className='purpure'>purpure</MenuItem>
        <MenuItem value={'yellow'} className='yellow'>yellow</MenuItem>
      </Select>
    );
  }
}