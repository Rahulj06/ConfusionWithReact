import React, { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Modal, ModalHeader, ModalBody, Button, Label, Col, Row  } from 'reactstrap';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        }


        handleSubmit(values) {
            this.props.addComment(this.props.dishId, values.rating, values.name, values.message);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        render() {
            return (
                <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Label htmlFor="rating" md={12}>Rating</Label>
                                            <Col md={12}>
                                            <Control.select 
                                                model=".rating" 
                                                name="rating"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    required: 'Required',
                                                }}
                                            /> 
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="name" md={12}>Your Name</Label>
                                        <Col md={12}>
                                            <Control.text model=".name" id="name" name="name"
                                                placeholder="Name"
                                                className="form-control"
                                                validators={{
                                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                                }}
                                                />
                                            <Errors 
                                                    className="text-danger"
                                                    model=".name"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required',
                                                        minLength: 'Must be greater than 2 characters',
                                                        maxLength: 'Must be 15 characters or less'
                                                }}
                                                />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="message" md={12}>Coment</Label>
                                            <Col md={12}>
                                                <Control.textarea model=".message" id="message" name="message"
                                                    rows="6"
                                                    className="form-control" />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col>
                                                <Button type="submit" color="primary">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            </React.Fragment>
            );
        }

}

export default CommentForm;