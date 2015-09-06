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
        // get all the features
        let allDataFeatures = VoterDataGeoJSON.find().fetch()[0].features;
        // need unique points. husbands and wives will have the same address and it will break turf.concave
        var stringOfCoords = new Set();
        let uniqueDataFeatures = _.filter(allDataFeatures, function(feature) {
          // if the string is not present in the array, return it and push the string to the stringOfCoords
          if (!stringOfCoords.has(feature.geometry.coordinates.toString())) {
            stringOfCoords.add(feature.geometry.coordinates.toString())
            return feature
          }
        })
        // index by precinct
        let groupByPrecinct = _.groupBy(uniqueDataFeatures, (feature) => { return feature.properties.precinct_name; })
        // get keys
        let precinctKeys = _.keys(groupByPrecinct);
        // create
        let precinctFeatureCollections = [];
        _.each(precinctKeys, (key) => {
          precinctFeatureCollections.push(turf.featurecollection(groupByPrecinct[key]))
        })
        // for each feature collection, create a new concave shape
        let precinctConcaveHulls = [];
        // _.each(precinctFeatureCollections, (precinct) => {
        //   precinctConcaveHulls.push(turf.concave(precinct, 5, 'miles'))
        // })
        // console.log(precinctFeatureCollections[4]);
        // console.log(turf.concave(precinctFeatureCollections[4], 1, 'miles'));
        // console.log(precinctConcaveHulls);
        VoterDataGeoJSON.insert(precinctFeatureCollections[4])

        // var hull = turf.concave(map.featureLayer.getGeoJSON(), 3, 'miles');
        // L.mapbox.featureLayer(hull).addTo(map);
      }
      precinctDataLayer()

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
