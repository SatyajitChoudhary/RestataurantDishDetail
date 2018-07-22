import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

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
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                      {this.renderDish(this.props.dish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                      {this.props.dish && this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
              );
  }
}

export default DishDetail;
