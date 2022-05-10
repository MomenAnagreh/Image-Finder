import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

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

  const onSortClicked = (sort) => {
    setSort(sort);
    handleClose();
  };

  return (
    <Box height="60%" display="flex">
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{ backgroundColor: "#29b6f6" }}
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
          onClick={() => onSortClicked(1)}
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
          onClick={() => onSortClicked(2)}
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
            onClick={() => onSortClicked(3)}
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
            onClick={() => onSortClicked(4)}
          >
            {item4}
          </Box>
        ) : null}
      </Popover>
    </Box>
  );
};
