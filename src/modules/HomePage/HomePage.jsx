import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';

import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';

import ChatBot from "../chatbot";

import { userActions, expenseAction } from '../../actions';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = { selectedMonth: 'All', selectedYear: 2016, data: [], activeTab: 2016 };
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-12">
                <h3>Hi {user.firstName}!</h3>
                {/* {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                } */}
                <p>
                    <Link to="/login">Logout</Link>
                </p>

                <div>
                    <nav class="nav">
                        <a class="nav-link active" href="#">2016</a>
                        <a class="nav-link" href="#">2017</a>
                        <a class="nav-link" href="#">2018</a>
                        <a class="nav-link" href="#">2019</a>
                    </nav>
                    {/* <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} /> */}
                    <table>
                        <thead>
                            <tr><th></th><th className='desc-col'>Description</th><th className='button-col'>Amount</th><th className='button-col'>Month</th><th className='button-col'>Year</th><th className='button-col'>Update</th><th className='button-col'>Delete</th></tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((exp) => {
                                    return <tr><td className='counterCell'></td><td className='desc-col'>{exp.description}</td><td className='button-col'>{exp.amount}</td><td className='button-col'>{exp.month}</td><td className='button-col'>{exp.year}</td></tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <ChatBot />
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getAllExpense: expenseAction.getAll
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };