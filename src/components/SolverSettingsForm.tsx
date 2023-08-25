import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material';
import usePyraSettingsStore from '../stores/usePyraSettingsStore';

export default function SolverSettingsForm() {
  const {
    slack,
    setSlack,
    scorer,
    setScorer,
    filterBadAlgs,
    setFilterBadAlgs,
  } = usePyraSettingsStore((state) => state);

  return (
    <Stack direction="row">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
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
            value={slack}
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
            <MenuItem value="Move Count">Move Count</MenuItem>
            <MenuItem value="Weighted Moves">Weighted Moves</MenuItem>
            <MenuItem value="Home Grip">Home Grip</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={filterBadAlgs}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFilterBadAlgs(event.target.checked) }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Only show good algs
                </Typography>
              } />
          </FormGroup>
        </Grid>
      </Grid>
    </Stack>
  );
}
