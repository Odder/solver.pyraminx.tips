import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { scorers, parseAlg } from '../scorers/all';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SolutionsList({ solutions, scorer, displayAlg }: { solutions: any[], scorer: string, displayAlg: (alg: string) => void }) {
  const [showAll, setShowAll] = React.useState(false);
  const showLimit = 5;

  return (
    <Paper elevation={2}>
      {solutions.length ?
        <List>
          {solutions.slice(0, showAll ? solutions.length : showLimit).map((solution) => {
            return (
              <ListItem key={`solution-${solution[0]}`}>
                <ListItemButton onClick={() => displayAlg(solution[0])}>
                  <ListItemText
                    primary={`${solution[0]} (${scorers[scorer](parseAlg(solution[0])).toFixed(2)})`}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
          {!showAll && solutions.length > showLimit &&
            <ListItem>
              <ListItemButton onClick={() => setShowAll(true)}>
                <ListItemText
                  secondary={`See all ${solutions.length} solutions`}
                />
              </ListItemButton>
            </ListItem>
          }
          {showAll && solutions.length > showLimit &&
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