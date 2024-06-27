## Штабелеры

<p>
  Для настройки штабелеров в /src необходимо поместить файл с именем stackers-config.json. С подобным содержимым:<br/><br/>
  <code>
      {<br/>
        "stackers": [<br/>
          { "id": "qwe-123-qwe", "number": 5 },<br/>
          { "id": "qwe-124-qwe", "number": 7 }<br/>
        ]
      }
  </code><br/><br/>
  Каждый элемент массива stackers будет отрисован как отдельная страница. В нее будет передан ее id, по которому будут запрашиваться соответствующие данные
</p>

## Переменные окружения

<ol>
<li>BASE URL: REACT_APP_SERVER_URL</li>
<li>Возможность удалять и создавать склады: REACT_APP_HAS_REMOVE_WAREHOUSE_BUTTON. Хранит "TRUE" || "FALSE"</li>
<li>Возможность включить работу приложения на моковых данных (работает частично):REACT_APP_MOCKS. Хранит "TRUE" || "FALSE"</li>
</ol>

## Commands to deploy application

**npm install**<br/>
**npm start**

## Other commands

**npm run format** - parse all ./_ and ./src/_ by prettier
