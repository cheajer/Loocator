import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const tileData = [
    {
        img: 'https://www.renolink.com.au/assets/full/REN01.png?20200709030705',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://www.renolink.com.au/assets/full/REN01.png?20200709030705',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://www.renolink.com.au/assets/full/REN01.png?20200709030705',
        title: 'Image',
        author: 'author',
    },
    {
        img: 'https://www.renolink.com.au/assets/full/REN01.png?20200709030705',
        title: 'Image',
        author: 'author',
    },
];
 
export default function SingleLineGridList() {
  const classes = useStyles();

  return (
    <div className="imagecontainer">
      <GridList className={classes.gridList} cols={4} cellHeight={200} spacing={0}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} />
            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
