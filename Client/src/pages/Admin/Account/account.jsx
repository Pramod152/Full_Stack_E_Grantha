// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from '../Dashboard/layout';
import AccountProfileDetails from './account-profile-details';
import AccountProfile from './account-profile';

const Account = () => (
  <>
    {/* <Head>
      <title>
        Account | Devias Kit
      </title>
    </Head> */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Stack spacing={3}>
            <div>
              {/* <Typography variant="h4">
                Account
              </Typography> */}
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item // Add 'item' prop here
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile />
                </Grid>
                <Grid
                  item // Add 'item' prop here
                  xs={12}
                  md={6}
                  lg={8}
                >
                  <AccountProfileDetails />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Box>
      </Container>
    </Box>
  </>
);

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Account;
