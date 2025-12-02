import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import PreLogin from './pages/prelogin'
import Login from './pages/login'
import SignUp from './pages/signup'
import Listings from './pages/listings'
import ListingDetails from './pages/listingdetails';
import AdminListings from './pages/admin'
import UpdateAccount from './pages/updateaccount'
import AddListing from './pages/AddListing'
import OrderConfirmed from './pages/orderconfirmed'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PreLogin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/admin" component={AdminListings} />
        <Route exact path="/account" component={UpdateAccount} />
        <Route exact path="/list" component={AddListing} />
        {/* */}
        <Route path="/listings/:id" component={ListingDetails} />
        <Route exact path="/listings" component={Listings} />
        <Route exact path="/order-confirmed" component={OrderConfirmed} />

	

        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
