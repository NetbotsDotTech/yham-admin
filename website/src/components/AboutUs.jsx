import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "magnific-popup/dist/magnific-popup.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "odometer/themes/odometer-theme-default.css";
import "../style.css";
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function AboutUs() {
  return (
    <Box sx={{ padding: '2rem 0' }}>
      {/* About Us Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          About Yousuf Hussainabadi Museum
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          Situated between the two mountain ranges of the Himalaya and the Karakoram, the geographic isolation of Baltistan preserved its centuries-old culture from being affected by surrounding cultures. With the construction of a jeep road in 1968 and a truck road in 1980, Baltistan was finally linked with the outside world by an all-weather road. This newfound connectivity brought Baltistan into contact with different cultures, sparking a significant cultural revolution in the 1970s and 1980s. During this time, many traditional tools, clothing, and artifacts were abandoned, and precious antiques were rapidly taken away by traders. Despite this cultural upheaval, no efforts were made to preserve these artifacts.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          In this context, Yousuf Hussainabadi stepped forward with personal resources to preserve Baltistan's antiquities. Through tireless effort, he established the Yousuf Hussainabadi Museum Skardu, which houses over 6,500 artifacts of Baltistan's history and culture. The museum also includes a research library with books, manuscripts, historic documents, and recordings of folk songs and tales. It stands as the largest collection of artifacts in Gilgit-Baltistan and plays a vital role in cultural tourism and research.
        </Typography>

        {/* Yousuf Hussainabadi Info Card */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={5}>
            <Card>
              <CardMedia
                component="img"
                height="250"
                image="/img/team/yousuf.png"
                alt="Yousuf Hussainabadi"
              />
              <CardContent>
                <Typography variant="h5">Yousuf Hussainabadi</Typography>
                <Typography variant="subtitle1" color="textSecondary">Historian and Founder</Typography>
                <Typography variant="body2" paragraph>
                  Yousuf Hussainabadi is a historian, linguist, and educationist who has significantly contributed to the preservation and promotion of Baltistan's culture. His achievements include translating the Holy Quran into Balti, compiling the history of the liberation war of Baltistan, and reviving the old Yige script of the Balti language.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <IconButton href="https://facebook.com/" aria-label="facebook">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton href="https://twitter.com/" aria-label="twitter">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton href="https://linkedin.com/" aria-label="linkedin">
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ padding: '1rem' }}>
              <Typography variant="h6">Contact Information</Typography>
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Experience:</strong> Over 50 Years</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Phone:</strong> 0300-5290548</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Email:</strong> yousufhussainabadi@yahoo.com</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* Awards & Recognitions */}
        <Typography variant="h5" sx={{ mt: 5 }}>Awards & Recognitions</Typography>
        <ul>
          <li>President’s Award for Pride of Performance (Literature-History)</li>
          <li>Honorary Professor Emeritus, University of Baltistan Skardu</li>
        </ul>

        {/* Literary Works */}
        <Typography variant="h5" sx={{ mt: 4 }}>Literary Works</Typography>
        <Typography variant="body1" paragraph>
          Mr. Hussainabadi's notable works include the translation of the Holy Quran into Balti, his book “Tareekh-e-Baltistan,” and the revival of the old Yige script of Balti. His research has significantly contributed to the understanding and preservation of Baltistan's history and language.
        </Typography>

        {/* Education & Experience */}
        <Typography variant="h5" sx={{ mt: 4 }}>Education & Experience</Typography>
        <Typography variant="body1" paragraph>
          He has studied Islamic Studies at Punjab University Lahore and obtained Al-Shahadatul Alamia from Wifaqul Madaris Pakistan. His professional experience includes roles as Lecturer, Project Manager, District Project Manager, Assistant Regional Director, and Professor of Islamic Studies and Principal at Jinnah College Skardu.
        </Typography>

        {/* Other Activities */}
        <Typography variant="h5" sx={{ mt: 4 }}>Other Activities</Typography>
        <Typography variant="body1" paragraph>
          Mr. Hussainabadi has established various educational institutions and cultural initiatives, including Jinnah Public School, Jinnah College, Balti Museum Skardu, and Jinnah Park Skardu. His efforts have positively impacted education and tourism in Baltistan.
        </Typography>

        {/* Languages */}
        <Typography variant="h5" sx={{ mt: 4 }}>Languages</Typography>
        <Typography variant="body1" paragraph>
          Mr. Hussainabadi is fluent in English, Arabic, Persian, Urdu, and Balti.
        </Typography>

        {/* Board/Committee Memberships */}
        <Typography variant="h5" sx={{ mt: 4 }}>Board/Committee Memberships</Typography>
        <Typography variant="body1" paragraph>
          He is a member of the Board of Directors, Aga Khan Cultural Service Pakistan, and the Gilgit Baltistan Provincial Managing Committee of Pakistan Red Crescent Society.
        </Typography>
      </Container>
    </Box>
  );
}
