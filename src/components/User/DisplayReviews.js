import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));



export default class DisplayReviews extends Component {
    constructor(props) {
        super(props);
        this.state= {
            reviews: props.reviews,
            page: 1
        }
    }
    handlePageChange = (event, page) => {
        console.log(page)
        this.setState({
            page: page
        })

    }

    getTitle = (title, review_score) => {
        return <div><Typography>{title}</Typography><Rating precision={0.1} readOnly value={review_score}/></div>
    }

    mapStructure = (rows) => {
        if (rows) {
          return rows.map(row => (
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={row.uid} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
            primary={this.getTitle(row["title"], row["review_score"])}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className=""
                            color="textPrimary"
                        >
                        {row.uid}{" - "}
                        </Typography>
                    {row.body}
                    </React.Fragment>
                }
            />
            </ListItem>
            
          ));
        }
    };
    
    render() {
        var rows = []
        for (var index=0; index < this.state.reviews.length; index++) {
            rows.push(this.state.reviews[index]);
        }
        console.log(rows)
        return (    
            <div>      
            <List className="">
                {this.mapStructure(rows.slice((this.state.page-1) * 4, (this.state.page-1) * 4 + 4))}
            </List>
            <Pagination style={{height:'30px'}} count={Math.ceil(rows.length/4)} onChange={this.handlePageChange}/>
            </div>  
           
        );
    }
}
