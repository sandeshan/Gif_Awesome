import React from 'react';

import { Card, Col, Row } from 'antd';
const { Meta } = Card;

const baseURL = 'https://api.giphy.com/v1';
var API_KEY = 'qx0xpwyBU31bCqwFvSxPGPh643xlVTfo';


export default class Trending extends React.Component {

    constructor() {
        super();

        this.state = {
            gifs: []
        };

        // var trendingRequest = async() => {
        //     var res = await fetch(baseURL + '/gifs/trending?api_key=' + API_KEY + '&limit=20&rating=PG');
        //     var gifs = await res.json();
        //     this.state = { gifs: gifs };
        // }

        // trendingRequest();
    }

    componentDidMount() {
        fetch(baseURL + '/gifs/trending?api_key=' + API_KEY + '&limit=20&rating=PG')
            .then(response => response.json())
            .then(json => this.setState({ gifs: json.data }));
    }

    render() {

        if(this.state.gifs === null) {
            this.state.gifs = [];
        }
        
        return (
            <div style={{ padding: '30px' }}>
                <Row>
                {this.state.gifs.map(function (gifDetails, index) {
                        return <Col span={4} key={index}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={gifDetails.images.fixed_width.webp} />}>
                                <Meta
                                    title={gifDetails.user.username}/>
                            </Card>
                        </Col>
                })}
                </Row>
            </div>
        );
    }
}