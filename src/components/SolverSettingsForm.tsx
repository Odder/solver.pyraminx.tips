import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function SolverSettingsForm({ setSlack, setScorer, scorer }: { setSlack: (slack: number) => void, setScorer: (scorer: string) => void, scorer: string}) {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={8}>
          <InputLabel>Slack</InputLabel>
          <Slider
            aria-label="slack"
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
            onChange={(event: Event, value: number | number[]) => setSlack(value as number)}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <InputLabel id="demo-simple-select-filled-label">Scorer</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={scorer}
            onChange={(event: SelectChangeEvent) => setScorer(event.target.value as string)}
          >
            <MenuItem value="lengthScorer">Move Count</MenuItem>
            <MenuItem value="naiveScorer">Weighted Moves</MenuItem>
            <MenuItem value="homeGripScorer">Home Grip</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
}
