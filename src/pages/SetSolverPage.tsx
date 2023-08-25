import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Checkbox, Drawer, FormControlLabel, FormGroup, Pagination, Stack, Switch, TextField, Toolbar } from '@mui/material';
import { scorers, parseAlg } from '../services/scorers/all';
import App from './App';
import HelpIcon from '@mui/icons-material/Help';
import Navigation from '../components/Navigation';
import SolverSettingsForm from '../components/SolverSettingsForm';
import CaseCard from '../components/CaseCard';
import SetStatisticsDialog from '../components/SetStatisticsDialog';
import { useSearchParams } from 'react-router-dom';
import PyraState from '../services/pyrastate/pyrastate';
import usePyraminxStore from '../stores/usePyraminxStore';
import useSetSolverStore from '../stores/useSetSolverStore';
import usePyraSettingsStore from '../stores/usePyraSettingsStore';
import ConfigurationDrawer from '../components/SetSolver/ConfigurationDrawer';


export default function SetSolverPage() {
  const [params, setParams] = useSearchParams();
  const [caseMask, setCaseMask] = React.useState<string>('');
  const [solutions, setSolutions] = React.useState([] as any[]);
  const [page, setPage] = React.useState(parseInt(params.get('slack') ?? '1'));
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const px = usePyraminxStore((state: any) => state.pyraminXolver);
  const {
    fixedEdges,
    fixedCenters,
    cases,
  } = useSetSolverStore((state) => state);

  const {
    slack,
    scorer,
    filterBadAlgs,
    setup: scramble,
  } = usePyraSettingsStore((state) => state);

  React.useEffect(() => {
    setParams(
      {
        state: PyraState.encode({
          fixedEdges: fixedEdges,
          fixedCenters: fixedCenters,
          slack: slack,
          scorer: scorer,
          setup: scramble ? scramble.toUpperCase() : '',
          filterComputerSolves: false,
          filterBadAlgs: filterBadAlgs,
        }),
      }
    );
  }, [fixedEdges, fixedCenters, slack, scramble, scorer, page, filterBadAlgs]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  }

  return (
    <App>
      <Navigation></Navigation>
      <ConfigurationDrawer></ConfigurationDrawer>
      <Container maxWidth="sm">
        <Stack direction="column" spacing={4}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Set Solver
          </Typography>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Typography variant="h6" component="h5" gutterBottom textAlign="center">{cases.length} cases</Typography>
              <HelpIcon onClick={() => setDialogOpen(true)} sx={{ cursor: 'pointer' }}></HelpIcon>
            </Stack>
            <SetStatisticsDialog
              open={dialogOpen}
              cases={cases}
              handleClose={() => setDialogOpen(false)}></SetStatisticsDialog>
          </Box>
          {cases.length > 10 && <Pagination count={Math.ceil(cases.length / 10)} page={page} onChange={handlePageChange} />}
          {cases.slice((page - 1) * 10, (page) * 10).map((state, index) => (
            <CaseCard
              key={state}
              state={state}
            ></CaseCard>
          ))}
          {cases.length > 10 && <Pagination count={Math.ceil(cases.length / 10)} page={page} onChange={handlePageChange} />}
        </Stack>
      </Container >
    </App >
  );
}
