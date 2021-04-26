import React, { Component } from 'react';
import { makeStyles, useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import '../Header'
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { FilterDrawer, Title } from '.././'

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(5),
    },
}));


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const count = props.count;
    const page = props.page;
    const rowsPerPage = props.rowsPerPage;
    const onChangePage = props.onChangePage;


    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
};

return (
    <div className={classes.root}>
    <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
    >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
    </IconButton>
    <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
    >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </IconButton>
    <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
    >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
    </div>
);
}

const columns = [
    { id: 'Name', label: 'Name', minWidth: 170 },
    {
      id: 'Rating',
      label: 'Rating',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Opening Hours',
        label: 'Opening Hours',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'Unisex',
        label: 'Unisex',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'Distance',
        label: 'Distance',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
      },
  ];


const theme = createMuiTheme({
    overrides:{
        MuiTypography:{
            colorTextPrimary: {
                color:'#132c33',
                fill: '#132c33!important',
                lightingColor: '#132c33'
            },
            root: {
                color:'#126e82!important'
            },
            h5: {
                color:'#132c33!important'
            }
        }
    },
})



export default class ToiletList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            page: 0,
            rowsPerPage: 10,
            toilets: [],
            loadingBuffer: true,
            unisex: false,
            ambulant: false,
            accessible: false,
            babychange: false,
            shower: false,
            changeroom: false,
            parking: false,
            inclusive: false,
            search: ""
        }
    }

    getToiletPageURL = (id) => {
        const query = window.location.search;
        const params = new URLSearchParams(query)
        const lat = params.get('lat')
        const lng = params.get('lng')
        return 'http://localhost:3000/user/toilet/info?lat='+lat+'&lng='+lng+'&id='+id;
    }


    handleChangePage = (event, newPage) => {
        this.setState({page:newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage:parseInt(event.target.value, 10)})
        this.setState({page:0});
    };


    componentDidMount() {
        fetch(window.location.href)
            .then(res => res.json())
                .then(
                    (result) => {
                    this.setState({
                    loadingBuffer: false,
                    toilets: result
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

    
    render () {
        var rows = this.state.toilets

        const handleFilter = (event) => {
            this.setState({...this.state, [event.target.name]: event.target.checked })
        }

        const handleSortDist = () => {
            this.setState({
                toilets: rows.sort((a,b)=> (a.dist > b.dist ? 1 : -1))
            });
        }
        const handleSortName = () => {
            this.setState({
                toilets: rows.sort((a,b)=> (a.name > b.name ? 1 : -1))
            });
        }
        const handleSortReview = () => {
            this.setState({
                toilets: rows.sort((a,b)=> (a.review_score < b.review_score ? 1 : -1))
            });
        }
        function formatOpeningHours(openinghours) {
            if (openinghours.includes("OPEN")) {
                return openinghours=openinghours.substring(5)
            }
            else {
                return openinghours
            }
        }
        const handleSearch = (e) => {
            this.setState({
              search: e.target.value
            });
          }

        if (this.state.search != "") {
            rows=rows.filter(row => row.name.toLowerCase().includes(this.state.search.toLowerCase()))
        }

        if (this.state.unisex == true) {
            rows=rows.filter(row => row["unisex"]=="True")
        }
        if (this.state.ambulant == true) {
            rows=rows.filter(row => row["ambulant"]=="True")
        }
        if (this.state.accessible == true) {
            rows=rows.filter(row => row["accessible"]=="True")
        }
        if (this.state.babychange == true) {
            rows=rows.filter(row => row["babychange"]=="True")
        }
        if (this.state.shower == true) {
            rows=rows.filter(row => row["shower"]=="True")
        }
        if (this.state.changeroom == true) {
            rows=rows.filter(row => row["changeroom"]=="True")
        }
        if (this.state.parking == true) {
            rows=rows.filter(row => row["parking"]=="True")
        }
        if (this.state.inclusive == true) {
            rows=rows.filter(row => row["inclusive"]=="True")
        }
            
        var emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);
        return (
            <ThemeProvider theme={theme}>
                {this.state.loadingBuffer ? (
                    <div className = "center"> 
                        <CircularProgress color="primary"/>
                    </div>
                ) : (
                <div>
                    <TableContainer component={Paper}>
                    <Title >We found {this.state.toilets.length} toilets near you.</Title>
                    <TextField onChange={(e)=>handleSearch(e)} size='small' variant='outlined'  style={{width:'740px', marginTop:'30px', marginBottom:'0px', marginLeft:'20px'}} label="Search toilet by name"></TextField>
                        <Table className="table" aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                    key={columns[0].id}
                                    align={columns[0].align}
                                    style={{ minWidth: columns[0].minWidth, fontWeight:'bold'}}
                                    >
                                    <Button onClick={handleSortName}>{columns[0].label}</Button>
                                    </TableCell>
                                    <TableCell
                                    key={columns[1].id}
                                    align={columns[1].align}
                                    style={{ minWidth: columns[1].minWidth, fontWeight:'bold'}}
                                    >
                                    <Button onClick={handleSortReview}>{columns[1].label}</Button>
                                    </TableCell>
                                    <TableCell
                                    key={columns[2].id}
                                    align={columns[2].align}
                                    style={{ minWidth: columns[2].minWidth, fontWeight:'bold'}}
                                    >
                                    <Typography variant='button'>{columns[2].label}</Typography>
                                    </TableCell>
                                    <TableCell
                                    key={columns[4].id}
                                    align={columns[4].align}
                                    style={{ minWidth: columns[4].minWidth, fontWeight:'bold'}}
                                    >
                                    <Button onClick={handleSortDist}>{columns[4].label} (km)</Button>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.rowsPerPage > 0
                                    ? rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    : rows
                                ).map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            <Button href={this.getToiletPageURL(row.id)} color="primary">
                                                {row.name}
                                            </Button> 
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="center">
                                            <Rating name="simple-controlled" value={row.review_score} precision={0.1} readOnly align='left'/>
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="center">
                                            {formatOpeningHours(row.openinghours)}
                                        </TableCell>
                                        <TableCell style={{ width: 160 }} align="center">
                                            {row.dist}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        style={{padding:'0px'}}
                                        rowsPerPageOptions={[10, 15]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                    <FilterDrawer 
                                        unisex={this.state.unisex} 
                                        accessible={this.state.accessible} 
                                        ambulant={this.state.ambulant}
                                        parking={this.state.parking}
                                        babychange={this.state.babychange}
                                        shower={this.state.shower}
                                        changeroom={this.state.changeroom}
                                        inclusive={this.state.inclusive}
                                        handleFilter={handleFilter} 
                                        style ={{marginTop:'10px'}}/>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
                )}
            </ThemeProvider>
        );
    }
}
