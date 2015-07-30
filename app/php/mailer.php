<?php

	/*
	 * PHP mailer
	 * Made by Will Janz for Open Book Ben
	 * Currently only sends join requests
	 */
	
	// Clean post data
	foreach($_POST as $key => $postData) {
		$data[$key] = trim(htmlentities($postData, ENT_QUOTES, 'UTF-8'));
	}
	
	
	$headers = "From:Skynet@openbookben.com\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

	$message = <<<BODY
<!DOCTYPE HTML>
<html>

<head>
</head>
<body>

<table class="body" align="center"><tbody><tr><td>
	<table align="center" style=""><tbody><tr><td class="content" style="font-family: sans-serif;">
		<h1>"$data[thingTheUserWantsToDo]" Request</h1>
		
		<table border="1" cellspacing="0" cellpadding="4">
			<tr><td>First name</td><td>$data[firstName]</td></tr>
			<tr><td>Last name</td><td>$data[lastName]</td></tr>
			<tr><td>Company</td><td>$data[company]</td></tr>
			<tr><td>Phone number</td><td>$data[phone]</td></tr>
			<tr><td>Email</td><td>$data[email]</td></tr>
			<tr><td>Address</td><td>$data[address]</td></tr>
			<tr><td>City</td><td>$data[city]</td></tr>
			<tr><td>State</td><td>$data[state]</td></tr>
			<tr><td>Zip code</td><td>$data[zip]</td></tr>
			<tr><td>Comments</td><td>$data[comments]</td></tr>
		</table>
	</td></tr></tbody></table>
<td></tr></tbody></table>

</body></html>
BODY;

	$to = 'info@openbookben.com';
	$subject = '"' . $data['thingTheUserWantsToDo'] . '" Request';
	
	mail($to, $subject, $message, $headers);
	
	//echo "Thank you, your request has been sent.";
	
	// Return the user
	$loc = "http://www.openbookben.com/thankYou";
	header("Location: " . $loc);
?>