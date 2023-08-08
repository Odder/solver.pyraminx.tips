import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import pyraminxolver from '../services/pyraminxolver/pyraminxolver';
import pyraminx from '../services/pyraminxolver/pyraminx';
import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { scorers, parseAlg } from '../scorers/all';
import App from './App';
import Navigation from '../components/Navigation';
import SolverSettingsForm from '../components/SolverSettingsForm';
import CaseCard from '../components/CaseCard';

export default function SetSolverPage() {
  const [eo, setEo] = React.useState([1, 1, 1, 1, 1, 1] as number[]);
  const [ep, setEp] = React.useState([1, 1, 1, 1, 1, 1] as number[]);
  const [co, setCo] = React.useState([1, 1, 1, 1] as number[]);
  const [cases, setCases] = React.useState([] as number[]);
  const [slack, setSlack] = React.useState(0);
  const [solutions, setSolutions] = React.useState([] as any[]);
  const [scorer, setScorer] = React.useState('homeGripScorer' as string);
  const [stateIdx, setStateIdx] = React.useState(0 as number);
  const [px, setPx] = React.useState(null as any);
  const pyra = pyraminx()

  React.useEffect(() => {
    if (!px) return;
    const solutions = px.search(stateIdx, slack);
    solutions.sort((a: any, b: any) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])));
    setSolutions(solutions as any[]);
  }, [stateIdx, slack, scorer]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    const cornerMask = [co[0], co[1], co[2], co[3]].map((value) => value ? '-' : 'I').join('');
    const edgeMask = [ep[2], ep[0], ep[4], ep[3], ep[5], ep[1]].map((value) => value ? '-' : 'I').join('');
    const mask = `CORNERS:${cornerMask},CORNERS2:${cornerMask},EDGES:${edgeMask}`;
    twisty.experimentalStickeringMaskOrbits = mask;

    setCases(pyra.generateSet(
      {
        eo: ep.map((value) => value ? 0 : -1),
        ep: ep.map((value, i) => value ? i : -1),
        co: co.map((value) => value ? 0 : -1),
      }
    ));
  }, [eo, ep, co]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    if (solutions[0] && solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
      twisty.alg = solutions[0][0];
    }
  }, [solutions]);


  React.useEffect(() => {
    setPx(pyraminxolver());
  }, []);

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

  const handleEOChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const localEo = [...eo];
    localEo[index] = event.target.checked ? 1 : 0;
    setEo([...localEo]);
  }

  const handleCOChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const localCo = [...co];
    localCo[index] = event.target.checked ? 1 : 0;
    setCo([...localCo]);
  }

  const handleEPChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const localEp = [...ep];
    localEp[index] = event.target.checked ? 1 : 0;
    setEp([...localEp]);
  }


  const displayAlg = (alg: string) => {
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    twisty.alg = alg;
    twisty.timestamp = 0;
    twisty.play();
  }

  return (
    <App>
      <Navigation></Navigation>
      <Container maxWidth="sm">
        <Stack direction="column" spacing={4}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Pyraminx Solver
            </Typography>
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
            <Stack direction="column" spacing={4}>
              <FormGroup>
                <Typography variant="h6" component="h1" gutterBottom textAlign="center">Edges</Typography>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={!!ep[0]} onChange={handleEPChange(0)} />} label="UB" />
                  <FormControlLabel control={<Checkbox checked={!!ep[1]} onChange={handleEPChange(1)} />} label="UR" />
                  <FormControlLabel control={<Checkbox checked={!!ep[2]} onChange={handleEPChange(2)} />} label="UL" />
                  <FormControlLabel control={<Checkbox checked={!!ep[3]} onChange={handleEPChange(3)} />} label="BR" />
                  <FormControlLabel control={<Checkbox checked={!!ep[4]} onChange={handleEPChange(4)} />} label="RL" />
                  <FormControlLabel control={<Checkbox checked={!!ep[5]} onChange={handleEPChange(5)} />} label="BL" />
                </Stack>
              </FormGroup>
              {/* <FormGroup>
                <Typography variant="h6" component="h1" gutterBottom textAlign="center">Edge Orientation</Typography>
                <FormControlLabel control={<Checkbox checked={!!eo[0]} onChange={handleEOChange(0)} />} label="UB" />
                <FormControlLabel control={<Checkbox checked={!!eo[1]} onChange={handleEOChange(1)} />} label="UR" />
                <FormControlLabel control={<Checkbox checked={!!eo[2]} onChange={handleEOChange(2)} />} label="UL" />
                <FormControlLabel control={<Checkbox checked={!!eo[3]} onChange={handleEOChange(3)} />} label="BR" />
                <FormControlLabel control={<Checkbox checked={!!eo[4]} onChange={handleEOChange(4)} />} label="RL" />
                <FormControlLabel control={<Checkbox checked={!!eo[5]} onChange={handleEOChange(5)} />} label="BL" />
              </FormGroup> */}
              <FormGroup>
                <Typography variant="h6" component="h1" gutterBottom textAlign="center">Centers</Typography>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <FormControlLabel control={<Checkbox checked={!!co[0]} onChange={handleCOChange(0)} />} label="U" />
                  <FormControlLabel control={<Checkbox checked={!!co[1]} onChange={handleCOChange(1)} />} label="R" />
                  <FormControlLabel control={<Checkbox checked={!!co[2]} onChange={handleCOChange(2)} />} label="L" />
                  <FormControlLabel control={<Checkbox checked={!!co[3]} onChange={handleCOChange(3)} />} label="B" />
                </Stack>
              </FormGroup></Stack>
          </Box>
          <SolverSettingsForm
            scorer={scorer}
            setScorer={setScorer}
            setSlack={setSlack}></SolverSettingsForm>
          {cases.map((state, index) => (
            <CaseCard
              key={`case-${index}`}
              state={state}
              px={px}
              scorer={scorer}
              slack={slack}
              title={index + 1}
            ></CaseCard>
          ))
          }
        </Stack>
      </Container >
    </App>
  );
}