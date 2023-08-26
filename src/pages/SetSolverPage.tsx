import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Pagination, Stack } from '@mui/material';
import App from './App';
import HelpIcon from '@mui/icons-material/Help';
import Navigation from '../components/Navigation';
import CaseCard from '../components/CaseCard';
import SetStatisticsDialog from '../components/SetStatisticsDialog';
import { useSearchParams } from 'react-router-dom';
import PyraState from '../services/pyrastate/pyrastate';
import useSetSolverStore from '../stores/useSetSolverStore';
import usePyraSettingsStore from '../stores/usePyraSettingsStore';
import ConfigurationDrawer from '../components/SetSolver/ConfigurationDrawer';


export default function SetSolverPage() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = React.useState(parseInt(params.get('slack') ?? '1'));
  const [dialogOpen, setDialogOpen] = React.useState(false);

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
        <Stack direction="column" alignItems="center" spacing={4}>
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
          {cases.length > 20 && <Pagination count={Math.ceil(cases.length / 20)} page={page} onChange={handlePageChange} />}
          {cases.slice((page - 1) * 20, (page) * 20).map((state, index) => (
            <CaseCard
              key={state}
              state={state}
              title={`Case ${index + 1 + (page - 1) * 20}`}
            ></CaseCard>
          ))}
          {cases.length > 20 && <Pagination count={Math.ceil(cases.length / 20)} page={page} onChange={handlePageChange} sx={{ width: '100%' }} />}
        </Stack>
      </Container >
    </App >
  );
}
