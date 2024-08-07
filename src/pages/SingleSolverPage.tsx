import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Properties } from '../services/pyraminxolver/pyraminx';
import TextField from '@mui/material/TextField';
import { Chip, Drawer, FormControlLabel, FormGroup, Stack, Switch, Toolbar } from '@mui/material';
import { scorers, parseAlg } from '../services/scorers/all';
import App from './App';
import Navigation from '../components/Navigation';
import SolutionsList from '../components/SolutionsList';
import SolverSettingsForm from '../components/SolverSettingsForm';
import usePyraminxStore from '../stores/usePyraminxStore';
import usePyraSettingsStore from '../stores/usePyraSettingsStore';

export default function SingleSolverPage() {
  const [solutions, setSolutions] = React.useState([] as any[]);
  const [stateIdx, setStateIdx] = React.useState(0 as number);

  const {
    setup: scramble,
    slack,
    scorer,
    filterComputerSolves,
    setSetup: setScramble,
    setFilterComputerSolves,
  } = usePyraSettingsStore((state) => state);

  const pyra = usePyraminxStore((state: any) => state.pyra);
  const px = usePyraminxStore((state: any) => state.pyraminXolver);

  React.useEffect(() => {
    if (!px) return;
    const solutions = px.search(stateIdx, slack);
    solutions.sort((a: any, b: any) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])));
    setSolutions(solutions as any[]);
  }, [stateIdx, slack, scorer]);

  React.useEffect(() => {
    if (!px) return;
    setStateIdx(px.scrambleToState(scramble.trim().toUpperCase()));
  }, [scramble]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    if (solutions[0] && solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
      twisty.alg = solutions[0][0];
    }
  }, [solutions]);

  React.useEffect(() => {
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    if (twisty) {
      let callback: any;
      twisty?.experimentalModel?.coarseTimelineInfo.addFreshListener(async (info: any) => {
        if (info.atEnd && !info.atStart && info.playing === false) {
          if (callback) {
            clearTimeout(callback);
          }
          callback = () => {
            twisty.timestamp = 0;
          }
          setTimeout(callback, 700);
        }
      });
    }
  }, [px]);

  const displayAlg = (alg: string) => {
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    twisty.alg = alg;
    twisty.timestamp = 0;
    twisty.play();
  }

  return (
    <App>
      <Navigation></Navigation>
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
              <TextField sx={{ width: "100%" }} id="outlined-basic" label="Scramble" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const twisty = document.getElementsByTagName('twisty-player')[0] as any;
                if (solutions[0] && solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
                  twisty.alg = solutions[0][0];
                }
                setScramble(event.target.value)
              }}
                inputProps={{ style: { textTransform: "uppercase" } }} />
            </Box>
            <SolverSettingsForm />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={filterComputerSolves}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setFilterComputerSolves(event.target.checked) }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    Only show human solutions
                  </Typography>
                } />
            </FormGroup>
          </Stack>
        </Box>
      </Drawer>
      <Container maxWidth="sm">
        <Stack direction="column" spacing={4}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Pyraminx Solver
          </Typography>
          <Stack direction="column" spacing={4} sx={{
            display: { xs: 'flex', md: 'none' }
          }}>
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
              <TextField sx={{ width: "100%" }} id="outlined-basic" label="Scramble" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const twisty = document.getElementsByTagName('twisty-player')[0] as any;
                if (solutions[0] && solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
                  twisty.alg = solutions[0][0];
                }
                setScramble(event.target.value)
              }}
                inputProps={{ style: { textTransform: "uppercase" } }} />
            </Box>
            <SolverSettingsForm></SolverSettingsForm>
            <Box>
              <Stack direction="row" justifyContent="center" spacing={2}>
                {Object.keys(Properties).map((key) => {
                  if (pyra?.hasProperty(stateIdx, Properties[key as keyof typeof Properties])) {
                    return <Chip color="secondary" key={key} label={key} />
                  }
                })}
              </Stack>
            </Box>
          </Stack>
          <SolutionsList
            solutions={solutions}
            state={stateIdx}
            displayAlg={displayAlg}></SolutionsList>
        </Stack>
      </Container >
    </App>
  );
}
