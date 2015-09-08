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
  getInitialState() {
    return {
      voterSliderValue: 0
    }
  },
  handleDataLayerChange(e) {
    this.props.toggleDataLayer(e.target.id)
  },
  handleVoterSliderChange(e) {
    this.props.refreshVoterFilterLayer(e.target.value)
  },
  render() {
    let filterRange = (
      <div className="filter-voter-range">
        <span>0%</span><input type="range" onChange={this.handleVoterSliderChange} defaultValue={this.state.voterSliderValue}/><span>100%</span>
      </div>
    )
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
            <input onChange={this.handleDataLayerChange} type='radio' name='data-layer-group' id='filter-non-voters' />
            <label htmlFor='filter-non-voters'>Filter Non-Voters</label>
            {filterRange}
          </li>
        </ul>
      </div>
    )
  }
})
