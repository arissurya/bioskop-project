import React, { Component } from 'react';
import FooterHome from '../components/footer';
import HeaderHome from '../components/header'
import {Table} from 'reactstrap'
import {Button} from 'react-bootstrap'




class History extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
            <HeaderHome/>
            <center style={{marginBottom:'50px'}}>
            <Table style={{width:900
            }} >
                <thead>
                    <tr>
                        <th style={{width:100}}>No.</th>
                        <th style={{width:100}}>Tanggal</th>
                        <th style={{width:100}}>Qty</th>
                        <th style={{width:200}}>Total Harga</th>
                        <th style={{width:100}}>Detail</th>
                    </tr>
                </thead>
                <tbody>
                <tr >
                    <td style={{width:100}}>1</td>
                    <td style={{width:100}}>19/2/2019</td>
                    <td style={{width:100}}>2</td>
                    <td style={{width:200}}>200.000</td>
                    <td style={{width:100}}><Button variant='warning'>Details</Button></td>
                
                 </tr>
                </tbody>
                
            </Table>
            
        </center>
            
            </div>
         );
    }
}
 
export default History;