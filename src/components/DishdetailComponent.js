import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb,
  BreadcrumbItem,Modal, ModalHeader,ModalBody, Button , Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from 'react-redux-form';
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component{
  constructor(props){
    super(props);
    this.state={
      isModalOpen:false
    };
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.toggleModal();
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }
  toggleModal() {

    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  render()
  {
    return(
      <div>
        <Button outline color="secondary" onClick={this.toggleModal}><span className="fa fa-pencil "></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
             <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
             <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating" md={10}>Rating</Label>
                        <Col md={10}>
                            <Control.select model=".rating" defaultValue="1" name="rating" id="rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author" md={10}>Your Name</Label>
                        <Col md={10}>
                            <Control.text model=".author" name="author" id="author" className="form-control"
                              placeholder="Your Name" validators={{
                                  minLength: minLength(3), maxLength: maxLength(15)
                              }}
                               />
                              <Errors
                                  className="text-danger"
                                  model=".author"
                                  show="touched"
                                  messages={{
                                      minLength: 'Must be greater than 2 numbers',
                                      maxLength: 'Must be 15 numbers or less',
                                  }}
                               />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={10}>Comment</Label>
                        <Col md={10}>
                            <Control.textarea rows={6} model=".comment" defaultValue=" " name="comment" id="comment" className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={10}>
                            <Button type="submit" color="primary"> Submit</Button>
                        </Col>
                    </Row>
                  </LocalForm>
                </ModalBody>
             </Modal>
           </div>
    )
  }
}
class DishDetail extends Component {

   constructor(props) {
       super(props);
   }

   //Rendering Selected Disc
   renderDish(dish,isLoading,errMess) {
     if (isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{errMess}</h4>
                    </div>
                </div>
            );
        }
        else (dish != null)
           return(
               <Card>
                   <CardImg top src={dish.image} alt={dish.name} />
                   <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
           );
       // else
       //     return(
       //         <div></div>
       //     );
   }
   // Rendering Comments
   renderComments(comments,dishId,addComment) {
     let content=[];
       if (comments.length !== 0)
       {
           comments.map((comment)=>{
             content.push(
               <li key={comments.id}>
                 <dl>{comment.comment}</dl>
                 <dl>-- {comment.author} ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                 </dl>
               </li>
             )
           });
           return(
             <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                {content}
                </ul>
                {<CommentForm dishId={dishId} addComment={addComment}/>}
              </div>
           );
         }
       else
           return(
               <div></div>
           );
   }

   render() {
      return (
              <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                      {this.renderDish(this.props.dish,this.props.isLoading,this.props.errMess)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.comments,this.props.dish.id,this.props.addComment)}
                    </div>
                </div>
              </div>
          );
    }
}

export default DishDetail;
