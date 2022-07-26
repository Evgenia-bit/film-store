class ResultBlock {
    constructor(resultBlock) {
        this.resultBlock = resultBlock
    }

    setColor(color) {
        this.resultBlock.style.color = color
    }

    setContent(content) {
        this.resultBlock.innerHTML = content
    }

    setReceiptStatus() {
        this.setColor('black')
        this.setContent('Получение.....')
    }

    setSendingStatus() {
        this.setColor('black')
        this.setContent('Отправка.....')
    }
    setSuccessfulResultStatus(msg) {
        this.setColor('#73F55B')
        this.setContent(msg)
    }
    setErrorStatus(errorMsg) {
        this.setColor('red')
        this.setContent(errorMsg)
    }
}

export {ResultBlock}