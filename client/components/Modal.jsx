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
          <div className="volunteer-form-column-55">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Phone" />
          </div>
          <div className="volunteer-form-column-45">
            <div className="profile-image-wrapper">
              <img src="https://goo.gl/PoNcsv" />
            </div>
            <button className="button-flat">Upload Photo</button>
            <div className="close-modal-x">&times;</div>
          </div>
        </div>
        <div className="volunteer-form-row">
          <div className="volunteer-form-column-100">
            <textarea placeholder="Additional notes" />
          </div>
        </div>
        <div className="submit-modal-buttons">
          <button className="button">Submit</button>
          <button className="button-flat">Discard</button>
        </div>
      </div>
    )
  }
})
