import * as React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { scorers, parseAlg } from '../scorers/all';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function SolutionsList({ solutions, scorer, displayAlg }: { solutions: any[], scorer: string, displayAlg: (alg: string) => void }) {

  return (
    <Paper elevation={2}>
      {solutions.length ?
        <List>
          {solutions.map((solution) => {
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
        </List>
        : <List>
          <ListItem>
            <ListItemText
              primary="No solutions found"
            />
          </ListItem></List>}
    </Paper>
  );
}