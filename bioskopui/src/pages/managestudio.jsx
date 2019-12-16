import React, { Component } from 'react';
import FooterHome from '../components/footer';
import HeaderHome from '../components/header'


class ManageStudio extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <HeaderHome/>
            Halaman Manage Studio
            <FooterHome/>
            </div>
         );
    }
}
 
export default ManageStudio;