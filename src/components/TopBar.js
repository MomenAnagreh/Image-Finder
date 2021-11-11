import { AppBar, Toolbar, Button } from "@mui/material";

function TopBar() {
  return (
    <AppBar position="fixed" sx={{backgroundColor: "#29b6f6" }}  >
      <Toolbar variant="dense">
        <Button edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, color: 'white', marginLeft: 5, fontSize: 15, fontFamily: 'inherit' }}
          onClick={() => {
            alert('clicked');
          }}
        >
          Search
        </Button>
        <Button sx={{ color: "white", fontSize: 15, fontFamily: 'inherit' }}
          onClick={() => {
            alert('clicked');
          }}
        >
          History
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;