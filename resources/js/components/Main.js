import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from "react-paginate";
import Card from "./Card";

export default class Main extends Component{

    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            completed: false,
            pageCount: 1,
            currentPage: 1
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }


    getQueryStringValue(key) {
        console.log("Get page id");
        const value = decodeURIComponent(
            window.location.search.replace(
                new RegExp(
                    '^(?:.*[&\\?]' +
                    encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
                    '(?:\\=([^&]*))?)?.*$',
                    'i'
                ),
                '$1'
            )
        );
        return value ? value : null;
    }

    async componentDidMount() {
        console.log("Did mount");
        const page = this.getQueryStringValue('page');
        await Promise.resolve(this.setState(() => ({ currentPage: page ? page : 1 })));
        this.getPostData();
    }

    async handlePageClick(data) {
        console.log("Get another page");
        const page = data.selected >= 0 ? data.selected + 1 : 0;
        console.log("Page", page);
        await Promise.resolve(this.setState(() => ({ currentPage: page })));
        this.getPostData();
    }

    async getPostData() {
        console.log("Get data");
        if (history.pushState) {
            const newUrl =
                window.location.protocol +
                '//' +
                window.location.host +
                window.location.pathname +
                '?page=' +
                this.state.currentPage;
            window.history.pushState({ path: newUrl }, '', newUrl);

            const response = await axios.post(newUrl);
            console.log(Object.entries(response.data.data));
            try {
                this.setState(() => ({
                    cards: Array.from(response.data.data),
                    currentPage: response.data.current_page,
                    pageCount: response.data.last_page
                }));
                    window.scrollTo(0, 0);
            } catch (error) {
                console.log(error);
            }
        }
    }


    render() {
        const Cards = this.state.cards.map(card => (
            <Card key={card.ObjectID["$oid"]} card={card} />
        ));

        return (
            <div className="container">
                <div className="justify-content-center">
                    <h1>Profiler (Кароточки)</h1>
                    <div>
                        <div className="row">
                            {Cards.length > 0 && Cards}
                        </div>

                        <ReactPaginate
                            pageCount={this.state.pageCount}
                            initialPage={this.state.currentPage - 1}
                            forcePage={this.state.currentPage - 1}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={2}
                            previousLabel="Prev"
                            nextLabel="Next"
                            containerClassName="react-pagination"
                            onPageChange={this.handlePageClick}
                            disableInitialCallback={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('react-card-list')) {
    ReactDOM.render(<Main />, document.getElementById('react-card-list'));
}
