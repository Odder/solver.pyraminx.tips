import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

export default function SolverSettingsForm({ setSlack, setScorer, scorer }: { setSlack: (slack: number) => void, setScorer: (scorer: string) => void, scorer: string }) {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={8}>
          <Tooltip title="The depth of the search. How many moves from optimal solution do you want to search?">
            <InputLabel>Slack</InputLabel>
          </Tooltip>
          <Slider
            aria-label="slack"
            defaultValue={0}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={3}
            onChange={(event: Event, value: number | number[]) => setSlack(value as number)}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Tooltip title="How do you want to rank/sort the solutions found?">
            <InputLabel id="demo-simple-select-filled-label">Scorer</InputLabel>
          </Tooltip>
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
