import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Main extends Component{

    constructor() {
        super();
        this.state = {
            cards: []
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <h1>Profiler</h1>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
