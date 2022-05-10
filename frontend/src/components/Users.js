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
        width="99%"
        backgroundColor="white"
        zIndex={99}
        height={80}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { md: 32, xs: 23 },
            fontFamily: "inherit",
            fontWeight: 700,
            marginTop: 5,
            marginBottom: 3,
            whiteSpace: "nowrap",
            paddingLeft: 4,
          }}
        >
          Users
        </Typography>
      </Box>
      <Box mt={10}>
        {usersState?.value?.data?.map((u) => (
          <Box
            sx={{
              color: "black",
              border: "1px solid grey",
              padding: 1,
              margin: 1,
              borderRadius: 2,
            }}
          >
            <Box>{u.user_name}</Box>
            <Box>Searches: {u.count}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
