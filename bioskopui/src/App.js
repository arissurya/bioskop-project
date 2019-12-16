import React, {Component} from 'react';
import './App.css';
import HomePage from './pages/home';
import AdminPage from './pages/admin';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import MovieDetail from './pages/moviedetail';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux'
import {LoginSuccessAction} from './redux/action'
import Axios from 'axios';
import {url} from './ApiUrl/urlapi';
import Belitiket from './pages/belitiket'
import NotFound from './pages/notfound';
import Cart from './pages/cart'
import SettingUser from './pages/settinguser';
import ManageStudio from './pages/managestudio';
import History from './pages/history'

class App extends Component {
 
  state={
    loading:false
  }

  componentDidMount(){
    var id=localStorage.getItem('dino')
    Axios.get(`${url}users/${id}`)
    .then((res)=>{
      this.props.LoginSuccessAction(res.data)
      this.setState({loading:false})
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      this.setState({loading:false})
    })
  }

  render() { 
    return ( 
      <div >

      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/admin" exact component={AdminPage}/>
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/register" exact component={RegisterPage}/>
        <Route path="/moviedetail/:id" exact component={MovieDetail}/>
        <Route path='/belitiket' component={Belitiket} exact/>
        <Route path='/cart' component={Cart} exact/>
        <Route path='/settinguser' component={SettingUser} exact/>
        <Route path='/managestudio' component={ManageStudio} exact/>
        <Route path='/history' component={History} exact/>
        <Route path='/*' component={NotFound} exact/>


      </Switch>

    </div>
     );
  }
}

const MapstateToprops=(state)=>{
  return{
      AuthLog:state.Auth.login
  }
}

export default connect(MapstateToprops,{LoginSuccessAction})(App);
