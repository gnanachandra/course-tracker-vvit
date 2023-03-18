// if(1 && {form.coursePlatform} == "AICTE")
//                         {
//                             AICTE_Courses.map((name)=>{
//                                 return (
//                                     <MenuItem value = {name} key={name}>{name}</MenuItem>
//                                 )
//                             })
//                         }
//                         else if({form.coursePlatform} == "APSCHE")
//                         {
//                             APSCHE_Courses.map((name)=>{
//                                 return (
//                                     <MenuItem value = {name} key={name}>{name}</MenuItem>
//                                 )
//                             })
//                         }

var student= {age:20, batch:"ABC"};
 delete student. age
console.log(student);

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={student.name}
        subheader = {student.branch}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


import React from 'react';

import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
export default function Hook() {
  const classes = useStyles();
  return <Button className={classes.root}>Hook</Button>;
}












const handleSubmit = async (e) => {
  e.preventDefault();
  const message = await validator(form);
  if (message === true) {
    console.log("All the entered details are valid");
    if (passwordValidation(form.password, confirmPassword)) {
      setOpen(true);
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const res = await response.json();
      setOpen(false);
      const message = await res.message;
      if (message === "user already exists") {
        errorToast("Student already Registerd !");
      } else {
        const userData = form;
        delete userData["password"];
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } else {
      errorToast("passwords doesnot match");
    }
  } else {
    setError(true);
    setErrorMessage(message);
  }
};






const handleSubmit1 = async (e) => {
  e.preventDefault();
  setOpen(true);
  const response = fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
    const jsonResponse = await response.json();
    setOpen(false);
    const user = jsonResponse.user;
    if (!user) {
      console.log("Un authorized");
    } else {
      navigate("/AddCourse");
    }
    };