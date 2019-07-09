import React, { Component } from 'react';
import Sidebar from '../../Sidebar';
import Navbar from '../../Navbar';
import { connect } from 'react-redux';
import { getActivities } from '../../../actions/activityAction';
import { ClipLoader } from 'react-spinners';

class ActivityList extends Component {
    constructor() {
        super();
        this.state = {
            from :'',
            per_page :'',
            last_page:'',
            current_page:'',
            next_page_url:'',
            first_page_url:'',
            last_page_url:'',
            prev_page_url:'',
            searchQuery:'',
            test_type:'',
            sortColumn:'',
            sortOrder:'',
            loading:true
        };
    }

    componentDidMount() {

        this.props.getActivities();
    }

    componentWillUnmount() {
        this.$el.DataTable.destroy(true)
    }

    render() {
        let table_row;
         
        if (this.props.activities.activities.length > 0) {
            let tr;
            table_row =  this.props.activities.activities.map((data, i) => {
                return (  
                    <tr key={i}>
                        <td>{i += 1}</td>
                        <td>{data._id}</td>
                        <td>{data.eventid}</td>
                        <td><b>{data.content}</b></td>
                        <td><span className="btn btn-info btn-sm">{data.time}</span></td>
                            <td><button className="btn btn-info btn-sm">
                                <span className="glyphicon glyphicon-edit"></span> Edit
                            </button>
                            <button className="btn btn-danger btn-sm">
                                <span className="glyphicon glyphicon-trash"></span> Edit
                            </button>
                        </td>
                    </tr>
                )
            });
            
        }else {
            table_row = null;
        }

        let rows = [];
        for (let i = 1; i <= this.state.last_page; i++ ) {
            rows.push(<li className="page-item" key={i}><a className="page-link" href="#" onClick={(e)=>this.pagination('btn-click',e,i)}>{i}</a></li>);
        }

        return (
            <React.Fragment>
            <div className="loader-bg">
                <div className="loader-bar"></div>
            </div>

            <div id="pcoded" className="pcoded">
                <div className="pcoded-overlay-box"></div>
                <div className="pcoded-container navbar-wrapper">

                     {/* navbar */}
                        <Navbar />



                    <div className="pcoded-main-container">
                        <div className="pcoded-wrapper">

                             {/* sidebar */}
                                <Sidebar />
                            
                            {/* main content */}
                            <div className="pcoded-content">

                                <div className="page-header card">
                                    <div className="row align-items-end">
                                        <div className="col-lg-8">
                                            <div className="page-header-title">
                                                <i className="feather icon-watch bg-c-blue"></i>
                                                <div className="d-inline">
                                                    <h5>Activity info</h5>
                                                    <span>Setting up Activity</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="page-header-breadcrumb">
                                                <ul className=" breadcrumb breadcrumb-title">
                                                    <li className="breadcrumb-item">
                                                        <a href="index.html"><i className="feather icon-home"></i></a>
                                                    </li>
                                                    <li className="breadcrumb-item">
                                                        <a href="#!">Activity info</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pcoded-inner-content">
                                    <div className="main-body">
                                        <div className="page-wrapper">
                                            <div className="page-body">

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5> Activity Lists</h5>
                                                                <div className="card-header-right">
                                                                    <ul className="list-unstyled card-option">
                                                                        <li className="first-opt"><i
                                                                                className="feather icon-chevron-left open-card-option"></i>
                                                                        </li>
                                                                        <li><i className="feather icon-maximize full-card"></i></li>
                                                                        <li><i className="feather icon-minus minimize-card"></i>
                                                                        </li>
                                                                        <li><i className="feather icon-refresh-cw reload-card"></i>
                                                                        </li>
                                                                        <li><i className="feather icon-trash close-card"></i></li>
                                                                        <li><i
                                                                                className="feather icon-chevron-left open-card-option"></i>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="card-block">
                                                            <div className="table-responsive">
                                                         
                                                                        <table className="table table-xs table-hover table-outline card-table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                            <th>S/N</th>
                                                                            <th>Activity Id</th>
                                                                            <th>Event Id</th>
                                                                            <th>Content</th>
                                                                            {/* <th>Venue</th>
                                                                            <th>Start Date</th>
                                                                            <th>End Date</th> */}
                                                                            <th>Time</th>
                                                                            <th></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {table_row}
                                                                        </tbody>
                                                                        </table>
                                                                        {/* pagination */}
                                                                        <div className="dataTables_paginate paging_simple_numbers" id="example23_paginate">
                                                                            <ul className="pagination justify-content-end">
                                                                            <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('pre',e)}>Previous</a></li>
                                                                            {rows}
                                                                            <li className="page-item"><a className="page-link" href="#" onClick={(e)=>this.pagination('next',e)}>Next</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                           
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>

                            <div id="styleSelector">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    events: state.events,
    activities: state.activities
});

export default connect(mapStateToProps, { getActivities })(ActivityList);
