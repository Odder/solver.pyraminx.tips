import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { scorers, parseAlg } from '../scorers/all';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import detect from '../services/pyraminxolver/methodDetector';
import { Chip } from '@mui/material';

export default function SolutionsList({ solutions, scorer, state, displayAlg, pyra, filterComputerSolves, filterBadAlgs }: { solutions: any[], scorer: string, state: number, displayAlg: (alg: string) => void, pyra: any, filterComputerSolves?: boolean, filterBadAlgs?: boolean }) {
  const [showAll, setShowAll] = React.useState(false);
  const showLimit = 3;
  const filteredSolutions = solutions.filter((s) => {
    if (filterComputerSolves) {
      return !!detect(pyra, state, s[2]);;
    }
    return true;
  }).filter((s) => {
    if (filterBadAlgs) {
      return scorers[scorer](parseAlg(s[0])) <= scorers[scorer](parseAlg(solutions[0][0])) + 1;
    }
    return true;
  });

  const methodChip = (solution: any) => {
    const method = detect(pyra, state, solution[2]);
    if (method) {
      return (
        <Chip
          label={method}
          size="small"
          sx={{ marginLeft: 'auto' }}
          color="primary"
        ></Chip>
      );
    }
    return (<></>);
  }

  return (
    <Paper elevation={2}>
      {filteredSolutions.length ?
        <List>
          {filteredSolutions.slice(0, showAll ? filteredSolutions.length : showLimit).map((solution) => {
            return (
              <ListItem key={`solutions - ${solution[0]} `}>
                <ListItemButton onClick={() => displayAlg(solution[0])}>
                  <ListItemText
                    primary={solution[0]}
                    secondary={`${scorers[scorer](parseAlg(solution[0])).toFixed(2)}`}
                  />

                  {methodChip(solution)}
                </ListItemButton>
              </ListItem>
            )
          })}
          {!showAll && filteredSolutions.length > showLimit &&
            <ListItem>
              <ListItemButton onClick={() => setShowAll(true)}>
                <ListItemText
                  secondary={`See all ${filteredSolutions.length} solutions`}
                />
              </ListItemButton>
            </ListItem>
          }
          {showAll && filteredSolutions.length > showLimit &&
            <ListItem>
              <ListItemButton onClick={() => setShowAll(false)}>
                <ListItemText
                  secondary={`Show less solutions`}
                />
              </ListItemButton>
            </ListItem>
          }
        </List>
        : <List>
          <ListItem>
            <ListItemText
              secondary="No solutions found"
            />
          </ListItem></List>}
    </Paper>
  );
}