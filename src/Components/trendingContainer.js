import React from 'react';

import { Card, Col, Row } from 'antd';
import { Modal } from 'antd';
import { Button, Icon } from 'antd';

const baseURL = 'https://api.giphy.com/v1';
const API_KEY = 'qx0xpwyBU31bCqwFvSxPGPh643xlVTfo';
const numGifs = 60;
const rating = 'PG';

export default class Trending extends React.Component {

    constructor() {
        super();

        this.state = {
            visible: false,
            gifs: [],
            selectedGif: null
        };     
    }

    componentDidMount() {
        fetch(baseURL + '/gifs/trending?api_key=' + API_KEY + '&limit=' + numGifs + '&rating=' + rating)
            .then(response => response.json())
            .then(json => this.setState({ gifs: json.data }));
    }

    showModal = (index) => {
        this.setState({
            selectedGif: this.state.gifs[index],            
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {

        var gifCards = [];

        this.state.gifs.map(function (gifDetails, index) {
            gifCards.push(
                <Col span={6} key={index}>
                    <Card
                        hoverable
                        cover={<img alt="example" src={gifDetails.images.fixed_width.webp} />}
                        onClick={() => this.showModal(index)}>
                    </Card>
                </Col>
            );
            if (index + 1 % 5 === 0) {
                gifCards.push(<br/>);
            }
        }.bind(this));
        
        return (

            <div style={{ padding: '30px' }}>
                {gifCards}

                <Modal
                    title={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div>
                        <img alt="example" src={this.state.selectedGif !== null ? this.state.selectedGif.images.original.webp : ''} />
                        <br /><br />
                        <Button.Group size="large">
                            <Button
                                type="primary"
                                href={this.state.selectedGif !== null ? this.state.selectedGif.images.original.url : '#'}>
                                <Icon type="download" />Download Gif
                            </Button>
                            <Button
                                type="primary"
                                href={this.state.selectedGif !== null ? this.state.selectedGif.images.original.webp : '#'}>
                                Download Webp<Icon type="download" />
                            </Button>
                        </Button.Group>
                    </div>
                </Modal>

            </div>
        );
    }
}