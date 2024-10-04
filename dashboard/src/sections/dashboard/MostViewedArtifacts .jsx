/* eslint-disable prettier/prettier */
// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';

import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// project-imports
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';

// assets
import { Add, Link1 } from 'iconsax-react';

// =========================|| DATA WIDGET - MOST VIEWED ARTIFACTS ||========================= //

export default function MostViewedArtifacts({ artifacts }) {
  return (
    <MainCard title="Most Viewed Artifacts">
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <List>
            {artifacts.map((artifact, index) => (
              <ListItemButton key={index} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                <ListItemIcon>
                  <Dot color={index === 0 ? 'success' : index < 3 ? 'warning' : 'default'} />
                </ListItemIcon>
                <ListItemText primary={artifact.name} />
                <Chip
                  label={
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.5, '& svg': { width: 12, height: 12 } }}>
                      <Link1 /> {artifact.views}
                    </Typography>
                  }
                  size="small"
                  sx={{ borderRadius: 1 }}
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
  
      </Grid>
    </MainCard>
  );
}
