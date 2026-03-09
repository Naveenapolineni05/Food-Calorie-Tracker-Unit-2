import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

const About = () => {
  return (
    <Box className="about-background">
      <img
        src="https://images.creativemarket.com/0.1.0/ps/8436213/1820/1214/m1/fpnw/wm1/smfymzyylfogh31jhumnxl4pyitf4kfwofnxxljcwv6jy3wfmepfup0jakedtfgq-.jpg?1590762544&s=abe9505c29be6863aef667707d2ef3f3"
        alt="Healthy food variety including vegetables, fruits, and grains"
        style={{ display: "none" }}
      />

      <Container className="about-content" maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          Food Calorie Tracker 🍎
        </Typography>

        <Typography variant="body1" paragraph>
          Track your daily meals, monitor calorie intake, and stay on top
          of your nutrition goals! Easily log food and view progress to
          stay motivated.
        </Typography>

        <Button
          component={Link}
          to="/edit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Your First Meal
        </Button>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body1">
            Have questions or feedback? Reach out anytime!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            📧 Email: <Link href="mailto:naveenapolineni2@gmail.com">
              Naveena Polineni
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
