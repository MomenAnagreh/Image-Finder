import React from "react";
import { useGetUsers } from "../api";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useMount } from "react-use";

export const Users = () => {
  const [usersState, getUsers] = useGetUsers();

  useMount(() => getUsers());

  console.log(usersState, "abc");

  return usersState.loading ? (
    <CircularProgress size={75} />
  ) : (
    <Box
      color="black"
      width="100%"
      marginTop={6}
      display="flex-column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Box
        display="flex"
        alignItems="end"
        position="fixed"
        width="100%"
        backgroundColor="white"
        zIndex={99}
        sx={{
          justifyContent: { xs: "center", md: "flex-start" },
          height: { xs: 60, md: 80 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { md: 32, xs: 23 },
            fontFamily: "inherit",
            fontWeight: 700,
            marginTop: { md: 5, xs: 2 },
            marginBottom: 3,
            whiteSpace: "nowrap",
            paddingLeft: { md: 4 },
          }}
        >
          Users
        </Typography>
      </Box>
      <Box
        mt={10}
        sx={{
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: { md: 10 },
          paddingRight: { md: 10 },
        }}
      >
        {usersState?.value?.data?.map((u) => (
          <Box
            sx={{
              color: "black",
              border: "1px solid grey",
              padding: 1,
              margin: 1,
              borderRadius: 2,
              width: { md: "25%", xs: "80%" },
              height: { md: "20vh" },
              display: { md: "flex" },
              flexDirection: { md: "column" },
              justifyContent: { md: "center" },
              alignItems: { md: "center" },
              flexWrap: { md: "wrap" },
              boxShadow: { xs: "1px 1px 5px grey" },
            }}
          >
            <Box>{u.user_name}</Box>
            <Box sx={{ color: "#29b6f6" }}>Searches: {u.count}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
