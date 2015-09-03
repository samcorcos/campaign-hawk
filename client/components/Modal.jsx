Modal = React.createClass({
  render() {
    let modalStyle = {
      visibility: "hidden"
    }
    if (!!this.props.showModal) {
      modalStyle.visibility =  "visible"
    }
    return (
      <div className="modal-active-darken" style={modalStyle}>
        <div className="modal-container">
          {(() => {
            switch (this.props.showModal) {
              case "Add Volunteer": return <AddVolunteerModalContent />;
              case "View Volunteers": return <h1>view volunteers</h1>;
              default: return false;
            }
          })()}
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
