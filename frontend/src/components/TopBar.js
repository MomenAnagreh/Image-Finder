import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function TopBar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#29b6f6" }}>
      <Toolbar variant="dense">
        <Link to="/">
          <Button
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              color: "white",
              marginLeft: 5,
              fontSize: 15,
              fontFamily: "inherit",
            }}
          >
            Search
          </Button>
        </Link>
        <Link to="/history">
          <Button sx={{ color: "white", fontSize: 15, fontFamily: "inherit" }}>
            History
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
