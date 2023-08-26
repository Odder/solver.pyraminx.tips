import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { scorers, parseAlg } from '../services/scorers/all';
import CardMedia from '@mui/material/CardMedia';
import SolutionsList from './SolutionsList';
import usePyraminxStore from '../stores/usePyraminxStore';
import usePyraSettingsStore from '../stores/usePyraSettingsStore';
import { Typography } from '@mui/material';
import { inverseAlg } from '../services/pyraminxolver/algs';

export default function CaseCard({ state, title }: { state: number, title: string }) {
  const [solutions, setSolutions] = React.useState([] as any[]);
  const px = usePyraminxStore((state) => state.pyraminXolver);
  const {
    slack,
    scorer,
  } = usePyraSettingsStore((state) => state);

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


  React.useEffect(() => {
    const twisty = document.getElementById(`twisty-player-${state}`) as any;
    if (twisty) {
      let callback: any;
      twisty?.experimentalModel?.coarseTimelineInfo.addFreshListener(async (info: any) => {
        if (info.atEnd && !info.atStart && info.playing === false) {
          if (callback) {
            clearTimeout(callback);
          }
          callback = () => {
            twisty.timestamp = 0;
          }
          setTimeout(callback, 700);
        }
      });
    }
  }, [px]);

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'row', width: '100%' }}
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
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        {solutions && solutions[0] && solutions[0][0] &&
          <Typography variant="body2" color="text.secondary">
            Setup: {inverseAlg(solutions[0][0])}
          </Typography>
        }
        <SolutionsList
          solutions={px.search(state, slack).sort((a: any, b: any) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])))}
          state={state}
          displayAlg={displayAlg}
        ></SolutionsList>
      </CardContent>
    </Card >
  );
}