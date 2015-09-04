Popout = React.createClass({
  render() {
    var popoutStyle = {
      top: this.props.popoutY,
      left: "50px"
    }
    if (this.props.showPopout) {
      popoutStyle.opacity = "1";
      popoutStyle.visibility = "visible";
    } else {
      popoutStyle.opacity = "0";
      popoutStyle.visibility = "hidden";
    }
    return (
      <div className="popout-container" style={popoutStyle}>
        <h1>this is a popout</h1>
        <p>{this.props.popoutDescription}</p>
        <div className="tail"></div>
      </div>
    )
  }
})
