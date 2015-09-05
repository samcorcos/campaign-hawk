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
