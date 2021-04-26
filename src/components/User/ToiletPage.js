import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { ToiletPageTabs, ToiletPageImages } from '.././'
import CircularProgress from '@material-ui/core/CircularProgress';

export default class ToiletPage extends Component  {
    constructor(props) {
        super(props);
        this.state= {
            toiletinfo: null,
            loadingBuffer: true,
        }
    } 
    componentDidMount() {
        fetch(window.location.href)
            .then(res => res.json())
                .then(
                    (result) => {
                    this.setState({
                    loadingBuffer: false,
                    toiletinfo: result
                    });
                },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            loadingBuffer: false,
                            error
                        });
                    }
                )
    }

    render() {
        return (
            <div className ='toiletpage'>
                {this.state.loadingBuffer ? (
                    <div className = "center"> 
                        <CircularProgress color="primary"/>
                    </div>
                ) : (
                    <Paper className="pagecontainer" key="key?" > 
                        <ToiletPageImages />
                        <Paper className="pageinfocontainer" elevation={0}>
                            <ToiletPageTabs toiletInfo = {this.state.toiletinfo}/>
                        </Paper>
                    </Paper>
                )}
            </div>
            
        )
    }
    
    

}