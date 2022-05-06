import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ToolbarButton = ({ children, ...props }) => (
  <Button
    edge="start"
    color="inherit"
    aria-label="menu"
    sx={{
      mx: 1,
      color: "white",
      fontSize: 15,
      fontFamily: "inherit",
    }}
    {...props}
  >
    {children}
  </Button>
);

function TopBar({ signOut }) {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#29b6f6" }}>
      <Toolbar variant="dense">
        <Box display="flex" justifyContent="space-between" width="100%">
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ToolbarButton>Search</ToolbarButton>
            </Link>
            <Link to="/history" style={{ textDecoration: "none" }}>
              <ToolbarButton>History</ToolbarButton>
            </Link>
          </div>
          <ToolbarButton onClick={signOut}>Sign Out</ToolbarButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
