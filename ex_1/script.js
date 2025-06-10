import {WaterSort} from "./WaterSort.js";
try {
    const colbs = [ [ 1, 1, 2, 2 ], [ 1, 2, 3, 3 ], [ 2, 1, 3, 4 ], [4,4,4,3], [], [] ]
    const game = new WaterSort(colbs);

    console.log('Игра решена?', game.isSolved());
} catch (error) {
    console.error("Ошибка:", error.message);
}