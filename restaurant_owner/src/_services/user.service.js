import config from "config";
import { authHeader } from "../_helpers";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  addBreakfast,
  delete: _delete
};
const axiosGraphQL = "http://localhost:8080/graphql";

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch(axiosGraphQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors",
    body: JSON.stringify({
      query: `query {
        ownerLogin(email: "abcde@gmail.com", password:"123") {
              _id, name, zipcode, restaurant_name, email, password, cuisine
            }
          }
        `,
      variables: {
        email: email,
        password: password
      }
    })
  })
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      //localStorage.setItem("token", user.jwt);

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function register(user) {
  return fetch(axiosGraphQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors",
    body: JSON.stringify({
      mutation: `mutation createOwner ( $name : String!, $zipcode :String!,$restaurant_name : String!,$email : String!,$password : String!,$cuisine : String!){
        createOwners( name : $name, zipcode : $zipcode, restaurant_name :$restaurant_name, email : $email, password : $password, cuisine : $cuisine){
          name,
          zipcode,
          restaurant_name,
          email,
          password,
          cuisine
        }
      }
        `,
      variables: {
        name: user.name,
        zipcode: user.zipcode,
        restaurant_name: user.restaurant_name,
        email: user.email,
        password: user.password,
        cuisine: user.cuisine
      }
    })
  }).then(handleResponse);
}

function addBreakfast(menu_breakfast) {
  return fetch(axiosGraphQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors",
    body: JSON.stringify({
      mutation: `addMenuItem (  $name : String!, $description :String!,$price : String!, $type: String!){
        addMenu(name : $name, description : $description, price :$price,type :$type){
          name,
          description,
          price,
          type
        }
      }
        `,
      variables: {
        name: menu_breakfast.name,
        description: menu_breakfast.description,
        price: menu_breakfast.price,
        type: menu_breakfast.type
      }
    })
  }).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  console.log("response here!!", response);
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log("print resp" + response);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
