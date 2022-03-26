const electon = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electon;

let mainWindow;

app.on('ready', function(){
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

// Handle create add task window
function createAddTaskWindow(){
    addTaskWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Task'
    });

    addTaskWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addTask.html'),
        protocol: 'file:',
        slashes: true
    }));

    addTaskWindow.on('close', function(){
        addTaskWindow = null;
    });
}


const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add Item',
                click(){
                    createAddTaskWindow();
                }
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }                                                                                                                                                             
        ]
    }
];
