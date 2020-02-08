import React, { Component } from 'react'
import '../css/home.css';
import { Form ,FormControl, Button, Spinner, Alert  } from 'react-bootstrap'
import { fetchScan, fetchScanH, fetchScanSetPage } from './redux/action/actions';
import { connect } from 'react-redux';
import Popup from "reactjs-popup";
import tanjiro from '../tanjiro.jpg'
import Pagination from 'react-js-pagination';


const MapStateToProps = state =>({
    scanData: state.scanReq
});

const MapDispatchToProps = {
    fetchScan,
    fetchScanH,
    fetchScanSetPage,
}




 class Home extends Component {
     constructor(props){
         super(props);
         this.state = {
             recherche : ''
         };
         this.logOutset = this.logOutset.bind(this);
     }

     UNSAFE_componentWillMount(){
         this.props.fetchScanH();
     }

     componentDidUpdate(prevProps){
        const search = this.state.recherche;
         const currentPage = this.props.scanData.currentPage;
         if(prevProps.scanData.currentPage !== currentPage){
            this.props.fetchScan(search, currentPage);
        }

     }

    onSubmit(){
        const search = this.state.recherche;
        console.log(search);
        this.props.fetchScan(search);
    }

    logOutset(){
        this.props.handleLog(false);
    }


    render() {
        const {scanData, loading, errorStatus, currentPage, pageCount, totalItemsCount } = this.props.scanData;
        console.log(scanData);
        console.log(loading);
        console.log(errorStatus);
        console.log(this.props);
        console.log(totalItemsCount);
        console.log(currentPage);
        console.log(pageCount);
        

        return (
            <div>
                <div className="container" style={{width:"500px"}} >
                    {
                        (errorStatus === 401) && <Alert variant="danger"> veuillez vous reconnecter votre temps de connexion est expiré </Alert>
                    }
                </div>
               <div id="recherche">
                    <Form inline>
                        <FormControl name="recherche" type="text" placeholder="recherche"
                                     className="mr-sm-2" style={{width:"300px"}} 
                                     onChange={(e)=>this.setState({ recherche : e.target.value })}
                                     />
                        <Button variant="outline-success" onClick={this.onSubmit.bind(this)} >rechercher</Button>
                    </Form>
               </div>
               <div className="container" >
                    <table className="table table-hover">
                        { (scanData.length !== 0 && scanData !== null)&&
                        <thead>
                            <tr className="table-active">
                                <th>destinataire</th>
                                <th>montant</th>
                                <th>date</th>
                                <th>chemin</th>
                                <th>telephone</th>
                                <th> </th>
                            </tr>
                        </thead>
                        }
                        <tbody>
                            {
                                 loading ? (<tr>
                                    <td>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    </td>
                                    </tr>) : (
                                        scanData.map(oneScan =>(
                                            <tr key={oneScan.id}>
                                                <td>{oneScan.destinataire} </td>
                                                <td>{oneScan.montant} </td>
                                                <td>{oneScan.date} </td>
                                                <td>{oneScan.chemin} </td>
                                                <td>{oneScan.telephone} </td>
                                                <td>
                                                    <div>
                                                        <Popup
                                                            trigger={<button className="btn btn-primary btn-sm"> ouvrir </button>}
                                                            modal
                                                            closeOnDocumentClick
                                                        >
                                                           <img src={tanjiro} alt="tanj" width="100%" height="100%" />
                                                        </Popup>
                                                    </div>
                                                </td>
                                             
                                            </tr>
                                        ))
                                )
                            }
                        </tbody>
                    </table>
                    {
                        loading ? (" "):(
                            (scanData.length !== 0 && scanData !== null)&&
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={pageCount} 
                                totalItemsCount={totalItemsCount}
                                pageRangeDisplayed={5}
                                onChange={this.props.fetchScanSetPage}
                                nextPageText="suivant"
                                prevPageText="précédent"
                                itemClass="page-item"
                                linkClass="page-link"
                                
                            />
                        )
                    }
               </div>
            </div>
        )
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Home);