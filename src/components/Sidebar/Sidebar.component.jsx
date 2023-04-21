import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import CategoryIcon from "@material-ui/icons/Category";
import path from "../../resources/path";
import { useHistory } from "react-router-dom";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DashboardIcon from '@material-ui/icons/Dashboard';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SidebarComponent() {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (slug) => {
    history.push(slug);
  };
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
      <ListItem
          button
          onClick={() => {
            handleClick(path.DASHBOARD);
          }}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleClick(path.CATEGORY);
          }}
        >
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category Manager" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            handleClick(path.BRANCH);
          }}
        >
          <ListItemIcon>
            <BrandingWatermarkIcon />
          </ListItemIcon>
          <ListItemText primary="Branch Manager" />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            handleClick(path.PRODUCT);
          }}
        >
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Product Manager" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleClick(path.ORDER);
          }}
        >
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Order Manager" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            handleClick(path.USER);
          }}
        >
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="User Manager" />
        </ListItem>

      </List>
      <Divider />
    </div>
  );
}
