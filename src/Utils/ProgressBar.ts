let colors = require('colors');

export class ProgressBar {
    description: string
    nowValue: number
    totalBlock: number
    preBlockLength: number

    constructor(totalBlock: number = 10, description: string = "Render Process: ", initialVal: number = 0) {
        this.description = description;
        this.nowValue = initialVal;
        this.totalBlock = totalBlock;
        this.preBlockLength = 100 / totalBlock
    }

    render(nowValue) {
        const PASSED_BLOCK = "█"
        const EMPTY_BLOCK = "▒"
        const passedBlockCount = Math.floor(nowValue / this.preBlockLength)//获取非空方块个数
        const emptyBlockCount = this.totalBlock - passedBlockCount//获取空方块个数
        let str = this.description
        for (let i = 0; i < passedBlockCount; i++) {
            str += PASSED_BLOCK
        }
        for (let i = 0; i < emptyBlockCount; i++) {
            str += EMPTY_BLOCK
        }
        str += "  " + nowValue.toFixed(2) + "%"
        console.clear()
        // @ts-ignore
        console.log(str.blue)
    }
}