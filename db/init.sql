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
    НомерТелефона NUMERIC NULL,
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

DELETE FROM Заказ;
DELETE FROM Сотрудник;
DELETE FROM Покупатель;
DELETE FROM Фильм;
DELETE FROM Жанр;

INSERT INTO Жанр ( Наименование ) VALUES ('Комедия');
INSERT INTO Жанр ( Наименование ) VALUES ('Ужасы');
INSERT INTO Жанр ( Наименование ) VALUES ('Фэнтези');

INSERT INTO Покупатель ( Фамилия, Имя, Отчество, СерияПаспорта, НомерПаспорта, ВремяВыдачиПаспорта, КемВыданПаспорт, МестоЖительства, НомерТелефона) VALUES ('Алексеева', 'Светлана', 'Михайловна', 3333, 444444, '2001-11-30', 'УМВД', 'г. Владимир', '89028816515');
INSERT INTO Покупатель ( Фамилия, Имя, Отчество, СерияПаспорта, НомерПаспорта, ВремяВыдачиПаспорта, КемВыданПаспорт, МестоЖительства, НомерТелефона) VALUES ('Иванов', 'Петр', 'Петрович', 6666, 777777, '2021-11-02', 'УМВД', 'г. Владимир', '89028883344');

INSERT INTO Фильм ( КодЖанра, Наименование, Цена, Описание, Год, Длительность, АктёрскийСостав, Страна ) VALUES (1, 'Один дома', 110, 'Мальчик-озорник задает жару грабителям. Лучшая комедия для создания праздничного настроения у всей семьи', 1990, 103, 'Маколей Калкин, Джо Пеши, Дэниел Стерн', 'США');
INSERT INTO Фильм ( КодЖанра, Наименование, Цена, Описание, Год, Длительность, АктёрскийСостав, Страна ) VALUES (2, 'Оно', 250, 'Злобный клоун терроризирует подростков. Адаптация романа-хоррора Стивена Кинга о детских страхах', 2017, 135, 'Джейден Мартелл', 'США, Канада');
INSERT INTO Фильм ( КодЖанра, Наименование, Цена, Описание, Год, Длительность, АктёрскийСостав, Страна ) VALUES (3, 'Дюна', 400, 'Атрейдесы прибывают на планету, где им никто не рад. Тимоти Шаламе в фантастическом эпосе Дени Вильнёва', 2021, 155, 'Тимоти Шаламе, Ребекка Фергюсон, Оскар Айзек', 'США, Канада, Венгрия');
INSERT INTO Фильм ( КодЖанра, Наименование, Цена, Описание, Год, Длительность, АктёрскийСостав, Страна ) VALUES (3, 'За пределами Вселенной', 300, 'Роботы с мозгами людей исследуют кротовую нору. Задумчивая фантастика в стилистике документального фильма', 2017, 105, 'Джейн Перри, Найджел Барбер, Ноэлин Комиски', 'Великобритания');

INSERT INTO Сотрудник ( Должность, Фамилия, Имя, Отчество, Доверенность ) VALUES ('Младший менеджер', 'Родионова', 'Наталья', 'Петровна', 'Родионовой Н.П.');
INSERT INTO Сотрудник ( Должность, Фамилия, Имя, Отчество, Доверенность ) VALUES ('Старший менеджер', 'Ульянов', 'Артём', 'Владимирович', 'Ульянову А.В.');
INSERT INTO Сотрудник ( Должность, Фамилия, Имя, Отчество, Доверенность ) VALUES ('Старший менеджер', 'Иванов', 'Петр', 'Михайлович', 'Иванову П.М.');

INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата ) VALUES (1, 2, 2, '2021-12-16');
INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата ) VALUES (1, 1, 1, '2022-01-09');
INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата ) VALUES (2, 3, 1, '2021-12-16');
INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата ) VALUES (3, 3, 2, '2021-12-16');
INSERT INTO Заказ ( КодФильма, КодСотрудника, КодПокупателя, Дата ) VALUES (4, 1, 2, '2021-12-16');
