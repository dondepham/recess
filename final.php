#!/usr/local/bin/php -d display_errors=STDOUT

<?php

$database = "recess.db";

try
{
	$db = new SQLite3($database);
}
catch (Exception $exception)
{
	echo '<p>There was an error connecting to the database!</p>';

	if ($db)
	{
		echo $exception->getMessage();
	}

}


// define table + fieldnames
$table = "users";
$field1 = "name";
$field2 = "email";


// create the table
$sql = "CREATE TABLE IF NOT EXISTS $table (
$field varchar(100),
$field2 varchar(100)
)";
$result = $db->query($sql);


// extract form submissions
$username = (isset($_POST["uname"]))?$_POST["uname"]:"";
$email = (isset($_POST["email"]))?$_POST["email"]:"";


$feedback= new Feedback();
$feedback-&gt;name = $_POST['name'];
$feedback-&gt;email = $_POST['email'];
if ($feedback-&gt;Save())
{
    echo "feedback successfully saved";
}

?>