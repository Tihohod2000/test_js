import {WaterSort} from "./WaterSort.js";
try {
    const game = new WaterSort(5, 4, 3); // 5 колбочек, объем 4, 3 цвета

    console.log('Игра решена?', game.isSolved());
} catch (error) {
    console.error("Ошибка:", error.message);
}