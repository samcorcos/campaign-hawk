Modal = React.createClass({
  render() {
    let modalStyle = {
      visibility: "hidden",
      opacity: "0"
    }
    if (!!this.props.showModalState) {
      modalStyle.visibility =  "visible"
      modalStyle.opacity = "1"
    }
    return (
      <div className="modal-active-darken" style={modalStyle}>
        <div className="modal-container">
          {(() => {
            switch (this.props.showModalState) {
              case "Add Volunteer": return <AddVolunteerModalContent hideModal={this.props.hideModal}/>;
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
            <div className="close-modal-x" onClick={this.props.hideModal}>&times;</div>
          </div>
        </div>
        <div className="volunteer-form-row">
          <div className="volunteer-form-column-100">
            <textarea placeholder="Additional notes" />
          </div>
        </div>
        <div className="submit-modal-buttons">
          <button onClick={this.props.hideModal} className="button">Submit</button>
          <button onClick={this.props.hideModal} className="button-flat">Discard</button>
        </div>
      </div>
    )
  }
})
