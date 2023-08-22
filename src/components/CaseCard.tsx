import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { scorers, parseAlg } from '../scorers/all';
import CardMedia from '@mui/material/CardMedia';
import SolutionsList from './SolutionsList';

export default function CaseCard({ state, px, pyra, scorer, slack, title, mask, filterBadAlgs }: { state: number, px: any, pyra: any, scorer: string, slack: number, title: any, mask: string, filterBadAlgs: boolean }) {
  const [solutions, setSolutions] = React.useState([] as any[]);

  React.useEffect(() => {
    if (!px) return;
    const solutions = px.search(state, slack);
    solutions.sort((a: any, b: any) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])));
    setSolutions(solutions as any[]);
  }, [state, slack, scorer]);

  React.useEffect(() => {
    if (!px) return;
    const twisty = document.getElementById(`twisty-player-${state}`) as any;
    if (solutions[0] && solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
      twisty.alg = solutions[0][0];
    }
  }, [solutions]);

  const displayAlg = (alg: string) => {
    const twisty = document.getElementById(`twisty-player-${state}`) as any;
    twisty.alg = alg;
    twisty.timestamp = 0;
    twisty.play();
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'row' }}
    >
      <CardMedia
        component="twisty-player"
        sx={{ width: 50 }}
        style={{ width: "150px" }}
        puzzle="pyraminx"
        alg=""
        hint-facelets="floating"
        experimental-setup-anchor="end"
        control-panel="none"
        background="none"
        camera-latitude-limit="90"
        camera-latitude="80"
        id={`twisty-player-${state}`}
      // experimental-stickering-mask-orbits={mask}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <SolutionsList
          solutions={px.search(state, slack).sort((a: any, b: any) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])))}
          scorer={scorer}
          state={state}
          pyra={pyra}
          displayAlg={displayAlg}
          filterBadAlgs={filterBadAlgs}
        ></SolutionsList>
      </CardContent>
    </Card>
  );
}