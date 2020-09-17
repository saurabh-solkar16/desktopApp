# Load Url In New window or in New Tab

Electron makes Loading url in window easy 

To create tabs structure used library electron-tabs which have unpack size 120kb so with the amount of features its providing i found is good to use. 


### Disable window switch and always keep window on top
Used native properties of BrowserWindow

{alwaysOnTop:true, kiosk: true}

Its not allowing to switch any other window not event Alt+Tab


### Print Screen
As per the research I found that the print screen is a built in feature in os.  in which we do not have privilege to manipulate or control it. contributor-reply

Solution
1) We can blur the window by detecting the keyCode it will work but certainly its not optimum .
2) Some of suggestion given is detect print screen activity by user and close the application
