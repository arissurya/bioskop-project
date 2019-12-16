import React, { Component } from 'react';
import FooterHome from '../components/footer';
import HeaderHome from '../components/header'


class SettingUser extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <HeaderHome/>
                Halaman Setting User
                <FooterHome/>
            </div>
         );
    }
}
 
export default SettingUser;