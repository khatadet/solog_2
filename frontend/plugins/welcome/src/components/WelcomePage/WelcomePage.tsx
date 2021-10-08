import React, { useEffect, FC } from 'react';
import { Button,Typography, Grid, Link } from '@material-ui/core';
import {
  Content,
  Header,
  Page,
  pageTheme,
  ContentHeader,
} from '@backstage/core';
import { makeStyles,Theme ,createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import {  Cookies  } from 'react-cookie/cjs';//cookie
import { useCookies } from 'react-cookie/cjs';//cookie






const cookies = new Cookies();
const Img = cookies.get('Img');
const Name = cookies.get('Name');



const HeaderCustom = {
  minHeight: '50px',
};

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    maxWidth: 325,
  },
  formControl: {
    margin: theme.spacing(3),
    width: 320,
  },
  
}),
);

export type ProfileProps = {
  name: string; 
  id: string;
  system: string;
  imgsut: string;
  linkto: string;
};


export function CardTeam({ name, id, system ,imgsut,linkto}: ProfileProps) {
  
  const classes = useStyles();
  return (
    <Grid item xs={12} md={3}>
      <Card className={classes.root}>
        <CardActionArea>
        <Link
        href = {linkto}
        >
          <CardMedia
            component="img"
            height="140"
            image={imgsut}  
            id = {id}
          />
           </Link>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="h2">
              <br/>{system}
              <br/>{id} {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

const WelcomePage: FC<{}> = () => {
  const http = new DefaultApi();

const [loading, setLoading] = React.useState(true);
  


  useEffect(() => {
    const getImg = async () => {
      const res = await http.getUser({ id: Number(Img) });
      setLoading(false);
      setUsers(res);
    };
    getImg();
  }, [loading]);
  
 
  return (
    <Page theme={pageTheme.home}>
      <Header style={HeaderCustom} title={`ระบบผู้ป่วยนอก`}>
      <Avatar alt="Remy Sharp" />
        <div style={{ marginLeft: 10 }}>{Name}</div>
      </Header>
      <Content>
        <ContentHeader title="สมาชิกในกลุ่ม"></ContentHeader>
        <Grid container>
        
          <CardTeam name={"นายคฑาเดช เขียนชัยนาจ"} id={"B6103866"} system={"ระบบสิทธิ์ผู้ป่วย"} imgsut = {Image3Base64Function}linkto = "/create_Patientrights"></CardTeam>
          
        </Grid>
      </Content>
    </Page>
  );
};

export default WelcomePage;
