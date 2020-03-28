import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../actions/login';

import UserCard from '../components/userCard';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterData: [],
      filter: false,
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getUsersSucces !== prevProps.getUsersSucces &&
      this.props.getUsersSucces
    ) {
      this.setData(this.props.users);
    }
  }

  setData = data => {
    this.setState({
      data: data,
      filterData: data,
    });
  };

  handleOnFilter = () => {
    const { filter, data } = this.state;
    if (!filter) {
      const filterData = data.filter(item => {
        const { age, firstName, lastName } = item;
        const fullName = `${firstName}${lastName}`;
        if (age >= 20 && age < 30 && fullName.length >= 10) {
          return item;
        }
      });

      this.setState({
        filter: true,
        filterData: filterData,
      });
    } else {
      this.setState({
        filter: false,
        filterData: data,
      });
    }
  };

  render() {
    const { filterData, filter } = this.state;
    return (
      <div>
        <div className="title-container">
          <h2 className="title-user">Users</h2>
        </div>
        <div>
          <button className="filter-button" onClick={this.handleOnFilter}>
            {!filter ? 'Apply Filter' : 'Clear Filter'}
          </button>
        </div>
        <div className="container-fluid">
          {filterData &&
            filterData.map((item, index) => {
              return <UserCard item={item} index={index} />;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.loginReducer.users,
    getUsersSucces: state.loginReducer.getUsersSucces,
    error: state.loginReducer.error,
  };
};

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));
