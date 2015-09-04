Meteor.startup(function() {
  if (VoterData.find().count() === 0) {
    HTTP.post("http://trc-backend-test.azurewebsites.net/login/code?code=" + Meteor.settings.accessCode, [], function(err, res) {
      var list = HTTP.get(res.data.Server + "/sheets/" + res.data.SheetId + "?type=json", {
        headers: {
          "Authorization": "Bearer " + res.data.AuthToken,
          "Accept":  "application/json; charset=utf-8"
        }
      }, function(err, res) {
        var keys = _.keys(res.data);
        _.each(res.data.RecId, function(item, i) {
          var voter = {};
          _.each(keys, function(key) {
            voter[key] = res.data[key][i]
          })
          VoterData.insert({
            rec_id: voter.RecId,
            first_name: voter.FirstName,
            last_name: voter.LastName,
            birthday: voter.Birthday,
            gender: voter.Gender,
            city: voter.City,
            zip: voter.Zip,
            address: voter.Address,
            lat: voter.Lat,
            long: voter.Long,
            party: voter.Party,
            history: voter.History,
            precinct_name: voter.PrecinctName
          });
        })
      })
    });
  }
})

var featureArray = [];
convertToGeoJSON = function() {
  _.each(VoterData.find().fetch(), function(voter) {
    featureArray.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [+voter.long, +voter.lat]
      },
      properties: {
        rec_id: voter.rec_id,
        first_name: voter.first_name,
        last_name: voter.last_name,
        birthday: new Date(voter.birthday).getTime(),
        gender: voter.gender,
        city: voter.city,
        zip: +voter.zip,
        address: voter.address,
        party: +voter.party,
        history: (parseFloat(voter.history)/100),
        precinct_name: voter.precinct_name
      }
    })
  })
}
convertToGeoJSON()
if (VoterDataGeoJSON.find().count() === 0) {
  VoterDataGeoJSON.insert({
    "type": "FeatureCollection",
    "features": featureArray
  })
}
