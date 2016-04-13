# NOTICE:
#
# Application name defined in TARGET has a corresponding QML filename.
# If name defined in TARGET is changed, the following needs to be done
# to match new name:
#   - corresponding QML filename must be changed
#   - desktop icon filename must be changed
#   - desktop filename must be changed
#   - icon definition filename in desktop file must be changed
#   - translation filenames have to be changed

# The name of your application
TARGET = harbour-sailfish-habitica

CONFIG += sailfishapp

SOURCES += src/harbour-sailfish-habitica.cpp

OTHER_FILES += qml/rbour-sailfish-habitica.qml \
    qml/cover/CoverPage.qml \
    rpm/harbour-sailfish-habitica.changes.in \
    rpm/harbour-sailfish-habitica.spec \
    rpm/harbour-sailfish-habitica.yaml \
    translations/*.ts

SAILFISHAPP_ICONS = 86x86 108x108 128x128 256x256

# to disable building translations every time, comment out the
# following CONFIG line
CONFIG += sailfishapp_i18n

# German translation is enabled as an example. If you aren't
# planning to localize your app, remember to comment out the
# following TRANSLATIONS line. And also do not forget to
# modify the localized app name in the the .desktop file.
TRANSLATIONS += translations/harbour-sailfish-habitica-de.ts

DISTFILES += \
    qml/pages/Habits.qml \
    qml/pages/Dailies.qml \
    qml/pages/Todos.qml \
    qml/js/habits.js \
    harbour-sailfish-habitica.desktop

