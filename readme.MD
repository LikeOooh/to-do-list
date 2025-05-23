Интерактивный To-Do List, который позволяет получать с сервера, добавлять и удалять задачи, отмечать их как выполненные, а также ставить напоминания о выполнении задач.

Требования:

HTML-интерфейс включает:

- Поле ввода и кнопка для добавления новых задач;
- Список задач;
- Текст задачи;
- Статус задачи (выполнена/не выполнена);
- Чекбокс управления статусом задачи;
- Кнопка для установки напоминания о выполнении задачи;
- Кнопка удаления задачи из списка;
- Кнопки для фильтрации списка задач (все задачи, выполненные, невыполненые);
- Поле для ввода user-id, по которому нужно осуществить выборку задач.


JavaScript позволяет осуществлять:

- Получение данных с сервера: при загрузке страницы (если локальный список задач пуст) производится запрос к фейковому API для получения готового списка задач;
- Добавление задач: пользователь может добавить новую задачу в список;
- Отметка задач как выполненных: пользователь может отмечать задачи как выполненные или не выполненные (статус задачи виден);
- Удаление задач: пользователь может удалить любую задачу из списка;
- Фильтрация задач: у пользователя есть возможность отображать все задачи, только выполненные или только не выполненные;
- Напоминание: пользователь может поставить напоминание, чтобы не забыть выполнить задачу;
- Сохранение данных между сессиями: все задачи сохраняются в localStorage, чтобы при перезагрузке браузера пользователь видел актуальный список задач.