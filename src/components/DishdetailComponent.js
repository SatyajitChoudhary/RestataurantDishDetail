import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

   constructor(props) {
       super(props);

       this.state = {
           selectedDish: null
       }
   }

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
   renderComments(comments) {
     let content=[];
       if (comments.length !== 0)
       {
           comments.map((comment)=>{
             content.push(
               <div>
               <dl>{comment.comment}</dl>
               <dl>-- {comment.author} {comment.date}</dl>
               </div>
             )
          });
           return(
             <div>
              <h4>Comments</h4>
              {content}
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
