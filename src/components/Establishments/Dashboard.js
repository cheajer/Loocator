import React, { Component } from 'react'
import { EstDashboardContent, Toilets } from '.././'
import Title from './Title';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import Reviews from './Reviews';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          LooCator
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#126e82',
      },
      secondary: {
        main: '#696969',
      },
      title: {
        main: '#ffffff'
      }
    },
  });

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state= {
            totalAppeared:0,
            totalViews:0,
            toilets: [],
            loadingBuffer:false,
            page:0,
            selected:-1,
        }
    }
    fixedHeightPaper = clsx("dashpaper", "dashfixedheight");
    componentDidMount() {
        var token = sessionStorage.getItem('esttoken')
        token = JSON.parse(token)
        const pathname = window.location.href + '?flag='+token['flag']+'&id='+token['id']
        fetch(pathname)
            .then(res => res.json())
                .then(
                    (result) => {
                    this.setState({
                        loadingBuffer: false,
                        toilets: result['toilets'],
                        totalAppeared: result['totalAppeared'],
                        totalViews: result['totalViews']
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

    setSelected = (id, bool) => {
        this.setState({
            selected:id,
            selectFlag:bool
        })
    }



    render() {
        const getCurrentToiletMetrics = (type) => {
            for (var i=0; i < this.state.toilets.length; i++) {
                if (this.state.toilets[i]["id"] == this.state.selected) {
                    if (type == "views") {
                        return this.state.toilets[i]["views"]
                    } 
                    else if (type == "appeared") {
                        return this.state.toilets[i]["appeared"]
                    }
                }
            }
        }
        const getCurrentToiletReviews = () => {
            for (var i=0; i < this.state.toilets.length; i++) {
                if (this.state.toilets[i]["id"] == this.state.selected) {
                    return this.state.toilets[i]["reviews"]
                }
            }
        }
        const noneSelectedMessage = () => {
            return (
                <Typography style={{marginTop:'20px'}} color="secondary">Please select from the list below to view that toilet's reviews.</Typography>
            )
        }
        const selectedMessage = (reviews) => {
            return (
                <div>
                    <Reviews reviews={getCurrentToiletReviews()}/>
                </div>
            )
        }

        const calcAvgRating = () => {
            var sum=0
            var count=0
            for (var i=0; i < this.state.toilets.length; i++) {
                if(this.state.toilets[i]['rating'] != "0") {
                    sum=sum+this.state.toilets[i]['rating']
                    count+=1
                }
            }
            if (sum==0) {
              return 0
            }
            return (sum/count).toFixed(1)
        }

        const getToiletCount = () => {
            if (this.state.toilets.length > 1000) {
                var num = (this.state.toilets.length/1000).toFixed(1)
                num=num.toString()
                return num + "K"
            }
            return this.state.toilets.length
        }

        const getToiletRating = (id) => {
          var sum = 0
          for (var i =0; i< this.state.toilets.length; i++) {
            if(this.state.toilets[i]['id']==this.state.selected) {
              for (var j =0; j < this.state.toilets[i]['reviews'].length; j++) {
                sum+=parseFloat(this.state.toilets[i]['reviews'][j]['review_score'])
              }
            }
          }
          return (sum/j).toFixed(1)
        }

        return (
          <div className="dashroot">
            <ThemeProvider theme={theme}>
              <main className="dashcontent">
                <div className="dashappbarspacer" />
                <Container maxWidth="lg" className="dashcontainer">
                  <Grid container spacing={3}>
                    {/* Chart */}
                    {/* Recent Reviews */}
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper className={this.fixedHeightPaper}>
                        <Title>Searches</Title>
                        
                        <Typography  color='secondary' variant='h1'>{(this.state.selected!=-1
                                                                        ? getCurrentToiletMetrics("appeared")
                                                                        : this.state.totalAppeared
                                                                    )}
                        </Typography>
                      </Paper>
                      <Paper style={{marginTop:'20px'}} className={this.fixedHeightPaper}>
                        <Title>Toilet Views</Title>
                        <Typography color='secondary' variant='h1'>{(this.state.selected!=-1
                                                                        ? getCurrentToiletMetrics("views")
                                                                        : this.state.totalViews
                                                                    )}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper className={this.fixedHeightPaper}>
                        <Title>Total Toilets</Title>
                        <Typography color='secondary' variant='h1'>{(this.state.selected!=-1
                                                                        ? 1
                                                                        : getToiletCount()
                                                                    )}
                        </Typography>
                      </Paper>
                      <Paper style={{marginTop:'20px'}}  className={this.fixedHeightPaper}>
                        <Title>Average Rating</Title>
                        <Typography color='secondary' variant='h1'>{(this.state.selected!=-1
                                                                        ? getToiletRating()
                                                                        : calcAvgRating()
                                                                    )}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={6}>
                      <Paper style={{height:'424px'}} className={this.fixedHeightPaper}>
                        <Title>Recent Reviews</Title>
                        {(this.state.selected==-1
                            ? noneSelectedMessage()
                            : selectedMessage()
                        )}
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper className="dashpaper">
                        <Toilets toilets={this.state.toilets} selected = {this.setSelected}/>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </main>
            </ThemeProvider>
          </div>
        );
      };
}