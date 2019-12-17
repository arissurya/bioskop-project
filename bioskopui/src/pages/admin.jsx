import React, { Component } from 'react';
import HeaderAdmin from '../components/header.admin';
import Dashboard from '../components/dashboard'
import FooterAdmin from '../components/footer.admin';
import {LoginSuccessAction} from '../redux/action';
import NotFound from './notfound'
import {connect} from 'react-redux'


class AdminPage extends Component {
    state = {  }
    render() 
    { 
        if (this.props.roleUser === "user") {
            return <NotFound />;
          } else {

        return ( 
           
            <div>
                <HeaderAdmin/>
                <Dashboard/>
                <FooterAdmin/>
            </div>
         
         );
          }    
}
}

const MapstateToprops=state=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        roleUser:state.Auth.role
     
    }
}
export default connect(MapstateToprops,{LoginSuccessAction}) (AdminPage);
 
