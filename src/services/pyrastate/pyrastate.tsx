import { scorers } from "../scorers/all";


const moves = ["U", "U'", "R", "R'", "L", "L'", "B", "B'"];
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
const table = alphabet.split('').reduce(
    (acc: any, c: string, i: number) => {
        acc[c] = i;
        return acc;
    }, {});

const encode64 = (x: Array<number>) => {
    return x.reduce((acc, n) => acc += alphabet[n], '');
}

const decode64 = (x: string): Array<number> => {
    return x.split('').map(n => table[n]);
}

type state = {
    setup: string,
    fixedEdges: Array<number>,
    fixedCenters: Array<number>,
    slack: number,
    scorer: string,
    filterComputerSolves: boolean,
    filterBadAlgs: boolean,
}

const decoder = (rawState: string): state => {
    const state = decode64(rawState);
    switch (state[0]) {
        case 0:
            return decoderV1(rawState);
    }
    throw new Error('This encoding version is not supported');
}

const encoder = (rawState: state) => {
    return encoderV1(rawState);
}

const decoderV1 = (rawState: string): state => {
    if (rawState.length < 3) {
        throw new Error("Invalid PyraState");
    }

    const state = decode64(rawState);

    const getSetup = () => {
        if (state.length < 5) return '';
        const setup = [moves[state[4] >> 3]];
        let a = '';
        let b = '';

        for (let i = 0; i + 1 < state[5] % 8; i++) {
            a = moves[state[5 + i] % 8];
            b = moves[state[5 + i] >> 3];
            setup.push(a);
            if (a != b) {
                setup.push(b)
            }
        }

        return setup.join(' ');
    };

    console.log(state, {
        fixedEdges: [0, 1, 2, 3, 4, 5].map(x => state[1] & (1 << x) ? 1 : 0),
        fixedCenters: [0, 1, 2, 3].map(x => state[2] & (1 << x) ? 1 : 0),
        slack: (state[2] >> 4) % (2 ** 2),
        scorer: Object.keys(scorers)[state[3] % 2 ** 3],
        setup: getSetup(),
        filterComputerSolves: state[3] & (1 << 3) ? true : false,
        filterBadAlgs: state[3] & (1 << 4) ? true : false,
    })

    return {
        fixedEdges: [0, 1, 2, 3, 4, 5].map(x => state[1] & (1 << x) ? 1 : 0),
        fixedCenters: [0, 1, 2, 3].map(x => state[2] & (1 << x) ? 1 : 0),
        slack: (state[2] >> 4) % (2 ** 2),
        scorer: Object.keys(scorers)[state[3] % 2 ** 3],
        setup: getSetup(),
        filterComputerSolves: state[3] & (1 << 3) ? true : false,
        filterBadAlgs: state[3] & (1 << 4) ? true : false,
    };
}

const encoderV1 = (rawState: state) => {
    const state = [];

    state.push(0);
    state.push(rawState.fixedEdges.reduce((acc, x, i) => acc + (x << i), 0));
    state.push(rawState.fixedCenters.reduce((acc, x, i) => acc + (x << i), 0) + (rawState.slack << 4));
    state.push(Object.keys(scorers).indexOf(rawState.scorer) + (rawState.filterComputerSolves ? 1 << 3 : 0) + (rawState.filterBadAlgs ? 1 << 4 : 0));
    if (rawState.setup && rawState.setup != '') {
        let moveCount = 0;
        let moveBuffer = Math.floor((rawState.setup.split(' ').length) / 2);
        rawState.setup.split(' ').map(move => {
            if (moves.indexOf(move) === -1) return;
            if (moveCount % 2 === 0) {
                state.push(moveBuffer + (moves.indexOf(move) << 3));
            } else {
                moveBuffer = moves.indexOf(move);
            }
            moveCount++;
        });

        if (moveCount % 2 === 0) {
            state.push(moveBuffer + (moveBuffer << 3));
        }
    }

    return encode64(state);
}

const PyraState = {
    encode: encoder,
    decode: decoder,
};

export default PyraState;
