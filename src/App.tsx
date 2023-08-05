import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { pyraminxolver } from 'pyraminxolver';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CssBaseline, Grid, ThemeProvider, createTheme } from '@mui/material';
import { scorers, parseAlg } from './scorers/all';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © Oscar Roth Andersen'}
    </Typography>
  );
}

export default function App() {
  const [scramble, setScramble] = React.useState('L R U B');
  const [slack, setSlack] = React.useState(0);
  const [solutions, setSolutions] = React.useState(['']);
  const [scorer, setScorer] = React.useState('homeGripScorer' as string);
  const px = pyraminxolver();

  React.useEffect(() => {
    const solutions = px.searchScramble(scramble.trim().toUpperCase(), slack);
    solutions.sort((a: String, b: String) => scorers[scorer](parseAlg(a[0])) - scorers[scorer](parseAlg(b[0])));
    setSolutions(solutions);
  }, [scramble, slack]);

  React.useEffect(() => {
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    if (solutions[0][0] && solutions[0][0] !== twisty.attributes.alg.value) {
      twisty.alg = solutions[0][0];
    }
  }, [solutions]);

  React.useEffect(() => {
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    if (twisty) {
      let callback: any;
      twisty.experimentalModel.coarseTimelineInfo.addFreshListener(async (info: any) => {
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
  }, []);

  const displayAlg = (alg: string) => {
    const twisty = document.getElementsByTagName('twisty-player')[0] as any;
    twisty.alg = alg;
    twisty.play();
  }

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'dark',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Pyraminx Solver
          </Typography>
          <twisty-player
            style={{ width: "100%" }}
            puzzle="pyraminx"
            alg=""
            hint-facelets="floating"
            experimental-setup-anchor="end"
            control-panel="none"
            background="none"
            camera-latitude-limit="90"
            camera-latitude="80"> </twisty-player>
          <TextField sx={{ width: "100%" }} id="outlined-basic" label="Scramble" variant="outlined" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const twisty = document.getElementsByTagName('twisty-player')[0] as any;
            twisty.alg = solutions[0][0];
            setScramble(event.target.value)
          }}
            inputProps={{ style: { textTransform: "uppercase" } }} />

          <Box>
            <br></br>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={8} md={8}>

                <InputLabel>Slack</InputLabel>
                <Slider
                  aria-label="slack"
                  defaultValue={0}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={4}
                  onChange={(event: Event, value: number | number[]) => setSlack(value as number)}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <InputLabel id="demo-simple-select-filled-label">Scorer</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={scorer}
                  onChange={(event: SelectChangeEvent) => setScorer(event.target.value as string)}
                >
                  <MenuItem value="lengthScorer">Move Count</MenuItem>
                  <MenuItem value="naiveScorer">Weighted Moves</MenuItem>
                  <MenuItem value="homeGripScorer">Home Grip</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <br></br>
          </Box>
          <Paper elevation={2}>
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
          </Paper>
          <Copyright />
        </Box>
      </Container >
    </ThemeProvider >
  );
}
