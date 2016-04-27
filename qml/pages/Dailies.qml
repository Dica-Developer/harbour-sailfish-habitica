
import QtQuick 2.0
import Sailfish.Silica 1.0
import "../js/habits.js" as Habits


Page {
    id: page

    ListModel {
       id: habitsModel
    }

    SilicaListView {
        id: habitsList
        model: habitsModel

        anchors.fill: parent

        PullDownMenu {
            MenuItem {
                text: 'Me'
                onClicked: pageStack.replace(Qt.resolvedUrl('Me.qml'))
            }
            MenuItem {
                text: 'Habits'
                onClicked: pageStack.replace(Qt.resolvedUrl('Habits.qml'))
            }
            MenuItem {
                text: 'Todos'
                onClicked: pageStack.replace(Qt.resolvedUrl('Todos.qml'))
            }
        }

        VerticalScrollDecorator {}

        Component.onCompleted: {
            Habits.query('', '').dailies().notCompleted().fetch(function (habit) {
                habit.subject = habit.text;
                habit.downdown = habit.down;
                habitsModel.append(habit);
            });
        }

        delegate: ListItem {
            id: habitsItem

            menu: ContextMenu {
                MenuItem {
                    text: qsTr('Edit')
                    onClicked: {
                    }
                }
                MenuItem {
                    text: qsTr('Delete')
                    onClicked: {
                    }
                }
            }
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
