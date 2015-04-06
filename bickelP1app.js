// Module dependencies                                                                                                                            

var express    = require('express'),
    mysql      = require('mysql');

// Application initialization                                                                                                                     

var connection = mysql.createConnection({
    host     : 'cwolf.cs.sonoma.edu',
    user     : 'bbickel',
    password : '3942086'
});

var app = module.exports = express.createServer();

// Database setup                                                                                                                                 

connection.query('USE bbickel', function (err) {
    if (err) throw err;
});

// Configuration                                                                                                                                  

app.use(express.bodyParser());

// Main page with two links to view the table and drop down menu                                                                                  

var htmlHeader = '<html><head><title>League of Legends Database</title></head><body>';
var htmlFooter = '</body></html>';

function handleError(res, error) {
    console.log(error);
    res.send(error.toString());
}

function buildUserViewAccount(result) {

    // Build the HTML table from the data in the Account table                                                                                    
    var responseHTML = htmlHeader + '<h1>Account Information</h1>';

    //Dynamic populating rows from the records returned                                                                                           
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Email: ' + result[i].Email + '</li>' +
            '<li>Username: ' + result[i].Username + '</li>' +
            '<li>Player tag: ' + result[i].Player_tag + '</li></ul>'
    }
    responseHTML += htmlFooter;

    return responseHTML;
}

function buildUserViewChampion(result) {

    // Build the HTML table from the data in the Champion table                                                                                   
    var responseHTML = htmlHeader + '<h1>Champion Information</h1>';

    //Dynamic populating rows from the records returned                                                                                           
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Name: ' + result[i].Name + '</li>' +
            '<li>Cost RP: ' + result[i].Cost_RP + '</li>' +
            '<li>Cost IP: ' + result[i].Cost_IP + '</li></ul>'
    }
    responseHTML += htmlFooter;

    return responseHTML;
}

function buildUserViewSkins(result) {

    // Build the HTML table from the data in the Account table                                                                                    
    var responseHTML = htmlHeader + '<h1>Skin Information</h1>';

    //Dynamic populating rows from the records returned                                                                                           
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Champ name: ' + result[i].Champ_name + '</li>' +
            '<li>Skin name: ' + result[i].Skin_name + '</li>' +
            '<li>Cost: ' + result[i].Cost + '</li></ul>'
    }
    responseHTML += htmlFooter;

    return responseHTML;
}

function buildUserViewGames(result) {

    // Build the HTML table from the data in the Account table                                                                                    
    var responseHTML = htmlHeader + '<h1>Game Information</h1>';

    //Dynamic populating rows from the records returned                                                                                           
    for (var i=0; i < result.length; i++) {
        responseHTML += '<ul><li>Champ name: ' + result[i].Champ_name + '</li>' +
            '<li>Player tag: ' + result[i].Player_tag + '</li>' +
            '<li>Kills: ' + result[i].Kills + '</li>' +
            '<li>Deaths: ' + result[i].Deaths + '</li>' +
            '<li>Assists: ' + result[i].Assists + '</li>' +
            '<li>Win: ' + result[i].Win + '</li>' +
            '<li>Loss: ' + result[i].Loss + '</li>' +
            '<li>Creep score: ' + result[i].Creep_score + '</li></ul>'
    }
    responseHTML += htmlFooter;

    return responseHTML;
}

app.get('/', function(req, res) {
    req.query.name
    res.send('<html><head><title>Project 1</title></head><body>' +
             '<a href="/account/add">Add an Account</a><br />' +
             '<a href="/account/view/table">View Account HTML Table</a>' +
             '<br />' +
             '<a href="/account/view/dropdown">View Account Drop Down Menu</a>' +
             '<br />' +
             '<a href="/champion/add">Add a Champion</a><br />' +
             '<a href="/champion/view/table">View Champion HTML Table</a>' +
             '<br />' +
             '<a href="/champion/view/dropdown">View Champion Drop Down Menu</a>' +
             '<br />' +
             '<a href="/skin/add">Add a Skin</a><br />' +
             '<a href="/skin/view/table">View Skin HTML Table</a>' +
             '<br />' +
             '<a href="/game/add">Add a Game</a><br />' +
             '<a href="/game/view/table">View Game HTML Table</a>' +
             '<br />' +
             '<a href="/skin/join">Find skins given player tag</a>' +
             '<br />' +
             '</body></html>'
    );
});

// HTML Example with data populated from the Student table                                                                                        

app.get('/account/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Account';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Student table                                                                        
                var responseHTML = '<h1>Table Example</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Account ID</th>' +
                    '<th>Player Tag</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Account_ID + '</td>' +
                        '<td>' + result[i].Player_tag + '</td>' +
                        '<td><a href="/account/?Account_ID=' + result[i].Account_ID + '\                                                          
">more info</a>' +
                        '<td><a href="/account/edit?Account_ID=' + result[i].Account_ID
 + '">edit</a>' +
                        '<td><a href="/account/delete?Account_ID=' + result[i].Account_ID + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Example with data populated from the Champion table                                                                                       

app.get('/champion/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Champion';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Champion table                                                                       
                var responseHTML = '<h1>Table Example</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Champion ID</th>' +
                    '<th>Name</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Champion_ID + '</td>' +
                        '<td>' + result[i].Name + '</td>' +
                        '<td><a href="/champion/?Champion_ID=' + result[i].Champion_ID + '\                                                       
">more info</a>' +
                        '<td><a href="/champion/edit?Champion_ID=' + result[i].Champion_ID
 + '">edit</a>' +
                        '<td><a href="/champion/delete?Champion_ID=' + result[i].Champion_ID + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// HTML Example with data populated from the Skins table                                                                                          

app.get('/skin/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Skins';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Champion table                                                                       
                var responseHTML = '<h1>Table Example</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Skin ID</th>' +
                    '<th>Skin name</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Skin_ID + '</td>' +
                        '<td>' + result[i].Skin_name + '</td>' +
                        '<td><a href="/skin/?Skin_ID=' + result[i].Skin_ID + '\                                                                   
">more info</a>' +
                        '<td><a href="/skin/edit?Skin_ID=' + result[i].Skin_ID
 + '">edit</a>' +
                        '<td><a href="/skin/delete?Skin_ID=' + result[i].Skin_ID + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
	}
    );
});

// HTML Example with data populated from the Games table                                                                                          

app.get('/game/view/table', function (req, res) {

    var myQry = 'SELECT * FROM Games';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Champion table                                                                       
                var responseHTML = '<h1>Table Example</h1>';
                responseHTML += '<table border=1>' +
                    '<tr><th>Game ID</th>' +
                    '<th>Player tag</th>' +
                    '<th>Champ Name</th>' +
                    '<th><!-- More Info Column --></th>' +
                    '<th><!-- Edit Info Column --></th>' +
                    '<th><!-- Delete Column --></th>' +
                    '</tr>';
                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Game_ID + '</td>' +
                        '<td>' + result[i].Player_tag + '</td>' +
                        '<td>' + result[i].Champ_name + '</td>' +
                        '<td><a href="/game/?Game_ID=' + result[i].Game_ID + '\                                                                   
">more info</a>' +
                        '<td><a href="/game/edit?Game_ID=' + result[i].Game_ID
 + '">edit</a>' +
                        '<td><a href="/game/delete?Game_ID=' + result[i].Game_ID + '">delete</a>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// Example of an HTML drop down menu with data from the Account table                                                                             

app.get('/account/view/dropdown', function (req, res) {

    var myQry = 'SELECT * FROM Account';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Account table                                                                        
                var responseHTML = '<h1>Drop Down Menu Example</h1>';
                responseHTML += '<form method="GET" action="/account/">';
                responseHTML += 'Select an Account: <select name="Account_ID" id="Account_ID">';

                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<option value="' + result[i].Account_ID + '">' + result[i].Player_tag + '</option>';
                }

                responseHTML += '</select>';
                responseHTML += '&nbsp;<input type="submit" />';
                responseHTML += '</form>';
                res.send(responseHTML);
            }
	}
    );
});

// Example of an HTML drop down menu with data from the Champion table                                                                            

app.get('/champion/view/dropdown', function (req, res) {

    var myQry = 'SELECT * FROM Champion';

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                // Build the HTML table from the data in the Champion table                                                                       
                var responseHTML = '<h1>Drop Down Menu Example</h1>';
                responseHTML += '<form method="GET" action="/champion/">';
                responseHTML += 'Select a Champion: <select name="Champion_ID" id="Champion_ID">';

                //Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<option value="' + result[i].Champion_ID + '">' + result[i].Name + '</option>';
                }

                responseHTML += '</select>';
                responseHTML += '&nbsp;<input type="submit" />';
                responseHTML += '</form>';
                res.send(responseHTML);
            }
        }
    );
});

// Display information about an account when given their Player_ID                                                                                
app.get('/account/', function (req, res) {

    var myQry = 'SELECT * FROM Account WHERE Account_ID=' + req.query.Account_ID

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewAccount(result));
            }
        }
    );
});

// Display information about an account when given their Champion_ID                                                                              
app.get('/champion/', function (req, res) {

    var myQry = 'SELECT * FROM Champion WHERE Champion_ID=' + req.query.Champion_ID

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewChampion(result));
            }
        }
    );
});

// Display information about a skin when given their Skin_ID                                                                                      
app.get('/skin/', function (req, res) {

    var myQry = 'SELECT * FROM Skins WHERE Skin_ID=' + req.query.Skin_ID

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewSkins(result));
            }
        }
    );
});

// Display information about a game when given their Game_ID                                                                                      
app.get('/game/', function (req, res) {

    var myQry = 'SELECT * FROM Games WHERE Game_ID=' + req.query.Game_ID

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send(buildUserViewGames(result));
            }
        }
    );
});

// Display a form that allows user to enter Accounts                                                                                              
app.get('/account/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert an Account</h1>' +
        '<form action="/account/insert" method="GET">' +
	'<input type="hidden" name="Account_ID" id="Account_ID" />' +
        '<label for="Player_tag">Player tag</label> <input type="text" name="Player_tag" id="Player_tag" /><br />' +
	'<label for="Email">Email</label> <input type="text" name="Email" id="Email" /><br />' +
        '<label for="Username">Username</label> <input type="text" name="Username" id="Username"><br />' +
	'<label for="Password">Password</label> <input type="text" name="Password" id="Password"><br />' +

        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter Champions                                                                                             
app.get('/champion/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a Champion</h1>' +
	'<form action="/champion/insert" method="GET">' +
        '<input type="hidden" name="Champion_ID" id="Champion_ID" />' +
	'<label for="Name">Name</label> <input type="text" name="Name" id="Name" /><br />' +
        '<label for="Cost_RP">Cost RP</label> <input type="text" name="Cost_RP" id="Cost_RP" /><br />' +
	'<label for="Cost_IP">Cost IP</label> <input type="text" name="Cost_IP" id="Cost_IP"><br />' +

        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter Skins                                                                                                 
app.get('/skin/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a Skin</h1>' +
        '<form action="/skin/insert" method="GET">' +
        '<input type="hidden" name="Skin_ID" id="Skin_ID" />' +
        '<label for="Champ_name">Champion name</label> <input type="text" name="Champ_name" id="Champ_name" /><br />' +
        '<label for="Skin_name">Skin name</label> <input type="text" name="Skin_name" id="Skin_name" /><br />' +
        '<label for="Cost">Cost</label> <input type="text" name="Cost" id="Cost"><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to enter Games                                                                                                 
app.get('/game/add', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Insert a Game</h1>' +
        '<form action="/game/insert" method="GET">' +
        '<input type="hidden" name="Game_ID" id="Game_ID" />' +
        '<label for="Player_tag">Player tag</label> <input type="text" name="Player_tag" id="Player_tag" /><br />' +
        '<label for="Champ_name">Champion name</label> <input type="text" name="Champ_name" id="Champ_name" /><br />' +
        '<label for="Kills">Kills</label> <input type="text" name="Kills" id="Kills"><br />' +
        '<label for="Deaths">Deaths</label> <input type="text" name="Deaths" id="Deaths"><br />' +
        '<label for="Assists">Assists</label> <input type="text" name="Assists" id="Assists"><br />' +
        '<label for="Win">Win</label> <input type="text" name="Win" id="Win"><br />' +
        '<label for="Loss">Loss</label> <input type="text" name="Loss" id="Loss"><br />' +
        '<label for="Creep_score">Creep score</label> <input type="text" name="Creep_score" id="Creep_score"><br />' +

        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// Display a form that allows user to find Skins given a player tag                                                                               
app.get('/skin/join', function(req, res){

    var responseHTML = htmlHeader;

    responseHTML += '<h1>Select a Player</h1>' +
        '<form action="/skin/join/table" method="GET">' +
	'<label for="Player_tag">Player tag</label> <input type="text" name="Player_tag" id="Player_tag"><br />' +
        '<input type="submit" />' +
        '</form>';

    responseHTML += htmlFooter;
    res.send(responseHTML);
});

// HTML Example with data populated from the Student table                                                                                        

app.get('/skin/join/table', function (req, res) {

    var myQry = 'SELECT Skin_name FROM Skins s JOIN Games g ON s.Champ_name=g.Champ_name WHERE Player_tag =\'' + req.query.Player_tag + '\'';

    console.log(myQry);

    connection.query(myQry,
	function (err, result) {
            if (err) {
	        handleError(res, err);
            }
	    else {
                // Build the HTML table from the data in the Student table                                                                        
	        var responseHTML = '<h1>Table Example</h1>';
		responseHTML += '<table border=1>' +
                    '<th>Skin name</th>' +
                    '</tr>';
		//Dynamic populating rows from the records returned                                                                               
                for (var i=0; i < result.length; i++) {
                    responseHTML += '<tr><td>' + result[i].Skin_name + '</td>' +
                        '</tr>'
                }

                responseHTML += '</table>';
                res.send(responseHTML);
            }
        }
    );
});

// Display a form that allows user to enter Accounts                                                                                              
app.get('/account/insert', function(req, res){

    var myQry = 'INSERT INTO Account (Username, Password, Player_tag, Email) VALUES (' +
        '\'' + req.query.Username + '\', ' +
        '\'' + req.query.Password + '\', ' +
        '\'' + req.query.Player_tag + '\', ' +
        '\'' + req.query.Email + '\'' +
        ')';

    console.log(myQry);

    console.log('SELECT * FROM Account WHERE Username=\'' +  req.query.Username + '\'')

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Account WHERE Username = \'' + req.query.Username + '\'',
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserViewAccount(result));
                        }
                        else {
                            res.send('No account found for that username.');
                        }
                    });
            }
	}
    );
});

// Display a form that allows user to enter Champions                                                                                             
app.get('/champion/insert', function(req, res){

    var myQry = 'INSERT INTO Champion (Name, Cost_RP, Cost_IP) VALUES (' +
	'\'' + req.query.Name + '\', ' +
        '' + req.query.Cost_RP + ', ' +
        '' + req.query.Cost_IP + ')';

    console.log(myQry);

    console.log('SELECT * FROM Champion WHERE Name=\'' +  req.query.Name + '\'')

    connection.query(myQry,
	function (err, result) {
            if (err) {
	        handleError(res, err);
            }
	    else {
                connection.query('SELECT * FROM Champion WHERE Name = \'' + req.query.Name + '\'',
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserViewChampion(result));
                        }
                        else {
	                    res.send('No champion found for that Name.');
		        }
                    });
            }
	}
    );
});

// Display a form that allows user to enter Skins                                                                                                 
app.get('/skin/insert', function(req, res){

    var myQry = 'INSERT INTO Skins (Champ_name, Skin_name, Cost) VALUES (' +
        '\'' + req.query.Champ_name + '\', ' +
        '\'' + req.query.Skin_name + '\', ' +
        '' + req.query.Cost + '' +
        ')';

    console.log(myQry);

    console.log('SELECT * FROM Skins WHERE Skin_name=\'' +  req.query.Skin_name + '\'')

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Skins WHERE Skin_name = \'' + req.query.Skin_name + '\'',
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserViewSkins(result));
                        }
                        else {
                            res.send('No skin found for that skin name.');
                        }
                    });
            }
        }
    );
});

// Display a form that allows user to enter Games                                                                                                 
app.get('/game/insert', function(req, res){

    var myQry = 'INSERT INTO Games (Champ_name, Player_tag, Kills, Deaths, Assists, Win, Loss, Creep_score) VALUES (' +
        '\'' + req.query.Champ_name + '\', ' +
        '\'' + req.query.Player_tag + '\', ' +
	'' + req.query.Kills + ', ' +
        '' + req.query.Deaths + ', ' +
        '' + req.query.Assists + ', ' +
	'' + req.query.Win + ', ' +
        '' + req.query.Loss + ', ' +
        '' + req.query.Creep_score + '' +
	')';

    console.log(myQry);

    connection.query(myQry,
	function (err, result) {
            if (err) {
	        handleError(res, err);
            }
	    else {
                connection.query('SELECT * FROM Games WHERE Game_ID =' + result.insertId ,
                    function (err, result) {
                        if (err) {
                            handleError(res, err);
                        }
                        else if(result.length == 1) {
                            res.send(buildUserViewGames(result));
                        }
                        else {
                            res.send('No game found for that Game_ID.');
                        }
                    });
            }
        }
    );
});

// Display information about a Account when given their Accout_ID and allow them to edit it.                                                      
app.get('/account/edit', function (req, res) {

    var myQry = 'SELECT * FROM Account WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table                                                                        
		var responseHTML = htmlHeader + '<h1>Edit Account Information</h1>';

		responseHTML += '<form action="/account/update" method="GET">';

		//Dynamic populating rows from the records returned                                                                               
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                          
                    //will appear in the input field                                                                                              
                    var location = (result[0].Email == null) ? '' : result[0].Email;
                    responseHTML += 'Username: <input type="text" name="Username" id="Username" value="' + result[0].Username + '" /><br />' +
                        'Password: <input type="text" name="Password" id="Password" value="' + result[0].Password + '" /><br />' +
                        'Email: <br /><textarea name="Email" id="Email">' + result[0].Email + '</textarea><br />' +
                        '<input type="hidden" name="Account_ID" id="Account_ID" value="' + result[0].Account_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a Champion when given their Champion_ID and allow them to edit it.                                                   
app.get('/champion/edit', function (req, res) {

    var myQry = 'SELECT * FROM Champion WHERE Champion_ID=' + req.query.Champion_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table                                                                        
                var responseHTML = htmlHeader + '<h1>Edit Champion Information</h1>';

                responseHTML += '<form action="/champion/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                               
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                          
                    //will appear in the input field                                                                                              
                    var location = (result[0].Champ_name == null) ? '' : result[0].Champ_name;
                    responseHTML += 'Cost IP: <input type="text" name="Cost_IP" id="Cost_IP" value="' + result[0].Cost_IP + '" /><br />' +
                        'Cost RP: <br /><textarea name="Cost_RP" id="Cost_RP">' + result[0].Cost_RP + '</textarea><br />' +
                        '<input type="hidden" name="Champion_ID" id="Champion_ID" value="' + result[0].Champion_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a Skin when given their Skin_ID and allow them to edit it.                                                           
app.get('/skin/edit', function (req, res) {

    var myQry = 'SELECT * FROM Skins WHERE Skin_ID=' + req.query.Skin_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table                                                                        
                var responseHTML = htmlHeader + '<h1>Edit Skin Information</h1>';

                responseHTML += '<form action="/skin/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                               
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                          
                    //will appear in the input field                                                                                              
                    var location = (result[0].Champ_name == null) ? '' : result[0].Champ_name;
                    responseHTML += 'Champ name: <input type="text" name="Champ_name" id="Champ_name" value="' + result[0].Champ_name + '" /><br 
/>' +
                        'Skin_name: <input type="text" name="Skin_name" id="Skin_name" value="' + result[0].Skin_name + '" /><br />' +
                        'Cost: <br /><textarea name="Cost" id="Cost">' + result[0].Cost + '</textarea><br />' +
                        '<input type="hidden" name="Skin_ID" id="Skin_ID" value="' + result[0].Skin_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
                }
            }
        }
    );
});

// Display information about a Game when given their Game_ID and allow them to edit it.                                                           
app.get('/game/edit', function (req, res) {

    var myQry = 'SELECT * FROM Games WHERE Game_ID=' + req.query.Game_ID;

    console.log(myQry);

    connection.query(myQry, function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {

                // Build the HTML table from the data in the Student table                                                                        
                var responseHTML = htmlHeader + '<h1>Edit Game Information</h1>';

                responseHTML += '<form action="/game/update" method="GET">';

                //Dynamic populating rows from the records returned                                                                               
                if (result.length == 1) {

                    //using an inline or ternary if to replace null with an empty string, otherwise null                                          
                    //will appear in the input field                                                                                              
                    var location = (result[0].Player_tag == null) ? '' : result[0].Player_tag;
                    responseHTML += 'Champ name: <input type="text" name="Champ_name" id="Champ_name" value="' + result[0].Champ_name + '" /><br 
/>' +
                        'Player tag: <input type="text" name="Player_tag" id="Player_tag" value="' + result[0].Player_tag + '" /><br />' +
                        'Kills: <input type="text" name="Kills" id="Kills" value="' + result[0].Kills + '" /><br />' +
                        'Deaths: <input type="text" name="Deaths" id="Deaths" value="' + result[0].Deaths + '" /><br />' +
                        'Assists: <input type="text" name="Assists" id="Assists" value="' + result[0].Assists + '" /><br />' +
                        'Win: <input type="text" name="Win" id="Win" value="' + result[0].Win + '" /><br />' +
                        'Loss: <input type="text" name="Loss" id="Loss" value="' + result[0].Loss + '" /><br />' +
                        'Creep score: <br /><textarea name="Creep_score" id="Creep_score">' + result[0].Creep_score + '</textarea><br />' +
                        '<input type="hidden" name="Game_ID" id="Game_ID" value="' + result[0].Game_ID + '" />' +
                        '<input type="submit" />' +
                        '</form>' +
                        htmlFooter;

                    res.send(responseHTML);
                }
                else {
                    res.send('More than one record was returned.')
		}
            }
	}
    );
});

// Update an account's username and email given their Account ID                                                                                  
app.get('/account/update', function (req, res) {

    var myQry = 'UPDATE Account SET Username="' + req.query.Username + '", Password="' + req.query.Password + '", Email="' + req.query.Email + '"
 WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Account WHERE Account_ID = ' + req.query.Account_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserViewAccount(result));
                        }
                        else {
                            res.send('No account found for that Account ID.');
                        }
                    });
            }
        }
    );
});

// Update a champion's username and email given their Champion ID                                                                                 
app.get('/champion/update', function (req, res) {

    var myQry = 'UPDATE Champion SET Cost_RP=' + req.query.Cost_RP + ', Cost_IP=' + req.query.Cost_IP + ' WHERE Champion_ID=' + req.query.Champio\
n_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Champion WHERE Champion_ID = ' + req.query.Champion_ID,
                    function (err, result) {
			if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserViewChampion(result));
                        }
                        else {
                            res.send('No champion found for that Champion ID.');
                        }
                    });
            }
        }
    );
});

// Update a skin's username and email given their Skin ID                                                                                         
app.get('/skin/update', function (req, res) {

    var myQry = 'UPDATE Skins SET Champ_name="' + req.query.Champ_name + '", Skin_name="' + req.query.Skin_name + '", Cost=' + req.query.Cost + '\
 WHERE Skin_ID=' + req.query.Skin_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Skins WHERE Skin_ID = ' + req.query.Skin_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserViewSkins(result));
                        }
                        else {
                            res.send('No skin found for that Skin ID.');
                        }
                    });
            }
        }
    );
});

// Update a game's username and email given their Game ID                                                                                         
app.get('/game/update', function (req, res) {

    var myQry = 'UPDATE Games SET Champ_name="' + req.query.Champ_name + '", Player_tag="' + req.query.Player_tag + '", Kills="' +
        req.query.Kills + '", Deaths=' + req.query.Deaths + ', Assists=' + req.query.Assists + ', Win=' + req.query.Win +
        ', Loss=' + req.query.Loss + ', Creep_score=' + req.query.Creep_score + ' WHERE Game_ID=' + req.query.Game_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                connection.query('SELECT * FROM Games WHERE Game_ID = ' + req.query.Game_ID,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            res.send('An error occurred');
                        }
                        if(result.length == 1) {
                            res.send(buildUserViewGames(result));
                        }
                        else {
                            res.send('No game found for that Game ID.');
                        }
                    });
            }
        }
    );
});

// Route for deleting an account record from the database.                                                                                        
app.get('/account/delete', function (req, res) {

    var myQry = 'DELETE FROM Account WHERE Account_ID=' + req.query.Account_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Account ID ' + req.query.Account_ID + ' successfully deleted.\                                                          
');
            }
        }
    );
});

// Route for deleting a champion record from the database.                                                                                        
app.get('/champion/delete', function (req, res) {

    var myQry = 'DELETE FROM Champion WHERE Champion_ID=' + req.query.Champion_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Champion ID ' + req.query.Champion_ID + ' successfully deleted.\                                                        
');
            }
        }
    );
});

// Route for deleting a skin record from the database.                                                                                            
app.get('/skin/delete', function (req, res) {

    var myQry = 'DELETE FROM Skins WHERE Skin_ID=' + req.query.Skin_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Skin ID ' + req.query.Skin_ID + ' successfully deleted.\                                                                
');
            }
        }
    );
});

// Route for deleting a game record from the database.                                                                                            
app.get('/game/delete', function (req, res) {

    var myQry = 'DELETE FROM Games WHERE Game_ID=' + req.query.Game_ID;

    console.log(myQry);

    connection.query(myQry,
        function (err, result) {
            if (err) {
                handleError(res, err);
            }
            else {
                res.send('Game ID ' + req.query.Game_ID + ' successfully deleted.\                                                                
');
            }
        }
    );
});


// Begin listening                                                                                                                                

app.listen(8005);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
