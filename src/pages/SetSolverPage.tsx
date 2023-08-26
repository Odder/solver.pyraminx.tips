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
import GroupedCaseCard from '../components/GroupedCaseCard';
import { groupBySymmetries } from '../services/pyraminxolver/set';
import usePyraminxStore from '../stores/usePyraminxStore';


export default function SetSolverPage() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = React.useState(parseInt(params.get('slack') ?? '1'));
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const px = usePyraminxStore((state) => state.pyraminXolver);

  const {
    fixedEdges,
    fixedCenters,
    cases,
    groups,
    groupBySymmetries: shouldGroup,
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
              <Typography variant="h6" component="h5" gutterBottom textAlign="center">{shouldGroup ? groups.length : cases.length} cases</Typography>
              <HelpIcon onClick={() => setDialogOpen(true)} sx={{ cursor: 'pointer' }}></HelpIcon>
            </Stack>
            <SetStatisticsDialog
              open={dialogOpen}
              cases={cases}
              handleClose={() => setDialogOpen(false)}></SetStatisticsDialog>
          </Box>
          {!shouldGroup && cases.length > 15 && <Pagination count={Math.ceil(cases.length / 15)} page={page} onChange={handlePageChange} />}
          {!shouldGroup && cases.slice((page - 1) * 15, (page) * 15).map((state, index) => (
            <CaseCard
              key={state}
              state={state}
              title={`Case ${index + 1 + (page - 1) * 15}`}
            ></CaseCard>
          ))}
          {!shouldGroup && cases.length > 15 && <Pagination count={Math.ceil(cases.length / 15)} page={page} onChange={handlePageChange} sx={{ width: '100%' }} />}
          {shouldGroup && groups.length > 15 && <Pagination count={Math.ceil(groups.length / 15)} page={page} onChange={handlePageChange} />}
          {shouldGroup && groups.slice((page - 1) * 15, (page) * 15).map((states: number[], index: number) => (
            <GroupedCaseCard
              key={states[0]}
              states={states}
              title={`Case ${index + 1 + (page - 1) * 15}`}
            ></GroupedCaseCard>
          ))}
          {shouldGroup && groups.length > 15 && <Pagination count={Math.ceil(groups.length / 15)} page={page} onChange={handlePageChange} sx={{ width: '100%' }} />}
        </Stack>
      </Container >
    </App >
  );
}
