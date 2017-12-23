<?php
/*
 * Send email to your email box.
 *
 * (for developers: remember when $_POST['ajax'] is set to 'true' ajax will expect no output for success (if any output is set, it is displayed as error message))
**/

/* Make the changes here ***********************/
$recepient = "email@email.com";
$default_subject = "Message from Pizzeria";
$is_sender_required = true;		//if this is set to "true" email will be not sent if senders email is empty, set it to "false" if you want to send email anyway
$is_subject_required = false;
$is_message_required = true;
$is_name_required = true;
/***********************************************/




/* Do not change here anything unless you know for sure what to do */

include_once(dirname(__FILE__) . '/include/class.emailSender.php');

$ajax = false;
if(@$_POST['ajax'] == 'true')
	$ajax = true;
$sender = @$_POST['email'];
$name = @$_POST['name'];
$message = @$_POST['message'];
$subject = @$_POST['subject'] != "" ? $_POST['subject'] : $default_subject;

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

$mail = new emailSender();
echo $mail->sendEmail($recepient, $sender, $subject, $message, $name, $is_sender_required, $is_subject_required, $is_message_required, $is_name_required);

if(!$ajax):
	?>
	</body>
	</html>
	<?php
endif;



/*Example use of PHPMailer
include_once('PHPMailer_X.X.X/class.phpmailer.php');
$mail = new PHPMailer();
	
$mail->CharSet = 'utf-8';
$mail->SetFrom($sender, $name);
$mail->AddAddress($recepient, "Recepients Name");
$mail->Subject = $subject;
$mail->MsgHTML('From: '.$name.' '.$sender.'<br>'
		.$_POST['message']);
	
if(!$mail->Send()) {
	echo $mail->ErrorInfo;
} else if(!$ajax) {
	echo "Message sent.";
}
return;
*/
?>
