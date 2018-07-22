import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class DishDetail extends Component {

   constructor(props) {
       super(props);

   }
   //Rendering Selected Disc
   renderDish(dish) {
       if (dish != null)
           return(
               <Card>
                   <CardImg top src={dish.image} alt={dish.name} />
                   <CardBody>
                     <CardTitle>{dish.name}</CardTitle>
                     <CardText>{dish.description}</CardText>
                   </CardBody>
               </Card>
           );
       else
           return(
               <div></div>
           );
   }
   // Rendering Comments
   renderComments(comments) {
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
                              {this.renderDish(this.props.dish)}
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                {this.renderComments(this.props.comments)}
                            </div>
                        </div>
                        </div>
                    );
  }
}

export default DishDetail;
