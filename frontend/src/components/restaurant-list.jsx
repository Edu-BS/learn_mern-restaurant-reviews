import React, { useState, useEffect } from 'react';
import RestaurantDataService from "../services/restaurant"
import { Link } from 'react-router-dom';

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value
    setSearchName(searchName)
  }

  const onChangeSearchZip = e => {
    const searchZip = e.target.value
    setSearchZip(searchZip)
  }

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value
    setSearchCuisine(searchCuisine);
  }

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(res => {
        console.log(res.data);
        setCuisines(["All Cuisines"].concat(res.data))
      })
      .catch(err => {
        console.log(err);
      })
  }

  const refreshList = () => {
    retrieveRestaurants()
  }

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(res => {
        console.log(res.data);
        setRestaurants(res.data.restaurants)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const findByName = () => {
    find(searchName, "name")
  }

  const findByZip = () => {
    find(searchZip, "zipcode")
  }

  const findByCuisine = () => {
    if (searchCuisine == "All Cuisines")
      refreshList();
    else
      find(searchCuisine, "cuisine")
  }

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group col">

          <select onChange={onChangeSearchCuisine}>
            {cuisines.map((cuisine, index) => {
              return (
                <option key={index} value={cuisine}> {cuisine.substring(0, 20)} </option>
              )
            })}
          </select>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant, index) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          return (
            <div className="col-lg-4 pb-1" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                    <strong>Address: </strong>{address}
                  </p>
                  <div className="row">
                    <Link to={"/restaurants/" + restaurant._id} className="btn btn-primary col-lg-5 mx-1 mb-1">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
}

export default RestaurantsList;
