App = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

// MeteorData = React.createClass({
//   componentWillMount() {
//     this.c = Tracker.autorun(() => {
//       const sub = this.props.subscribe()
//       const state = this.props.fetch()
//       state.loading = !sub.ready()
//       this.setState(state)
//     })
//   },
//   componentWillUnmount() {
//     this.c.stop()
//   },
//   render() {
//     return this.state ? this.props.render(this.state) : false
//   }
// })

MeteorData = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const sub = this.props.subscribe()
    const data = this.props.fetch()
    data.loading = !sub.ready()
    return data;
  },
  render() {
    return this.props.render(this.data)
  }
})
