<!DOCTYPE html>
<html lang="en">
	<head>
		<title>SVS SHOPING</title>		
	</head>
	<body>
		<img src="SVS" id="svs" />
		<div class="container">
				<img src="#" alt="SVS" id="logo"/>
				<?//php echo form_open('login/login_process',array('id' => 'loginform')); ?>
				<form>
				  <div>
					LAN ID and Password<br /><br />
					<input type="text" id="username" name="username" placeholder="Username" required /><br/>
					<input type="password" id="password" name="password" placeholder="Password" required />
				  </div>
				  <button type="submit" id="login_btn" class="" disabled>Login</button>
				  <br /><p id="loginTxt"></p>				  
				</form>
		</div>		
		<script>var r = ['app/login']</script>
		<script data-main="<?php echo ASSET_PATH ?>/js/main" src="<?php echo ASSET_PATH ?>/js/require.js"></script>
	</body>
</html>