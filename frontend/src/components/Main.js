
import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import Dashboard from './user/Dashboard';
import { isAuthenticated, userInfo } from '../utils/auth';
import AdminDashboard from './admin/AdminDashboard';

class Main extends Component {
    state = {
        auth: false,
        role: ''
    }
    useAuth = () => {
        this.setState({
            auth: isAuthenticated()
        });
        if (isAuthenticated()) {
            const { role } = userInfo();
            this.setState({
                role: role
            })
        }
        //console.log(this.state.role);
    }
    render() {
        this.useAuth();
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={this.state.auth || isAuthenticated() ? (<Home />) : (<Login />)} />
                <Route path='/register' element={this.state.auth || isAuthenticated() ? (<Home />) : (<Register />)} />
                <Route path='/logout' element={<Navigate to='/login' />} />
                <Route
                    path='/user/dashboard'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Dashboard />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/admin/dashboard'
                    element={
                        ((this.state.auth || isAuthenticated()) && (this.state.role === 'admin' || userInfo().role === 'admin')) ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate
                                to='/'
                            />
                        )
                    }
                />
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes >
        )
    }



}

export default Main;