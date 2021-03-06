import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {Table,Modal, ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import {url} from '../ApiUrl/urlapi';
import HeaderHome from '../components/header';
import {Button} from 'react-bootstrap'
import Numeral from 'numeral'
import {LoginSuccessAction} from '../redux/action';
import NotFound from './notfound'



class Cart extends Component {
    state = {
        datacart:[],
        cartData:[],
        modaldetail:false,
        indexdetail:0
    }

    componentDidMount(){
        
        Axios.get(`${url}orders?_expand=movie&userId=${this.props.UserId}&bayar=false`)
        .then((res)=>{
            
            var datacart=res.data
            var qtyarr=[]
            console.log(res.data)
            res.data.forEach(element => {
                qtyarr.push(Axios.get(`${url}ordersDetails?orderId=${element.id}`))
            });
            var qtyarrfinal=[]
            console.log(qtyarr)
            Axios.all(qtyarr)
            .then((res1)=>{
                res1.forEach((val)=>{
                    qtyarrfinal.push(val.data)
                })
                console.log(qtyarrfinal)
                var datafinal=[]
                datacart.forEach((val,index)=>{
                    datafinal.push({...val,qty:qtyarrfinal[index]})
                })
                console.log(datafinal)
                this.setState({
                    datacart:datafinal
                })
            }).catch((err)=>{

            })
        }).catch((err)=>{
            console.log(err)
        })
    }


    totalharga=()=>{
        var total=0

        this.state.datacart.map((val)=>{
            return total+=val.totalharga
        })

        total='Rp. '+ Numeral(total).format('0,0')+',00' 
        return total
        
    }



    renderCart=()=>{
       
        if(this.state.datacart!==null){
            if(this.state.datacart.length===0){
                return (<tr>
                    <td></td>
                    <td>Cart masih Kosong</td>
                </tr>)
            }
            return this.state.datacart.map((val,index)=>{
                return(
                    <tr key={index}>
                        <td style={{width:100}}>{index+1}</td>
                        <td style={{width:800}}>{val.movie.title}</td>
                        <td style={{width:800}}>{val.movie.studioId}</td>
                        <td style={{width:100}}>{val.jadwal}</td>
                        <td style={{width:100}}>{val.qty.length}</td>
                        <td style={{width:900}}>{'Rp. '+ Numeral(val.totalharga).format('0,0')+',00' }</td>

                        <td style={{width:100}}><Button  onClick={()=>this.setState({modaldetail:true,indexdetail:index})} variant='info'>Details</Button></td>
                        <td style={{width:100}}><Button variant='danger'>Cancel</Button></td>
                    </tr>
                )
            })
        }
    }
    render() {
        if (this.props.roleUser === "admin") {
            return <NotFound />;
          }
        if(this.props.UserId){
            return (
                <div>

                <Modal centered
                isOpen={this.state.modaldetail}
                toggle={() => {
                  this.setState({ modaldetail: false });
                }}
              >
                <ModalHeader>Details</ModalHeader>
                <ModalBody>
                  <Table >
                    <tbody>
                      <tr>
                        <th>No.</th>
                        <th>Seat</th>
                        
                      </tr>
                    </tbody>
                    <tbody>
                      {this.state.datacart !== null && this.state.datacart.length !== 0
                        ? this.state.datacart[this.state.indexdetail].qty.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{"abcdefghijklmnopqrstuvwxyz".toUpperCase()[val.row] + [val.seat + 1]}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </Table>
                </ModalBody>
              </Modal>




                <HeaderHome/>
                    <center style={{marginBottom:'50px'}}>
                        <Table style={{width:900
                        }} >
                            <thead>
                                <tr>
                                    <th style={{width:100}}>No.</th>
                                    <th style={{width:800}}>Title</th>
                                    <th style={{width:800}}>Nama Studio</th>
                                    <th style={{width:100}}>Jadwal</th>
                                    <th style={{width:100}}>Jumlah</th>
                                    <th style={{width:800}}>Total Harga</th>
                                    <th style={{width:100}}>Detail</th>
                                    <th style={{width:100}}>Cancel</th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                            <tfoot>
                            <tr>
                            <td></td>
                            <td style={{width:900,
                            fontWeight:'bold'}}>Total Keseluruhan</td>
                            
                            <td></td>
                            <td></td>
                            <td style={{
                                fontWeight:'bold'}}>{this.totalharga()}</td>
                            <td></td>
                            </tr>
                            
                        </tfoot>
                        </Table>
                        
                        <Button onClick={this.onClickCheckOut} variant='dark'>Checkout</Button>
                    </center>
                
                </div>
              );
        }
        return(
            <div>
                <NotFound/>
            </div>
        )
    }
}

const MapstateToprops=state=>{
    return{
        AuthLog:state.Auth.login,
        UserId:state.Auth.id,
        transaksi:state.Auth.transactions,
        roleUser:state.Auth.role
    }
}
export default connect(MapstateToprops,{LoginSuccessAction}) (Cart);