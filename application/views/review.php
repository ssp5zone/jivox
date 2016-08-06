<div class="scroll-section">
	<?php foreach($review as $rev) { ?>
		<table class="table">
			<tbody>
				<tr>
					<td>Added By</td>
					<td>:</td>
					<td><?=$rev['createdby']?></td>
				</tr>
				<tr>
					<td>Added date</td>
					<td>:</td>
					<td><?=$rev['timestamp']?></td>
				</tr>
				<tr>
					<td>Comments</td>
					<td>:</td>
					<td><pre><?=$rev['review']?></pre></td>
				</tr>
			</tbody>
		</table>
		<hr>
	<?php } ?>
</div>

<!--Add Comment Form-->
<input type="hidden" id="rev_id" name="rev_id" value="<?=$id?>" />
<span class='type'>Add Review</span>
<table>
	<tr>
		<td><textarea id='addRev' name='addRev' placeholder='Enter Review here...'></textarea></td>
		<td><input type="submit" value="Add" class="btn" id="rev-submit"/></td>
	</tr>
</table>
<!-- Comment form End -->

<script type="text/html" id="review_tmpl">
	<table class="table">
		<tbody>
			<tr><td>Added By</td><td>:</td><td><%=createdby%></td></tr>
			<tr><td>Added date</td><td>:</td><td><%=timestamp%></td></tr>
			<tr><td>Comments</td><td>:</td><td><pre><%=comment%></pre></td></tr>
		</tbody>
	</table><hr>
</script>