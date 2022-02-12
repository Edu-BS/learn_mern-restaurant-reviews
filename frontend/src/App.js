import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import AddReview from './components/add-review.jsx';
import RestaurantsList from './components/restaurant-list.jsx';
import Restaurant from './components/restaurants.jsx';
import Login from './components/login.jsx';

function App() {

  // React hook. This is the way to make variables in React
  const [user, setUser] = React.useState(null)

  async function login(user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <a href='/restaurants' className='navbar-brand'>
          Restaurant Reviews
        </a>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={"/restaurants"} className='nav-link'>
              Restaurants
            </Link>
          </li>
          <li className='nav-item'>
            {user ? (
              <a onClick={logout} className='nav-link' style={{ cursor: "pointer" }}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className='nav-link'>
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className='container mt-3'>
        <Routes>
          {/* In react-router-dom v6 you can't use {["/", "/restaurants"]} */}
          <Route exact path="/" element={<RestaurantsList />} />
          <Route exact path="/restaurants" element={<RestaurantsList />} />
          <Route
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route
            path="/restaurants/:id"

            element={<Restaurant user={user} />}
          />
          <Route
            path="/login"
            // render={(props) => (
            //   <Login {...props} login={login} />
            // )}
            element={<Login login={login} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
