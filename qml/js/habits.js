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
    var _result = [];
    var _type = null;
    var _completed = null;
    var _method = '/user/tasks'

    function query(errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        var request = new XMLHttpRequest();
        request.open('GET', 'https://habitica.com/api/v2' + _method, true);
        request.setRequestHeader('x-api-user', apiUser);
        request.setRequestHeader('x-api-key', apiKey);
        request.setRequestHeader('Accept-Encoding', 'gzip, deflate')
        request.onreadystatechange = function () {
            try {
                if (XMLHttpRequest.DONE === request.readyState) {
                    switch (request.status) {
                    case 200:
                        _result = JSON.parse(request.responseText);
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

    function habits() {
        _type = 'habit';
        return {
            fetch: fetchTasks
        };
    }

    function dailies() {
        _type = 'daily';
        return {
            notCompleted: notCompleted,
            fetch: fetchTasks
        };
    }

    function todos() {
        _type = 'todo';
        return {
            notCompleted: notCompleted,
            fetch: fetchTasks
        };
    }

    function notCompleted() {
        _completed = false;
        return {
            fetch: fetchTasks
        };
    }

    function fetchTasks(perTaskHandler, errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        query(errorHandler, function(error) {
            if (!error) {
                for (var i = 0; i < _result.length; i++) {
                    var task = _result[i];
                    if (null === _type || _type === task.type) {
                        if (null === _completed || _completed === task.completed) {
                            perTaskHandler(task);
                        }
                    }
                }
            }
            if (null !== endHandler) {
                endHandler(error);
            }
        });
    }

    function user() {
        _method = '/user'
        return {
            fetch: fetchUser
        }
    }

    function fetchUser(successHandler, errorHandler, endHandler) {
        errorHandler = errorHandler || null;
        endHandler = endHandler || null;
        query(errorHandler, function(error) {
            if (!error) {
                successHandler(_user);
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

