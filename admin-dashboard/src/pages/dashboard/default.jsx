/* eslint-disable prettier/prettier */
// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project-imports
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import EcommerceDataChart from 'sections/dashboard/EcommerceDataChart';

import RepeatCustomerRate from 'sections/dashboard/RepeatCustomerRate'; // Can be replaced or renamed as per your data (e.g., ArtifactViewRate)
import MostViewedArtifacts from 'sections/dashboard/MostViewedArtifacts '; // Can be replaced with something relevant (e.g., Recent Artifact Updates)

import Feedbacks from 'sections/dashboard/Feedbacks'; // Rename to something like Artifact Transactions
import TotalIncome from 'sections/dashboard/TotalIncome'; // Rename to something like Visitor Stats

// assets
import { ArrowDown, ArrowUp, Book, CloudChange, Eye, Archive } from 'iconsax-react'; // Updated to relevant icons

// ==============================|| DASHBOARD - MUSEUM ||============================== //

const artifacts = [
  { name: 'Artifact A', views: 150 },
  { name: 'Artifact B', views: 120 },
  { name: 'Artifact C', views: 100 },
  { name: 'Artifact D', views: 80 },
  { name: 'Artifact E', views: 60 }
];

// In your parent component
<MostViewedArtifacts artifacts={artifacts} />

export default function DashboardDefault() {
  const theme = useTheme();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 - Artifact-related statistics */}
      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Total Artifacts"
          count="3,200" // This would come from your artifact API/data
          iconPrimary={<Archive />} // Icon representing artifacts
          percentage={
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 5.2% {/* Growth percentage */}
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.primary.main} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Visible"
          count="2,980"
          color="success"
          iconPrimary={<Eye color={theme.palette.success.darker} />} // Icon representing visibility
          percentage={
            <Typography color="success.darker" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 2.3%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.success.darker} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Hidden"
          count="220"
          color="error"
          iconPrimary={<Book color={theme.palette.error.dark} />} // Icon representing hidden artifacts
          percentage={
            <Typography color="error.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowDown size={16} style={{ transform: 'rotate(45deg)' }} /> 1.2%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.error.dark} />
        </EcommerceDataCard>
      </Grid>

      <Grid item xs={12} sm={6} lg={3}>
        <EcommerceDataCard
          title="Most Viewed"
          count="5,40" // Adjust to dynamic data
          color="warning"
          iconPrimary={<CloudChange color={theme.palette.warning.dark} />} // Can use a view-related icon
          percentage={
            <Typography color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> 15.4%
            </Typography>
          }
        >
          <EcommerceDataChart color={theme.palette.warning.dark} />
        </EcommerceDataCard>
      </Grid>

      {/* row 2 */}
      <Grid item xs={12} md={8} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <RepeatCustomerRate /> {/* Rename to ArtifactViewRate or similar */}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <MostViewedArtifacts artifacts={artifacts} />
      </Grid>

      {/* row 3 */}
      <Grid item xs={12}>
        <Feedbacks /> {/* Make Feedbacks full width */}
      </Grid>
    </Grid>
  );
}
