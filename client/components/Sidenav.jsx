Sidenav = React.createClass({
  getInitialState() {
    return {
      tooltipDescription: "",
      showTooltipState: false,
      tooltipX: "50px",
      tooltipY: "0px",
      popoutContent: "",
      showPopoutState: false,
      popoutY: "0px"
    }
  },
  showTooltip(e) {
    if (this.state.showPopoutState) { return null; }
    this.setState({
      showTooltipState: true,
      tooltipY: e.nativeEvent.target.offsetTop + (e.nativeEvent.target.offsetHeight / 2) + "px"
    })
  },
  setTooltipDescription(item) {
    this.setState({
      tooltipDescription: item.description
    })
  },
  hideTooltip(e) {
    this.setState({
      showTooltipState: false
    })
  },
  showPopout(item, e) {
    this.setState({
      showPopoutState: true,
      showTooltipState: false,
      popoutContent: item,
      popoutY: e.nativeEvent.target.offsetTop + (e.nativeEvent.target.offsetHeight + 10) + "px"
    })
  },
  hidePopout(e) {
    this.setState({
      showPopoutState: false
    })
  },
  render() {
    return (
      <nav className="sidenav">
        <Popout
          showPopoutState={this.state.showPopoutState}
          popoutContent={this.state.popoutContent}
          popoutY={this.state.popoutY} />
        <SidenavTooltip
          showTooltipState={this.state.showTooltipState}
          tooltipDescription={this.state.tooltipDescription}
          tooltipX={this.state.tooltipX}
          tooltipY={this.state.tooltipY}/>
        <ul className="sidenav-list">
          <SidenavIcons
            toggleDataLayer={this.props.toggleDataLayer}
            showPopoutState={this.state.showPopoutState}
            showPopout={this.showPopout}
            hidePopout={this.hidePopout}
            showModal={this.props.showModal}
            setTooltipDescription={this.setTooltipDescription}
            showTooltip={this.showTooltip}
            hideTooltip={this.hideTooltip} />
        </ul>
      </nav>
    )
  }
})

SidenavIcons = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.id !== this.props.id
  },
  handlePopoutClick(data, e) {
    this.props.showPopoutState ?
    this.props.hidePopout() :
    this.props.showPopout.bind(null, data, e)();
  },
  render() {
    let iconList = [
      {name: "fa fa-database", description: "Data Layers"},
      {name: "fa fa-user-plus", description: "Add Volunteer"},
      {name: "fa fa-users", description: "View Volunteers"},
      {name: "fa fa-bicycle", description: "Dispatcher"},
      {name: "fa fa-list-ul", description: "View as List"},
      {name: "fa fa-lightbulb-o", description: "Campaign Autopilot"},
      {name: "fa fa-list-ol", description: "Leaderboard"},
      {name: "fa fa-line-chart", description: "Fancy Charts"},
      {name: "fa fa-cog", description: "Settings"}
    ]
    let list = iconList.map((item) => {
      return (
        <li key={item.name}
          onClick={(() => {
            switch (item.description) {
              case "Add Volunteer": return this.props.showModal.bind(null, item.description);
              case "View Volunteers": return this.props.showModal.bind(null, item.description);
              case "View as List": return this.props.showModal.bind(null, item.description);
              case "Leaderboard": return this.props.showModal.bind(null, item.description);
              case "Data Layers": return this.handlePopoutClick.bind(null, <DataLayerPopoutContent toggleDataLayer={this.props.toggleDataLayer} />);
              default: return null;
            }
          })()}
          onMouseEnter={this.props.setTooltipDescription.bind(null, item)}
          onMouseOver={this.props.showTooltip}
          onMouseOut={this.props.hideTooltip}
          className="sidenav-list-item">
          <i className={item.name}></i>
        </li>
      )
    })
    return (
      <div>
        {list}
      </div>
    )
  }
})
