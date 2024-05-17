# CtTraderTest
Для инициализации репозитория

```
 npm i
 npm init playwright@latest
```

В .env необходимо указать актуальный URL, логин и пароль для входа на сайт. 
Исходный код тест-кейса, находится в tests\01_CreateOrder.spec
Часть локаторов и функционала в тесте была отключена, т.к. атрибут 'data-test-id', который активно использовался при работе,
был удален в новой версии сайта.

Для запуска теста используются следующие команды:
```
 npm run start_chrome
 npm run start_mozila
 npm run start_all
 npm run start_all_headed
```

