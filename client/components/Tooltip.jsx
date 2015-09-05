SidenavTooltip = React.createClass({
  render() {
    tooltipStyle = {
      top: this.props.tooltipY,
      left: this.props.tooltipX
    }
    if (this.props.showTooltipState) {
      tooltipStyle.opacity = "1";
      tooltipStyle.visibility = "visible";
    } else {
      tooltipStyle.opacity = "0";
      tooltipStyle.visibility = "hidden";
    }
    return (
      <div className="sidenav-tooltip" style={tooltipStyle}>
        <p>{this.props.tooltipDescription}</p>
        <div className="tail"></div>
      </div>
    )
  }
})
