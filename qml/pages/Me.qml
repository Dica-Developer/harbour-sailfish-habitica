
import QtQuick 2.0
import Sailfish.Silica 1.0
import "../js/habits.js" as Habits


Page {
    id: page

    ListModel {
       id: userModel
    }

    SilicaListView {
        id: habitsList
        model: userModel

        anchors.fill: parent

        PullDownMenu {
            MenuItem {
                text: 'Habits'
                onClicked: pageStack.replace(Qt.resolvedUrl('Habits.qml'))
            }
            MenuItem {
                text: 'Dailies'
                onClicked: pageStack.replace(Qt.resolvedUrl('Dailies.qml'))
            }
            MenuItem {
                text: 'Todos'
                onClicked: pageStack.replace(Qt.resolvedUrl('Todos.qml'))
            }
        }

        VerticalScrollDecorator {}

        Component.onCompleted: {
            Habits.query('', '').user().fetch(function (user) {
                userModel.append(user);
            });
        }

        delegate: Item {
            id: userItem

            Label {
                x: Theme.horizontalPageMargin
                id: subjectLabel
                text: subject
                font.pixelSize: Theme.fontSizeMedium
                truncationMode: TruncationMode.Fade
                width: parent.width - 2*Theme.horizontalPageMargin
                maximumLineCount: 1
            }
        }
    }
}
