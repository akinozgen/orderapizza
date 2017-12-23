<?php
/*
 * Mailchimp - http://mailchimp.com/ tool for email campaigns
 * For more info see http://apidocs.mailchimp.com/api/ or for MailChimp class https://github.com/drewm/mailchimp-api
 *
 * (for developers: remember when $_POST['ajax'] is set to 'true' ajax will expect no output for success (if any output is set, it is displayed as error message))
**/

/* Make the changes here ******************/
$api_id = 'd6d0c626ada4c4290f3d4ada60105eb5-us3';		//Mailchimp API ID
$list_id = '0b1251437f';								//Mailchimp LIST ID
$error_mes = 'Email address is not valid.';				//other error messages will be returned directly from Mailchimp
$success_mes = 'Email address successfully added.';
/******************************************/




/* Do not change here anything unless you know for sure what to do */

include_once(dirname(__FILE__) . '/include/mailchimp-api/src/Drewm/MailChimp.php');

$ajax = false;
if(@$_POST['ajax'] == 'true')
	$ajax = true;

if(!$ajax):
	?>
	<!doctype html>
	<html>
	<head>
	<meta charset="utf-8">
	<title>Contact</title>
	</head>
	
	<body>
	<?php
endif;

if(isset($_POST['email']) && validate_email($_POST['email'])) {
	$MailChimp = new MailChimp($api_id);
	$args = array(
		'id'				=> $list_id,
		'email'             => array('email'=>$_POST['email']),
		'double_optin'      => false,
		'update_existing'   => true,
		'replace_interests' => false,
		'send_welcome'      => false,
	);
	
	$result = $MailChimp->call('lists/subscribe', $args);
	if(@$result['error'])
		echo $result['error'];
	else if(!$ajax)
		echo $success_mes;
}
else
	echo $error_mes;

if(!$ajax):
	?>
	</body>
	</html>
	<?php
endif;

function validate_email($email_address) {
	if(preg_match('#^.+@.+\..{2,4}$#', $email_address))
		return true;
	return false;
}
?>