Meteor.startup(function() {
  Mapbox.load();
});

Tracker.autorun(function () {
	if (Mapbox.loaded()) {
		L.mapbox.accessToken = Meteor.settings.public.mapbox.accessToken;
		map = L.mapbox.map("map", Meteor.settings.public.mapbox.mapId);
	}
});

MapChild = React.createClass({
  toggleDataLayer(layerName) {
    if (!this.props.loading) {
      console.log(layerName);
    } else {
      alert("Not ready. Retrying in 3 seconds."); // What we eventually want is a loading spinner
      setTimeout(() => {
        this.toggleDataLayer(layerName);
      }, 3000)
    }
  },
  render() {
    if (!this.props.loading) {
      // var voterLayer = L.mapbox.featureLayer().addTo(map);
      // voterLayer.setGeoJSON(this.props.data);
    }
    return (
      <div>
        <Sidenav
          toggleDataLayer={this.toggleDataLayer}
          showModal={this.props.showModal} />
        <div className="content-wrapper">
          <Modal
            showModalState={this.props.showModalState}
            hideModal={this.props.hideModal} />
          <div id="map" className="mapbox"></div>
        </div>
      </div>
    )
  }
})

Map = React.createClass({
  getInitialState() {
    return {
      showModalState: false
    }
  },
  showModal(modalType) {
    this.setState({
      showModalState: modalType
    })
  },
  hideModal(e) {
    this.setState({
      showModalState: false
    })
  },
  render() {
    return (
      <MeteorData
        subscribe = { () => {
          return Meteor.subscribe('geojson') }}
        fetch = { () => {
          return {data: VoterDataGeoJSON.find().fetch() } }}
        render = { ({loading, data}) => {
          return <MapChild
            showModalState={this.state.showModalState}
            hideModal={this.hideModal}
            showModal={this.showModal}
            loading={loading}
            data={data}
          /> }
        }
      />
    )
  }
})
