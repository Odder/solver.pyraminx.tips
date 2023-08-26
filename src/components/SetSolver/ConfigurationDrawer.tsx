import * as React from 'react';
import { Box, Checkbox, Drawer, FormControlLabel, FormGroup, Stack, Switch, TextField, Toolbar, Typography } from '@mui/material';
import useSetSolverStore from '../../stores/useSetSolverStore';
import usePyraSettingsStore from '../../stores/usePyraSettingsStore';
import usePyraminxStore from '../../stores/usePyraminxStore';
import SolverSettingsForm from '../SolverSettingsForm';
import { generateSet, groupBySymmetries } from '../../services/pyraminxolver/set';

export default function ConfigurationDrawer() {
  const {
    fixedEdges,
    fixedCenters,
    setFixedEdges,
    setFixedCenters,
    stateIdx,
    setCases,
    setGroups,
    setCaseMask,
    setStateIdx,
    groupBySymmetries: shouldGroup,
    setGroupBySymmetries: setShouldGroup,
  } = useSetSolverStore((state) => state);

  const {
    setup: scramble,
    setSetup: setScramble,
  } = usePyraSettingsStore((state) => state);

  const {
    pyraminXolver: px,
    pyraminx: pyra,
  } = usePyraminxStore((state) => state);

  const [solution, setSolution] = React.useState([] as any[]);


  React.useEffect(() => {
    if (!px) return;
    const solutions = px.search(stateIdx, 0);
    setSolution(solutions[0]);
  }, [stateIdx]);

  React.useEffect(() => {
    if (!px) return;
    setStateIdx(px.scrambleToState(scramble.trim().toUpperCase()));
  }, [scramble, px]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    if (solution && solution[0] && solution[0] !== twisty.attributes.alg.value) {
      twisty.alg = solution[0];
    }
  }, [solution]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    const state = pyra.idToState(stateIdx);
    const cornerMask = [fixedCenters[0], fixedCenters[3], fixedCenters[1], fixedCenters[2]].map((value) => value ? '-' : 'I').join('');
    const edgeMask = [2, 0, 4, 3, 5, 1].map((value) => fixedEdges[state.ep.indexOf(value)] ? '-' : 'I').join('');
    const mask = `CORNERS:${cornerMask},CORNERS2:${cornerMask},EDGES:${edgeMask}`;
    setCaseMask(mask.replace(/-/g, 'D').replace(/I/g, '-'));
    twisty.experimentalStickeringMaskOrbits = mask;

    const cases = generateSet(
      pyra,
      {
        eo: fixedEdges.map((value) => value ? 0 : -1),
        ep: fixedEdges.map((value, i) => value ? i : -1),
        co: fixedCenters.map((value) => value ? 0 : -1),
      },
      stateIdx,
      // groupBySymmetry
    );
    setCases(cases);
    setGroups(groupBySymmetries(px, cases));

  }, [fixedEdges, fixedCenters, stateIdx, px]);


  const handleFixedCentersChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const localFixedCenters = [...fixedCenters];
    localFixedCenters[index] = event.target.checked ? 1 : 0;
    setFixedCenters([...localFixedCenters]);
  }

  const handleFixedEdgesChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const localFixedEdges = [...fixedEdges];
    localFixedEdges[index] = event.target.checked ? 1 : 0;
    setFixedEdges([...localFixedEdges]);
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
        display: { xs: 'none', md: 'flex' }
      }}
    >
      <Box padding={4}>
        <Toolbar />

        <Box sx={{ overflow: 'auto' }}>
        </Box>
        <Stack direction="column" spacing={4}>

          <Box sx={{ my: 4 }}>
            <twisty-player
              style={{ width: "100%" }}
              puzzle="pyraminx"
              alg=""
              hint-facelets="floating"
              experimental-setup-anchor="end"
              control-panel="none"
              background="none"
              camera-latitude-limit="90"
              camera-latitude="80"> </twisty-player>
          </Box>
          <TextField sx={{ width: "100%" }} id="outlined-basic" label="Setup" variant="outlined" value={scramble} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const twisty = document.getElementsByTagName('twisty-player')[0] as any;
            if (solution && solution[0] !== twisty.attributes.alg.value) {
              twisty.alg = solution[0];
            }
            setScramble(event.target.value)
          }}
            inputProps={{ style: { textTransform: "uppercase" } }} />
          <Box>
            <Stack direction="column" spacing={4}>
              <FormGroup>
                <Typography variant="h6" component="h1" gutterBottom textAlign="center">Edges</Typography>
                <Stack direction="row" alignItems="center" justifyContent="center" flexWrap="wrap">
                  <FormControlLabel control={<Checkbox checked={!!fixedEdges[0]} onChange={handleFixedEdgesChange(0)} />} label="UB" />
                  <FormControlLabel control={<Checkbox checked={!!fixedEdges[1]} onChange={handleFixedEdgesChange(1)} />} label="UR" />
                  <FormControlLabel control={<Checkbox checked={!!fixedEdges[2]} onChange={handleFixedEdgesChange(2)} />} label="UL" />
                  <FormControlLabel control={<Checkbox checked={!!fixedEdges[3]} onChange={handleFixedEdgesChange(3)} />} label="BR" />
                  <FormControlLabel control={<Checkbox checked={!!fixedEdges[4]} onChange={handleFixedEdgesChange(4)} />} label="RL" />
                  <FormControlLabel control={<Checkbox checked={!!fixedEdges[5]} onChange={handleFixedEdgesChange(5)} />} label="BL" />
                </Stack>
              </FormGroup>
              <FormGroup>
                <Typography variant="h6" component="h1" gutterBottom textAlign="center">Centers</Typography>
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={!!fixedCenters[0]} onChange={handleFixedCentersChange(0)} />} label="U" />
                  <FormControlLabel control={<Checkbox checked={!!fixedCenters[1]} onChange={handleFixedCentersChange(1)} />} label="R" />
                  <FormControlLabel control={<Checkbox checked={!!fixedCenters[2]} onChange={handleFixedCentersChange(2)} />} label="L" />
                  <FormControlLabel control={<Checkbox checked={!!fixedCenters[3]} onChange={handleFixedCentersChange(3)} />} label="B" />
                </Stack>
              </FormGroup>
            </Stack>
          </Box>
          <SolverSettingsForm />
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={shouldGroup}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setShouldGroup(event.target.checked) }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  Group by Symmetry
                </Typography>
              } />
          </FormGroup>

        </Stack>
      </Box>
    </Drawer>
  )
}
