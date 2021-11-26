CREATE TABLE if not exists Жанр (
    КодЖанра SERIAL PRIMARY KEY,
    Наименование VARCHAR (50) NOT NULL DEFAULT 'Наименование жанра' UNIQUE,
    CHECK (КодЖанра > 0)
);

CREATE TABLE if not exists Покупатель (
    КодПокупателя SERIAL PRIMARY KEY,
    Фамилия VARCHAR(50)  DEFAULT 'Фамилия покупателя',
    Имя VARCHAR(20)  DEFAULT 'Имя покупателя',
    Отчество VARCHAR(20) DEFAULT 'Отчество покупателя',
    СерияПаспорта INTEGER NOT NULL,
    НомерПаспорта INTEGER NOT NULL,
    ВремяВыдачиПаспорта DATE NULL,
    КемВыданПаспорт VARCHAR(50) NULL,
    МестоЖительства VARCHAR(50) NULL,
    НомерТелефона INTEGER NULL,
    CHECK (
        КодПокупателя > 0
        AND СерияПаспорта >= 0
        AND СерияПаспорта <= 9999
        AND НомерПаспорта >= 0
        AND НомерПаспорта <= 999999
        AND НомерТелефона >= 0
        AND НомерТелефона <= 999999999999999
    )
);

CREATE TABLE if not exists Фильм (
    КодФильма SERIAL PRIMARY KEY,
    Цена INTEGER DEFAULT 100,
    Описание VARCHAR(250) NULL,
    Год INTEGER NULL,
    Длительность INTEGER NOT NULL,
    Наименование VARCHAR(50) DEFAULT 'Наименование фильма' UNIQUE,
    АктёрскийСостав VARCHAR(250) NULL,
    Страна VARCHAR(20) NULL,
    КодЖанра INTEGER,
    FOREIGN KEY (КодЖанра) REFERENCES Жанр(КодЖанра),
    CHECK (
        КодФильма > 0
        AND Цена >= 0
        AND Цена <= 10000
        AND КодЖанра > 0
    )
);

CREATE TABLE if not exists Сотрудник (
    КодСотрудника SERIAL PRIMARY KEY,
    Фамилия VARCHAR(50) DEFAULT 'Фамилия сотрудника',
    Имя VARCHAR(20) DEFAULT 'Имя сотрудника',
    Отчество VARCHAR(20)  DEFAULT 'Отчество сотрудника',
    Доверенность VARCHAR(50)  DEFAULT 'Доверенность сотрудника',
    Должность VARCHAR(50) DEFAULT 'Должность сотрудника',
    CHECK (КодСотрудника > 0)
);

CREATE TABLE if not exists Заказ (
    КодЗаказа SERIAL PRIMARY KEY,
    Дата DATE DEFAULT NOW(),
    КодСотрудника INTEGER,
    FOREIGN KEY(КодСотрудника) REFERENCES Сотрудник(КодСотрудника),
    КодПокупателя INTEGER,
    FOREIGN KEY(КодПокупателя) REFERENCES Покупатель(КодПокупателя),
    КодФильма INTEGER,
    FOREIGN KEY(КодФильма) REFERENCES Фильм(КодФильма),
    CHECK (
        КодЗаказа >= 0
        AND КодСотрудника >= 0
        AND КодПокупателя >= 0
        AND КодФильма >= 0
    )
);