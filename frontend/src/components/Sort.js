import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { isMobile } from "react-device-detect";

export const Sort = ({ item1, item2, item3, item4, setSort }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      height={isMobile ? "65%" : "60%"}
      display="flex"
      width={isMobile ? "2%" : "7%"}
    >
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{
          backgroundColor: "#29b6f6",
          width: isMobile ? "90%" : "100%",
        }}
      >
        Sort
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{
          marginTop: 7,
        }}
      >
        <Box
          sx={{
            p: 1,
            cursor: "pointer",
            marginBottom: 0,
            color: "#29b6f6",
            width: "200px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",

            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
          onClick={() => {
            console.log(item1, "Clicked");
            setSort(1);
            setAnchorEl(null);
          }}
        >
          {item1}
        </Box>
        <Box
          sx={{
            p: 1,
            cursor: "pointer",
            marginBottom: 0,
            color: "#29b6f6",
            width: "200px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",

            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
          onClick={() => {
            console.log(item2, "Clicked");
            setSort(2);
            setAnchorEl(null);
          }}
        >
          {item2}
        </Box>
        {item3 ? (
          <Box
            sx={{
              p: 1,
              cursor: "pointer",
              marginBottom: 0,
              color: "#29b6f6",
              width: "200px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",

              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => {
              console.log(item3, "Clicked");
              setSort(3);
              setAnchorEl(null);
            }}
          >
            {item3}
          </Box>
        ) : null}
        {item4 ? (
          <Box
            sx={{
              p: 1,
              cursor: "pointer",
              marginBottom: 0,
              color: "#29b6f6",
              width: "200px",
              justifyContent: "center",
              display: "flex",

              "&:hover": {
                backgroundColor: "lightgray",
              },
            }}
            onClick={() => {
              console.log(item4, "Clicked");
              setSort(4);
              setAnchorEl(null);
            }}
          >
            {item4}
          </Box>
        ) : null}
      </Popover>
    </Box>
  );
};
