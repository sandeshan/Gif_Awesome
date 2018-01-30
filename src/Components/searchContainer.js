import React from 'react';
import { Card, Col, Row } from 'antd';
import { Modal } from 'antd';
import { Button, Icon } from 'antd';
import { Input } from 'antd';
import { AutoComplete } from 'antd';

import util from '../utilities';

const Search = Input.Search;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const baseURL = 'https://api.giphy.com/v1';
const API_KEY = 'qx0xpwyBU31bCqwFvSxPGPh643xlVTfo';
const numGifs = 60;
const rating = 'PG';

export default class SearchBox extends React.Component {

    constructor() {
        super();

        this.state = {
            modalVisible: false,
            dataSource: [],
            gifs: [],
            gifCards: [],
            selectedGif: null
        };
    }

    fetchSearch = (query) => {
        fetch(baseURL + '/gifs/search?api_key=' + API_KEY + '&q=' + query + '&limit=' + numGifs + '&rating=' + rating + '&offset=0&lang=en')
            .then(response => response.json())
            .then(json => this.setState({
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

    handleSearch = (value) => {        

        if(value) {
            var proxyUrl = 'https://damp-harbor-81623.herokuapp.com/',
                targetUrl = 'https://giphy.com/ajax/tags/search/?q=' + value;
            fetch(proxyUrl + targetUrl)
                .then(response => response.json())
                .then(json => this.setState({
                    dataSource: json.result.objects
                }))
                .catch(e => {
                    return e;
                });
        }
        else {
            this.setState({
                dataSource: []
            });
        }
    }

    onSelect = (query) => {
        this.setState({
            gifs: [],
            gifCards: []
        });
        this.fetchSearch(query);
    }

    render() {

        let index = 0;

        const options = this.state.dataSource.map(object => (
            <Option key={object.name_encoded + index++} value={object.name_encoded}>
                {object.name}
            </Option>
        ));

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
                this.state.gifCards.push(<br />);
            }
        }.bind(this));

        return (

            <div className="Search-container">
                <Row className="fixed-bar-div">
                    <AutoComplete
                        dataSource={options}
                        size="large"
                        style={{ width: '75%' }}
                        onSelect={this.onSelect}
                        onSearch={this.handleSearch}
                        placeholder="input here"
                    />
                </Row>
                <br />

                {this.state.gifCards}

                <Modal
                    title='Your Awesome Gif!'
                    width={this.state.selectedGif !== null ? util.modalSize(this.state.selectedGif.images.original.width) + 50 : 520}
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
                                <Icon type="download" />Download Gif {this.state.selectedGif !== null ? '(' + util.formatFileSize(this.state.selectedGif.images.original.size) + ')' : ''}
                            </Button>
                            <Button
                                type="primary"
                                href={this.state.selectedGif !== null ? this.state.selectedGif.images.original.webp : '#'}>
                                Download Webp  {this.state.selectedGif !== null ? '(' + util.formatFileSize(this.state.selectedGif.images.original.webp_size) + ')' : ''} <Icon type="download" />
                            </Button>
                        </Button.Group>
                    </div>
                </Modal>

            </div>
        );
    }
}