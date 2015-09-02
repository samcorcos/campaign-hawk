Modal = React.createClass({
  render() {
    return (
      <div className="modal-active-darken">
        <div className="modal-container">
          <div id="modal-content"></div>
          <AddVolunteerModalContent />
        </div>
      </div>
    )
  }
})

AddVolunteerModalContent = React.createClass({
  render() {
    return (
      <div>
        <div className="volunteer-form-row">
          <div className="volunteer-form-column-60">

          </div>
          <div className="volunteer-form-column-40">

          </div>
        </div>
        <div className="volunteer-form-row">
          <div className="volunteer-form-column-100">

          </div>
        </div>
      </div>
    )
  }
})
