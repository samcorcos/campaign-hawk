Popout = React.createClass({
  render() {
    var popoutStyle = {
      top: this.props.popoutY,
      left: "50px"
    }
    if (this.props.showPopoutState) {
      popoutStyle.opacity = "1";
      popoutStyle.visibility = "visible";
    } else {
      popoutStyle.opacity = "0";
      popoutStyle.visibility = "hidden";
    }
    return (
      <div className="popout-container" style={popoutStyle}>
        <div>{this.props.popoutContent}</div>
        <div className="tail"></div>
      </div>
    )
  }
})

DataLayerPopoutContent = React.createClass({
  handleDataLayerChange(e) {
    this.props.toggleDataLayer(e.target.id)
  },
  render() {
    return (
      <div className='popout-content'>
        <ul>
          <li>
            <input onChange={this.handleDataLayerChange} type='radio' name='data-layer-group' id='no-data' defaultChecked="checked" />
            <label htmlFor='no-data'>No Data</label>
          </li>
          <li>
            <input onChange={this.handleDataLayerChange} type='radio' name='data-layer-group' id='voter-data2' />
            <label htmlFor='voter-data2'>Voter Data 2</label>
          </li>
          <li>
            <input onChange={this.handleDataLayerChange} type='radio' name='data-layer-group' id='voter-data3' />
            <label htmlFor='voter-data3'>Voter Data 3</label>
          </li>
        </ul>
      </div>
    )
  }
})
