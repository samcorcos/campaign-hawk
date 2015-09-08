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
      let filterVoterDataLayer = function() {
        let clusterGroup = new L.MarkerClusterGroup();
        let datalayer = L.mapbox.featureLayer().setGeoJSON(this.props.data)
        clusterGroup.addLayer(datalayer)
        map.addLayer(clusterGroup)
      }
      filterVoterDataLayer()

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
        let averagePartyAffiliation = [];
        _.each(precinctFeatureCollections, (precinct) => {
          let justProperties = _.pluck(precinct.features, "properties")
          let justParty = _.pluck(justProperties, "party")
          let partyAffiliationArray = _.without(justParty, 0, 6);
          averagePartyAffiliation.push(d3.mean(partyAffiliationArray));
          precinctConcaveHulls.push(turf.convex(precinct, 0.1, 'miles'))
        })

        var scale = d3.scale.linear()
          .domain([d3.min(averagePartyAffiliation), d3.max(averagePartyAffiliation)])
          .range([1, 5]);

        let scaledPartyAffiliationArray = _.map(averagePartyAffiliation, scale)

        var colorScale = d3.scale.linear()
          .domain([1, 3, 5])
          .range(["blue", "gray", "red"])

        let scaledColorArray = _.map(scaledPartyAffiliationArray, colorScale)

        let scaledPrecinctConcaveHulls = _.map(precinctConcaveHulls, function(polygonFeatureGroup, i) {
          let propertiesObject = {
            title: precinctKeys[i],
            stroke: scaledColorArray[i],
            "stroke-opacity": 0.7,
            "stroke-width": 2,
            fill: scaledColorArray[i],
            "fill-opacity": 0.3
          };
          polygonFeatureGroup.properties = propertiesObject
          return polygonFeatureGroup
        })
        // console.log(precinctFeatureCollections[4]); // This is the one that breaks everything
        let precinctFeatureLayer = L.mapbox.featureLayer(scaledPrecinctConcaveHulls);
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
