import * as React from 'react';
import Card from '@mui/material/Card';
import CaseCard from './CaseCard';
import { CardContent, Typography } from '@mui/material';

export default function GroupedCaseCard({ states, title }: { states: number[], title: string }) {

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', width: '100%' }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2" textAlign="center">
          {title}
        </Typography>
      </CardContent>
      {states.map((state, key) =>
        (<CaseCard key={key} state={state} title=""></CaseCard>)
      )}
    </Card >
  );
}