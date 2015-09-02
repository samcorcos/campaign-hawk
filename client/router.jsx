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
      <Route component={App}>
        <Router component={Map} path="/" />
        <Router component={Login} path="login" />
      </Route>
    </Router>
  )
  React.render(AppRoutes, document.body)
})
