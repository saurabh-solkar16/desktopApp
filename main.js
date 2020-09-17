const electron= require('electron');
const path = require('path');
const url = require('url');

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain,globalShortcut } = electron;

let mainWindow;
let addWindow;




app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({alwaysOnTop:true, kiosk: true,setContentProtection:true});

  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
 
  globalShortcut.register('Alt+Tab', function(){
    console.log("shortcut")
    return false;
  })
  globalShortcut.register('printscreen', function(){
    console.log("shortcut")
    setTimeout(1500)
    return false;
  })
  
});
app.on('keydown', function(event) {
  event.preventDefault()
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(key)
  });

// Handle add item window
function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 800,
    height:800, 
    title:'child window',
     show: false ,
     parent: mainWindow
  });


  // 
  addWindow.loadURL("http://google.com/doodles");

  addWindow.once('ready-to-show', () => {
  addWindow.show()
})

  // Handle garbage collection
  addWindow.on('close', function(){
    addWindow = null;
  });
}



// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Add window',
        click(){
          createAddWindow();
        }
      },
      {
        label:'Clear window',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
