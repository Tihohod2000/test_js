class WaterSort {
    constructor(numColbs, volume, numColors) {
        this.numColbs = numColbs;
        this.volume = volume;
        this.numColors = numColors;
        this.emptyColbs = numColbs - numColors;
        this.colbs = [];

        this.validateInput();
        this.startGame();

    }


    validateInput() {
        if (this.numColbs < this.numColors) {
            throw new Error("Количество различных жидкостей должно быть меньше," + " чем число колбочек!");
        }
        if (this.volume <= 0) {
            throw new Error("Объем колбочек должен быть положительным!");
        }
    }


    startGame() {
        for (let i = 0; i < this.numColors; i++) {
            this.colbs.push(new Array(this.volume).fill(i + 1));
        }


        for (let i = 0; i < this.emptyColbs; i++) {
            this.colbs.push([]);
        }

        this.mixingLiquids();
        this.calculateMoves();
    }

    mixingLiquids() {
        const nonEmptyColbs = this.colbs.filter(colb => colb.length > 0);

        for (let numColb1 = 0, numColb2 = 1; (numColb1 < nonEmptyColbs.length - 1) && (numColb2 < nonEmptyColbs.length); numColb1++, numColb2++) {

            for (let i = nonEmptyColbs[numColb1].length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [nonEmptyColbs[numColb1][i], nonEmptyColbs[numColb2][j]] = [nonEmptyColbs[numColb2][j], nonEmptyColbs[numColb1][i]];
                // console.log(nonEmptyColbs);
            }
        }
    }


    calculateMoves() {
        while (!this.isSolved()) {
            for (let i = 0; i < this.colbs.length; i++) {
                let firstColor = this.colbs[i][this.colbs[i].length - 1];
                if ((this.colbs[i].every(color => color === firstColor) && (this.colbs[i].length < this.volume)) || this.colbs[i].length === 0) {
                    for (let j = 0; j < this.colbs.length; j++) {
                        if (i === j) continue;

                        while (this.canPour(j, i)) {
                            this.colbs[i].push(...this.colbs[j].splice(this.colbs[j].length - 1, 1));
                            console.log(`(${j}, ${i})`);
                        }
                    }
                }
            }
        }
        console.log("Конец")
    }

    isSolved() {
        return this.colbs.every(colb => {
            if (colb.length === 0) return true;

            const firstColor = colb[0];
            return colb.every(color => color === firstColor) && colb.length === this.volume;
        })
    }


    canPour(from, to) {
        const fromColb = this.colbs[from];
        const toColb = this.colbs[to];

        if (fromColb.length === 0) return false;
        if (toColb.length >= this.volume) return false;

        const topColor = fromColb[fromColb.length - 1];
        if (toColb.length === 0) return true;
        if (toColb[toColb.length - 1] === topColor) return true;

        return false;
    }


}// Пример использования
try {
    const game = new WaterSort(5, 4, 3); // 5 колбочек, объем 4, 3 цвета

    console.log('Игра решена?', game.isSolved());
} catch (error) {
    console.error("Ошибка:", error.message);
}