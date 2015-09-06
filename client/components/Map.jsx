Meteor.startup(function() {
  Mapbox.load({
    plugins: [
      "turf",
      "markercluster",
      "omnivore"
    ]
  });
});

Tracker.autorun(function () {
  let handle = Meteor.subscribe('geojson');
	if (Mapbox.loaded() && handle.ready()) {
    // let x = turf.center(VoterDataGeoJSON.find().fetch()[0]).geometry.coordinates
		L.mapbox.accessToken = Meteor.settings.public.mapbox.accessToken;
		map = L.mapbox.map("map", Meteor.settings.public.mapbox.mapId) //.setView([47.736534, -121.956672], 14) // reset this
	}
});

MapChild = React.createClass({
  toggleDataLayer(layerName) {
    if (!this.props.loading) {
      let precinctDataLayer = function() {
        let allDataFeatures = VoterDataGeoJSON.find().fetch()[0].features;
        var stringOfCoords = new Set();
        let uniqueDataFeatures = _.filter(allDataFeatures, function(feature) {
          if (!stringOfCoords.has(feature.geometry.coordinates.toString()) && feature.geometry.coordinates.toString() != "0,0") {
            stringOfCoords.add(feature.geometry.coordinates.toString())
            return feature
          }
        })
        let groupByPrecinct = _.groupBy(uniqueDataFeatures, (feature) => { return feature.properties.precinct_name; })
        let precinctKeys = _.keys(groupByPrecinct);
        let precinctFeatureCollections = [];
        _.each(precinctKeys, (key) => {
          precinctFeatureCollections.push(turf.featurecollection(groupByPrecinct[key]))
        })
        let precinctConcaveHulls = [];
        _.each(precinctFeatureCollections, (precinct) => {
          precinctConcaveHulls.push(turf.convex(precinct, 0.1, 'miles'))
        })
        // console.log(precinctFeatureCollections[4]);
        let precinctFeatureLayer = L.mapbox.featureLayer(precinctConcaveHulls);
        map.addLayer(precinctFeatureLayer);
      }

      let allDataLayer = function() {
        let clusterGroup = new L.MarkerClusterGroup();
        let datalayer = L.mapbox.featureLayer().setGeoJSON(this.props.data)
        clusterGroup.addLayer(datalayer)
        map.addLayer(clusterGroup)
      }
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
