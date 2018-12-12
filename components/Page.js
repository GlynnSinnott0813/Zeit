import React, { Component } from 'react';


import Meta from '../components/Meta';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


class Page extends Component {
    render() {
        return (
            <div>
                <Meta />
                <Header />
                <Nav />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Page;

