import React, { Component } from 'react';
import HeaderAdmin from '../components/header.admin';
import Dashboard from '../components/dashboard'
import FooterAdmin from '../components/footer.admin';


class AdminPage extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <HeaderAdmin/>
                <Dashboard/>
                <FooterAdmin/>
            </div>
         );
    }
}
 
export default AdminPage;