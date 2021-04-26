import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import Title from './Title';
import { ThemeProvider, makeStyles, useTheme, createMuiTheme, } from '@material-ui/core/styles';
import CheckBox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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

function preventDefault(event) {
  event.preventDefault();
}


export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state= {
        totalAppeared:0,
        totalViews:0,
        toilets: [],
        loadingBuffer:false,
        page: 0,
        rowsPerPage: 10,
        search: ""
    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)})
    this.setState({page:0});
  };

  handleCheck = (id, event) => {
    if (event.target.checked) {
      this.props.selected(id, true)
    }
    else {
      this.props.selected(-1, false)
    }
  }

  render () {
    var rows=this.props.toilets
    var emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);


    const handleSortLocation = () => {
      this.setState({
          toilets: rows.sort((a,b)=> (a.location > b.location ? 1 : -1))
      });
    }
    const handleSortName = () => {
      this.setState({
        toilets: rows.sort((a,b)=> (a.name > b.name ? 1 : -1))
      });
    }
    const handleSortRating = () => {
      this.setState({
          toilets: rows.sort((a,b)=> (a.rating < b.rating ? 1 : -1))
      });
    }
    const handleSortVisitors = () => {
      this.setState({
          toilets: rows.sort((a,b)=> (a.views < b.views ? 1 : -1))
      });
    }
    const handleSearch = (e) => {
      this.setState({
        search: e.target.value
      });
    }

    if (this.state.search != "") {
      rows=rows.filter(row => row.name.toLowerCase().includes(this.state.search.toLowerCase()))
    }

    return (
      <ThemeProvider>
      <React.Fragment>
        <Title>
          Toilet Manager
        </Title>
        <TextField onChange={(e)=>handleSearch(e)} size='small' variant='outlined' fullWidth style={{marginTop:'10px', marginBottom:'10px'}} label="Search toilet by name"></TextField>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>SELECTED</TableCell>
              <TableCell ><Button onClick={handleSortName}>Name</Button></TableCell>
              <TableCell align='center'><Button onClick={handleSortRating}>Rating</Button></TableCell>
              <TableCell align='center'><Button onClick={handleSortLocation}>Location</Button></TableCell>
              <TableCell align='center'><Button onClick={handleSortVisitors}>Visitors</Button></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {(this.state.rowsPerPage > 0
                  ? rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  : rows
              ).map((row) => (
                  <TableRow key={row.name}>
                      <TableCell  size='medium' component="th" scope="row">
                          <CheckBox onChange={(event)=>this.handleCheck(row.id, event)} color='primary'></CheckBox>
                      </TableCell>
                      <TableCell component="th" scope="row">
                          <Button color="primary">
                              {row.name}
                          </Button> 
                      </TableCell>
                      <TableCell align="center">
                          <Rating name="simple-controlled" value={row.rating} precision={0.1} readOnly align='left'/>
                      </TableCell>
                      <TableCell  align="center">
                          {row.location}
                      </TableCell>
                      <TableCell  align="center">
                        {row.views}
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
          <TableRow >
            <TablePagination
                style={{padding:'0px', width:'100%'}}
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
        </TableRow>
          </TableFooter>
        </Table>
        <div style={{marginTop:'20px'}}>
          <Link color="primary" href="http://localhost:3000/est/registertoilet">
            Register a toilet
          </Link>
        </div>
      </React.Fragment>
      </ThemeProvider>
    );
  }
}