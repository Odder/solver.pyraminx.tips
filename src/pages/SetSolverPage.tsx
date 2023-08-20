import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import pyraminxolver from '../services/pyraminxolver/pyraminxolver';
import pyraminx from '../services/pyraminxolver/pyraminx';
import { Checkbox, Fab, FormControlLabel, FormGroup, Pagination, Stack, TextField } from '@mui/material';
import { scorers, parseAlg } from '../scorers/all';
import App from './App';
import HelpIcon from '@mui/icons-material/Help';
import Navigation from '../components/Navigation';
import SolverSettingsForm from '../components/SolverSettingsForm';
import CaseCard from '../components/CaseCard';
import SetStatisticsDialog from '../components/SetStatisticsDialog';
import { useSearchParams } from 'react-router-dom';
import PyraState from '../services/pyrastate/pyrastate';

const defaultParams = {
  ep: [1, 1, 1, 1, 1, 1],
  co: [1, 1, 1, 1],
  slack: 0,
  setup: '',
  scorer: 'Home Grip',
}

export default function SetSolverPage() {
  const [params, setParams] = useSearchParams();
  const initialParams = params.get('state') ? PyraState.decode(params.get('state') as string) : defaultParams;

  const [eo, setEo] = React.useState([1, 1, 1, 1, 1, 1]);
  const [ep, setEp] = React.useState(initialParams.ep);
  const [co, setCo] = React.useState(initialParams.co);
  const [cases, setCases] = React.useState<number[]>([]);
  const [slack, setSlack] = React.useState(initialParams.slack);
  const [scramble, setScramble] = React.useState<string>(initialParams.setup);
  const [caseMask, setCaseMask] = React.useState<string>('');
  const [solutions, setSolutions] = React.useState([] as any[]);
  const [scorer, setScorer] = React.useState(params.get('scorer') ?? 'Home Grip' as string);
  const [stateIdx, setStateIdx] = React.useState(0 as number);
  const [page, setPage] = React.useState(parseInt(params.get('slack') ?? '1'));
  const [px, setPx] = React.useState(null as any);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const pyra = pyraminx()

  React.useEffect(() => {
    if (!px) return;
    const solutions = px.search(stateIdx, slack);
    solutions.sort((a: any, b: any) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])));
    setSolutions(solutions as any[]);
  }, [stateIdx, slack, scorer]);

  React.useEffect(() => {
    if (!px) return;
    setStateIdx(px.scrambleToState(scramble.trim().toUpperCase()));
  }, [scramble, px]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    const state = pyra.idToState(stateIdx);
    const cornerMask = [co[0], co[3], co[1], co[2]].map((value) => value ? '-' : 'I').join('');
    const edgeMask = [2, 0, 4, 3, 5, 1].map((value) => ep[state.ep.indexOf(value)] ? '-' : 'I').join('');
    const mask = `CORNERS:${cornerMask},CORNERS2:${cornerMask},EDGES:${edgeMask}`;
    setCaseMask(mask.replace(/-/g, 'D').replace(/I/g, '-'));
    twisty.experimentalStickeringMaskOrbits = mask;

    setCases(pyra.generateSet(
      {
        eo: ep.map((value) => value ? 0 : -1),
        ep: ep.map((value, i) => value ? i : -1),
        co: co.map((value) => value ? 0 : -1),
      },
      stateIdx,
    ));
  }, [eo, ep, co, stateIdx, px]);

  React.useEffect(() => {
    setParams(
      {
        state: PyraState.encode({
          ep: ep,
          co: co,
          slack: slack,
          scorer: scorer,
          setup: scramble ? scramble.toUpperCase() : '',
        }),
      }
    );
  }, [ep, co, slack, scramble, scorer, page]);

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
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
              Set Solver
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
          </Box>

          <TextField sx={{ width: "100%" }} id="outlined-basic" label="Setup" variant="outlined" value={scramble} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const twisty = document.getElementsByTagName('twisty-player')[0] as any;
            if (solutions[0] && solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
              twisty.alg = solutions[0][0];
            }
            setScramble(event.target.value)
          }}
            inputProps={{ style: { textTransform: "uppercase" } }} />
          <Box>
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
            slack={slack}
            setSlack={setSlack}></SolverSettingsForm>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Typography variant="h6" component="h5" gutterBottom textAlign="center">{cases.length} cases</Typography>
              <HelpIcon onClick={() => setDialogOpen(true)} sx={{ cursor: 'pointer' }}></HelpIcon>
            </Stack>
            <SetStatisticsDialog
              open={dialogOpen}
              cases={cases}
              px={px}
              slack={slack}
              handleClose={() => setDialogOpen(false)}></SetStatisticsDialog>
          </Box>
          {cases.length > 10 && <Pagination count={Math.ceil(cases.length / 10)} page={page} onChange={handlePageChange} />}
          {cases.slice((page - 1) * 10, (page) * 10).map((state, index) => (
            <CaseCard
              key={state}
              state={state}
              px={px}
              scorer={scorer}
              slack={slack}
              title={index + 1}
              mask={caseMask}
            ></CaseCard>
          ))}
          {cases.length > 10 && <Pagination count={Math.ceil(cases.length / 10)} page={page} onChange={handlePageChange} />}
        </Stack>

      </Container >
    </App >
  );
}
