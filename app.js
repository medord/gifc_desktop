const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')

const rosettaPath = 'https://api.go1.co/integration-li/launch/15327858/rosettastone?enrolmentId=50126473&jwt=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnbzEuYWNjZXNzIiwidmVyIjoidjEuMCIsImV4cCI6MTYzNzYxNjUxMiwic2lkIjoiYWEyYTk1MTM4YTU3M2M0YmQzMmQxNjcwNGI2MGM5MjZhM2ZmODg3Mjg3MWVlNWE0NTY0ZmMxNDBiMmUzYjAzZTc5M2FhNmQ5NmU2ZjZjNTQxYTc5NTkxZWZhN2Y0YWJmZjNlM2RkOTE0ZWFmOGEzMDkxMzc2OTFlOGNjZWM3NzciLCJvYmplY3QiOnsidHlwZSI6InVzZXIiLCJjb250ZW50Ijp7ImlkIjo4NDgwNTI0LCJpbnN0YW5jZSI6ImFjY291bnRzLmdvY2F0YWx5emUuY29tIiwicHJvZmlsZV9pZCI6ODQ4MDUyNCwibmFtZSI6Ikluc3RpdHV0IEdpZmMiLCJyb2xlcyI6W10sIm1haWwiOiIxQGdpZmMubXlnbzEuY29tIiwiYWNjb3VudHMiOlt7ImlkIjo4NDgwNTI1LCJpbnN0YW5jZSI6ImdpZmMubXlnbzEuY29tIiwicHJvZmlsZV9pZCI6ODQ4MDUyNSwibmFtZSI6Ikluc3RpdHV0IEdpZmMiLCJyb2xlcyI6WyJTdHVkZW50Il0sInBvcnRhbF9pZCI6MzYxNzIyNzR9XX19LCJ1c2VkQ3JlZHMiOjAsImlhdCI6MTYzNzAxMTcxMn0.RCsA_3TU-RJne-x1QQdfUnXS4k1DOXy7DccZM9_l-0Au_fWySDV-05W9OPWeLHE40rSxgPnUu4eL_OFvgLyhZ1i-XwuK0LyIDiAxUjhddR8DP4lgVLmFAsY6S1vEEYBwBy5cvR_QneYZ0vQStgemQNzG2a8wuFUTx-ywA7bM6G7p0uKIFnYit8aUh2uYOjnqPH9fP4nr_9IQ3S52phJra9P4VYW45LrrV5ppYZHj2Hawbkcq1748074EFSDlzeqn9YFZ9rFVAUKPo7pi54cZ2q-8PfnGuUwOOB4uAr-ksCu-ibtxKdRI8qJKJ7rG34tpj99EoZg5ROZ-u5zVVcnIdg'

app.once('ready', async () => {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "GIFC | GERMAN TO GO",
    icon: __dirname + '/gifc.png',
    movable: false,
    fullscreen: true,
    alwaysOnTop: true,
    minimizable: false,
    webPreferences: {
      // devTools: false,
      webviewTag: true,
      preload: true,
      menubar: false,
      nodeIntegration: true
    }
  })

  const session = mainWindow.webContents.session

  await session.clearStorageData();
  await session.clearCache();
  await session.flushStorageData();

  mainWindow.setMenu(null);
  mainWindow.loadURL(rosettaPath)
  mainWindow.webContents.on('did-finish-load', () => {
    let code = `var lunchButton = document.getElementsByClassName("disable_double_click")[0];
    lunchButton.click()`;
    mainWindow.webContents.executeJavaScript(code);
  });

})