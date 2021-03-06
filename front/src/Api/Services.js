import axios from 'axios'
import jwt_decode from "jwt-decode";
import qs from "qs";


const errorHandler = err => {
  throw err;
};

const login = async (mail, pwd) => {
  var data = qs.stringify({
    mail,
    pwd
  })
  try {
    const response = await axios(
      {
        method: 'post',
        url: `http://localhost:8000/api/v1/clients/login?apikey=test`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      }

    );
    localStorage.setItem("token", JSON.stringify(response.data));
    localStorage.setItem("client", JSON.stringify(jwt_decode(response.data)));
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

const getPlat = async () => {
  try {
    const response = await axios(
      {
        method: 'get',
        url: 'http://localhost:8000/api/v1/plats?apikey=test',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const val = (response.data);
    // return JSON.parse(val);
    return val;
  } catch (error) {
    console.log(error);
  }
}
const signup = async (nom , mail, tel ,pwd) => {
  var data = qs.stringify({
    nom,
    mail,
    tel,
    pwd
  })
  try {
    const response = await axios(
      {
        method: 'post',
        url: `http://localhost:8000/api/v1/clients/signup?apikey=test`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      }

    );
    return JSON.stringify(response.data);
  } catch (error) {
    console.log(error);
  }
}

const logout = () => {
  localStorage.clear();
  window.location.reload();
}
const isLogin = () => {
  return localStorage.getItem("token") && localStorage.getItem("user")
  ? true
  : false;
}
// login(mail, pwd) {

//   return this.srv.post('/clients/login?apikey=test', {mail, pwd}, )
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


//     // .catch(errorHandler);
// },

// signup(firstname, lastname, service, role, email, password, confirmPassword, imageURL) {
//   return this.srv.post('/signup', {
//     firstname, 
//     lastname, 
//     service, 
//     role, 
//     email, 
//     password, 
//     confirmPassword,
//     imageURL
//   })
//     .then(response => response.data)
//     .catch(errorHandler);
// },

// loggedin() {
//   return this.srv.get('/loggedin')
//     .then(response => response.data)
//     .catch(errorHandler);
// },

// logout() {
//   return this.srv.get('/logout', {})
//     .then(response => response.data)
//     .catch(errorHandler);
// },

// edit(firstname, lastname, service, role, password, confirmPassword, imageURL) {
//   return this.srv.post('/edit', {
//     firstname, 
//     lastname, 
//     service, 
//     role, 
//     password,
//     confirmPassword,
//     imageURL
//   })
//     .then(response => response.data)
//     .catch(errorHandler);
// },

// upload(formdata) {
//   return this.srv.post('/upload', formdata)
//     .then(response => response.data)
//     .catch(errorHandler);
// },

// newBug(title, description, solution, services, status, severity){
//   return this.srv.post('/new-bug', {
//     title, 
//     description, 
//     solution, 
//     services, 
//     status, 
//     severity 
//   })
//   .then(response => response.data)
//   .catch(errorHandler);
// },

// bugsList(){
//   return this.srv.get('/bugs')
//   .then(response => response.data)
//   .catch(errorHandler);
// },

// serviceList(){
//   return this.srv.get('/services')
//   .then(response => response.data)
//   .catch(errorHandler);
// },

// newService(name, phone, email){
//   return this.srv.post('/new-service',{
//     name, 
//     phone,
//     email
//   })
//   .then(response => response.data)
//   .catch(errorHandler);
// }

export  {login, getPlat, signup, logout, isLogin};