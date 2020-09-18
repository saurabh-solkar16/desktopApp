# Load Url In New window or in New Tab

Electron makes Loading url in window easy 
1) to load url in different window simply creted new window with parent child relationship .  w      which makes child window operations do first before parent window.

2) To create tabs structure used library electron-tabs which have unpack size 120kb so with the       amount of features its providing i found is good to use. 


### Disable window switch and always keep window on top
Used native properties of BrowserWindow

{alwaysOnTop:true, kiosk: true}

disabled switch any other window not event Alt+Tab . 


### Print Screen
As per the research I found that the print screen is a built in feature in os.  in which we do not have privilege to manipulate or control it. contributor-reply

Solution
1) We can blur the window for while and after taken screenshot it will display again . but it works when window is focused (applied this).
2) Some of suggestion given is detect print screen activity by user and close the application


still in search of optimum solution for print screen .