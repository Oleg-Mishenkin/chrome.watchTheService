# Watch The Service App
Chrome extension with REST Api service to view and manage local or remote windows services

## Technologies
* ReactJS & ES6
* Webpack
* Babel
* .NET Core 2

## Example
![Example](/img/example.png)

## Configure & run Chrome extension
Clone or download this repo. Install gulp globally.

Navigate to an root folder, then run

```
npm install 
```

To build the project, run 

```
gulp
```

Then you can navigate to [chrome://extensions/](chrome://extensions/) and specify the path to the folder WatchTheService\Chrome-extension\build folder.

You can also run 

```
gulp watch
```

to develop with live-reload ability. Note that for eventPage you should manually do reload in [chrome://extensions/](chrome://extensions/) tab.

## Configure & run REST Api as ConsoleApp

You should have VS2017 installed before development.
To create self-contained application (without the need to have .NET Core runtime installd on target machine) you should run

```
dotnet publish -c release -r win10-x64
```

from WatchTheService\Rest-service-windows folder for win10 target machines. 
Then you can run WatchTheService\Rest-service-windows\Rest-Service\bin\Release\netcoreapp2.0\win10-x64\Rest-Service.exe and app will be working on port 5000. 
You can change port in Program.cs file.

## Host app in IIS
Install [.NET Core Windows Server Hosting bundle](https://aka.ms/dotnetcore.2.0.0-windowshosting)
Then see [page](https://docs.microsoft.com/en-us/aspnet/core/publishing/iis) to configure IIS. Then run 

```
dotnet publish -c release -r win10-x64
```
Create app in IIS and navigate to WatchTheService\Rest-service-windows\Rest-Service\bin\Release\netcoreapp2.0\win10-x64\publish folder. 
Set *No managed code* in .NET CLR version dropdows in pool settings for this app.
