# Requirements
1. NodeJS
2. MySQL

# Running
Change the database, user & password <br>
 for windows runWindows.bat <br>
 for linux ./runbash <br>

# html
change the program app.js on line 3 to have the correct url
<pre><code>
var rubbyDuckUrl="http://localhost:3100/api/emails";
</code></pre> 

http://localhost:3100/ <br>
# api
GET http://localhost:3100/api/emails <br>
POST http://localhost:3100/api/emails <br>
send json raw data for example <br>
<pre><code>
{ 
	"email":"alexSilva@gmail.com" 
}
</code></pre> 