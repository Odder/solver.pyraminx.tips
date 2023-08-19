import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { scorers, parseAlg } from '../scorers/all';

export default function SolutionsList({ cases, open, px, slack, handleClose }: { cases: any[], open: boolean, px: any, slack: number, handleClose: () => void }) {
  const [stats, setStats] = React.useState<any>(Object.keys(scorers).map((scorer) => { return { scorer: scorer, stats: null } }));

  React.useEffect(() => {
    if (open) {
      generateSetStats();
    }
  }, [open]);

  const generateSetStats = () => {
    const caseSolutions = cases.map((c) => px.search(c, slack));
    const caseStats: any[] = [];
    for (const scorer in scorers) {
      const solutions = caseSolutions.map((c: any) => c.map((s: any) => scorers[scorer](parseAlg(s[0]))).sort((a: number, b: number) => a - b)[0]).sort((a: number, b: number) => a - b)
      caseStats.push({
        scorer: scorer,
        stats: {
          mean: solutions.reduce((a: number, b: number) => a + b) / solutions.length,
          median: solutions[Math.floor(solutions.length / 2)],
          best: solutions[0],
          worst: solutions[solutions.length - 1],
          stddev: Math.sqrt(solutions.map((x: number) => Math.pow(x - solutions.reduce((a: number, b: number) => a + b) / solutions.length, 2)).reduce((a: number, b: number) => a + b) / solutions.length),
          count: solutions.length,
        }
      });
    }
    setStats(caseStats);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set Statistics</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper} style={{ overflow: 'hidden' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Scorer</TableCell>
                <TableCell align="right">Mean</TableCell>
                <TableCell align="right">Median</TableCell>
                <TableCell align="right">Best</TableCell>
                <TableCell align="right">Worst</TableCell>
                <TableCell align="right">Stddev</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((row: any) => (
                <TableRow
                  key={row.name}
                >
                  <TableCell component="th" scope="row">
                    {row.scorer}
                  </TableCell>
                  <TableCell align="right">{row.stats?.mean.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.stats?.median.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.stats?.best.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.stats?.worst.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.stats?.stddev.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.stats?.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}