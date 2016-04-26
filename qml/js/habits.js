/*
 Copyright (C) 2016 Dica-Developer.
 Contact: team@dica-developer.org
 All rights reserved.

 This file is part of sailfish-.

 sailfish-browser-search-engine-manager is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 sailfish-browser-search-engine-manager is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with sailfish-.  If not, see <http://www.gnu.org/licenses/>.
*/

function query(apiUser, apiKey) {
    var _apiUser = apiUser;
    var _apiKey = apiKey;
    var _tasks = [];

    function query(errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        var request = new XMLHttpRequest();
        request.open('GET', 'https://habitica.com/api/v2/user/tasks', true);
        request.setRequestHeader('x-api-user', apiUser);
        request.setRequestHeader('x-api-key', apiKey);
        request.setRequestHeader('Accept-Encoding', 'gzip, deflate')
        request.onreadystatechange = function () {
            try {
                if (XMLHttpRequest.DONE === request.readyState) {
                    switch (request.status) {
                    case 200:
                        _tasks = JSON.parse(request.responseText);
                        if (null !== endHandler) {
                            endHandler(false);
                        }
                        break;
                    case 0:
                        if (null !== errorHandler) {
                            errorHandler(3);
                        }
                        if (null !== endHandler) {
                            endHandler(false);
                        }
                        break;
                    default:
                        if (null !== errorHandler) {
                            errorHandler(1);
                        }
                        if (null !== endHandler) {
                            endHandler(false);
                        }
                    }
                }
            } catch (e) {
                if (null !== errorHandler) {
                    errorHandler(2);
                }
                if (null !== endHandler) {
                    endHandler(false);
                }
            }
        }
        request.send();
    }

    function habits(perHabitHandler, errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        query(errorHandler, function(error) {
            if (!error) {
                for (var i = 0; i < _tasks.length; i++) {
                    var task = _tasks[i];
                    if ('habit' === task.type) {
                        perHabitHandler(task);
                    }
                }
            }
            if (null !== endHandler) {
                endHandler(error);
            }
        });
    }

    function dailies(perDailyHandler, errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        query(errorHandler, function(error) {
            if (!error) {
                for (var i = 0; i < _tasks.length; i++) {
                    var task = _tasks[i];
                    if ('daily' === task.type) {
                        perDailyHandler(task);
                    }
                }
            }
            if (null !== endHandler) {
                endHandler(error);
            }
        });
    }

    function todos(perTodoHandler, errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        query(errorHandler, function(error) {
            if (!error) {
                for (var i = 0; i < _tasks.length; i++) {
                    var task = _tasks[i];
                    if ('todo' === task.type) {
                        perTodoHandler(task);
                    }
                }
            }
            if (null !== endHandler) {
                endHandler(error);
            }
        });
    }

    return {
        dailies: dailies,
        habits: habits,
        todos: todos
    }
}

