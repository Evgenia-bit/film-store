class DataTransformer {
    static toLocaleDateString(arrayOfElements, key) {
        arrayOfElements.forEach(element => {
            element[key] = element[key].toLocaleDateString()
        })
        return arrayOfElements
    }
    static getFullnames({lastName, firstName, patronymic}) {
        return lastName + this.getInitials({firstName, patronymic})
    }
    static getInitials({firstName, patronymic}) {
        return firstName[0] + '. ' + patronymic[0] + '. '
    }
}

module.exports = DataTransformer