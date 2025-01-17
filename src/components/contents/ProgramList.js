import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { getPrograms, deleteProgram } from '../../actions/programAction';
import Pagination from '../Pagination';
import Spinner from '../../common/Spinner';

class ProgramList extends Component {
    constructor() {
        super();
        this.state = {
            success: null,
            currentPage: 1,
            postsPerPage: 10,
        }
    }

    componentDidMount() {
        this.props.getPrograms();
    }

    handleDelete(id, e) {
        e.preventDefault();
    
        let data = {id: id};
        this.props.deleteProgram(data).then(res => {
            this.setState({ success: `Program deleted Successfully`})
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }   

    render() {
        let {programs, loading} = this.props.programs;
         // spinner
         let spinner;

         if(programs.length < 0 || loading) {
             spinner = <Spinner />;
         }
        // pagination
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = programs.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = (pageNumber) => this.setState({currentPage: pageNumber});
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
                                                    <h5>Program info</h5>
                                                    <span>Setting up Program Informations</span>
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
                                                        <a href="/program"> Add Program info</a>
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
                                                                <h5> Program Lists</h5>
                                                                <div className="card-header-right">
                                                                    <a href="/program">
                                                                    <button className="btn btn-primary">Add Program</button>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="card-block">
                                                            {spinner}
                                                            <div className="table-responsive">
                                                                        <table  className="table table-xs table-hover table-outline card-table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                            {/* <th>S/N</th> */}
                                                                            {/* <th>Program Id</th> */}
                                                                            <th>Program Title</th>
                                                                            {/* <th>Venue</th>
                                                                            <th>Start Date</th>
                                                                            <th>End Date</th> */}
                                                                            <th>Date</th>
                                                                            <th>Start Time</th>
                                                                            <th>End Time</th>
                                                                            <th>Actions</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                           
                                                                            {currentPosts.map((data, i) => 
                                                                                  <tr key={i}>
                                                                                    {/* <td>{i += 1}</td> */}
                                                                                    {/* <td>{data._id}</td> */}
                                                                                    <td><b>{data.title}</b></td>
                                                                                    <td>{data.date.replace(/T/, ' ').replace(/\..+/, '').slice(0,10)}</td>
                                                                                    <td><span className="alert-danger">{data.start_time}</span></td>
                                                                                    <td><span className="alert-danger">{data.end_time}</span></td>
                                                                                    <td>
                                                                                    <a href={`/program-edit/${data._id}`}>
                                                                                        <button className="btn btn-info btn-sm">
                                                                                            <span className="glyphicon glyphicon-edit"></span> Edit
                                                                                        </button>
                                                                                    </a>
                                                                                        <button onClick={this.handleDelete.bind(this, data._id)} className="btn btn-danger btn-sm">
                                                                                            <span className="glyphicon glyphicon-trash"></span> Delete
                                                                                        </button>
                                                                                    </td>
                                                                               </tr>
                                                                            )}
                                                                        </tbody>
                                                                        </table>
                                                                        <Pagination postsPerPage={this.state.postsPerPage} totalPosts={programs.length} paginate={paginate} />
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

// export default ProgramList;
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    events: state.events,
    programs: state.programs
});

// export default Event;
export default connect(mapStateToProps, { getPrograms, deleteProgram })(ProgramList);