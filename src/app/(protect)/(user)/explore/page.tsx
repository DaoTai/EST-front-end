import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMember from "./_components/CardMember";
import Search from "./_components/Search";
const ExplorePage = () => {
  return (
    <Container sx={{ pt: 1 }}>
      <Search />
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <CardMember />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <CardMember />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <CardMember />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExplorePage;
