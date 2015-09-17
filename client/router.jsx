const {
  Router,
  Route,
  Redirect
} = ReactRouter;
const {
  history
} = ReactRouter.lib.BrowserHistory;
Meteor.startup(function() {
  let AppRoutes = (
    <Router history={history}>
      <Route component={App} path="/">
        <Route component={Map} path="map/:code" />
        <Route component={Login} path="login" />
      </Route>
      <Redirect from="/" to="/map/:code" />
    </Router>
  )
  React.render(AppRoutes, document.body)
})
