<!DOCTYPE html>
<html lang="en">
  	<link rel="stylesheet" type="text/css" href="<?php echo ASSET_PATH ?>/css/login.css" />
	<head>
		<title>SVS SHOPING</title>		
	</head>
	<body>
		<img  id="svs" />
		<div class="container">
				<img src="#" alt="SVS" id="logo"/>
				<form action='welcome/login_process' type='POST'>				
				  <div>
					LAN ID and Password<br /><br />
					<input type="text" id="username" name="username" placeholder="Username" required /><br/>
					<input type="password" id="password" name="password" placeholder="Password" required />
				  </div>
				  <button type="submit" id="login_btn" class="">Login</button>
				  <br /><p id="loginTxt"></p>				  
				</form>
		</div>		
		<script data-main="<?php echo ASSET_PATH ?>/js/main" src="<?php echo ASSET_PATH ?>/js/require.js"></script>
	</body>
</html>
