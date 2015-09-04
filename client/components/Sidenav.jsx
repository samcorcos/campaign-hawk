Sidenav = React.createClass({
  getInitialState() {
    return {
      tooltipDescription: "",
      showTooltip: false,
      tooltipX: "50px",
      tooltipY: "0px",
      popoutDescription: "",
      showPopout: false,
      popoutY: "0px"
    }
  },
  showTooltip(e) {
    this.setState({
      showTooltip: true,
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
      showTooltip: false
    })
  },
  showPopout(item, e) {
    e.target.removeEventListener('mouseover', e, false);
    this.setState({
      showPopout: true,
      showTooltip: false,
      popoutDescription: item.description,
      popoutY: e.nativeEvent.target.offsetTop + (e.nativeEvent.target.offsetHeight + 10) + "px"
    })
  },
  hidePopout(e) {
    this.setState({
      showPopout: false
    })
  },
  render() {
    return (
      <nav className="sidenav">
        <Popout
          showPopout={this.state.showPopout}
          popoutDescription={this.state.popoutDescription}
          popoutY={this.state.popoutY} />
        <SidenavTooltip
          showTooltip={this.state.showTooltip}
          tooltipDescription={this.state.tooltipDescription}
          tooltipX={this.state.tooltipX}
          tooltipY={this.state.tooltipY}/>
        <ul className="sidenav-list">
          <SidenavIcons
            showPopout={this.props.showPopout}
            setPopoutDescription={this.setPopoutDescription}
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
              case "Data Layers": return this.props.showPopout.bind(null, item.description);
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
