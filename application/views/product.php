<!DOCTYPE html>
<html lang="en">
  	<link rel="stylesheet" type="text/css" href="<?php echo ASSET_PATH ?>/css/style.css" />
	<head>
		<title>SVS SHOPING</title>		
	</head>
	<body>
		<div class="container" data-id='1'>sss</div>
		<div class="container" data-id='2'>vvv</div>
		<div class="container" data-id='3'>sss</div>


		<div id="review-page-overlay">
			<div class="rev-head">
				<div id="rev-title"></div>
				<div id="rev-close">close</div>
			</div>
			<div class="clear"></div>
			<div id="rev_body">
				<form id='review-form' action='/jivox/products/add_review' method='POST'>
					<div id="review-page-load" class="has_edit"></div>
				</form>
			</div>
		</div>

		<script>var r = ['app/product']</script>
		<script data-main="<?php echo ASSET_PATH ?>/js/main" src="<?php echo ASSET_PATH ?>/js/require.js"></script>
	</body>
</html>