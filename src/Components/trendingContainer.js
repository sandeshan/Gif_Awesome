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
            modalVisible: false,
            gifs: [],
            gifCards: [],
            selectedGif: null,
            loading: false
        };
    }

    componentDidMount() {
        this.fetchLatest();
    }

    fetchLatest = () => {
        fetch(baseURL + '/gifs/trending?api_key=' + API_KEY + '&limit=' + numGifs + '&rating=' + rating)
            .then(response => response.json())
            .then(json => this.setState({
                loading: false,
                gifs: json.data
             }));
    }

    showModal = (index) => {
        this.setState({
            selectedGif: this.state.gifs[index],            
            modalVisible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            modalVisible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            modalVisible: false,
        });
    }

    refresh = () => {
        console.log('refersh clicked');
        this.setState({ 
            loading: true,
            gifs: [],
            gifCards: []
         });
        this.fetchLatest();
    }

    render() {

        this.state.gifCards = [];

        this.state.gifs.map(function (gifDetails, index) {
            this.state.gifCards.push(
                <Col span={6} key={gifDetails.id}>
                    <Card
                        hoverable
                        cover={<img alt="example" src={gifDetails.images.fixed_width.webp} />}
                        onClick={() => this.showModal(index)}>
                    </Card>
                </Col>
            );
            if (index + 1 % 5 === 0) {
                this.state.gifCards.push(<br/>);
            }
        }.bind(this));
        
        return (

            <div className="Trending-container">
                <Row>
                    <Button 
                        type="primary" 
                        loading={this.state.loading} 
                        onClick={this.refresh.bind(this)}
                        className="refresh-btn">
                        Click to Refresh
                    </Button>
                </Row>
                <br/>

                {this.state.gifCards}

                <Modal
                    title='Your Awesome Gif!'
                    width={this.state.selectedGif !== null ? modalSize(this.state.selectedGif.images.original.width) + 50 : 520}
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div className="gif-modal-body">
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

function modalSize(_width) {
    var width = parseInt(_width);

    return (width > 520 ? width : 520);
}