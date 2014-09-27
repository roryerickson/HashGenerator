<!DOCTYPE html>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>HashGenerator.ORG</title>

<meta name="description"
	content="Generate the MD5, SHA1 and SHA256 checksum for any file in your browser without any plugins.  Create a hash from any text string right from your browser.">
<meta name="keywords"
	content="MD5, SHA1, SHA256, MD5 Hash Calculator, MD5 Checker, MD5 Creator, MD5 Encoder, MD5 Converter, MD5 Checksum Verifier, Generate MD5, Create MD5, Compute MD5, Calculate MD5">

<link href="css/style.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/pajhome_md5.js"></script>
<script type="text/javascript" src="js/pajhome_sha1.js"></script>
<script type="text/javascript" src="js/pajhome_sha256.js"></script>
<script type="text/javascript" src="js/calc.js"></script>

<!--  <script type="text/javascript" src="js/crypto.js"></script> -->

</head>

<body>
	<div id="main">

	<div id="header_box">
	<div id="header_bar">
		<H1>HashGenerator.ORG</H1>
	</div>
</div>
	
	
		<div id="MD5StringDiv" class="fieldset margintop10px">

			<div class="section_header">
				<div class="section_header_text">MD5, SHA1 and SHA256 Hash Generator
					For Text</div>
			</div>

			<div class="tips_text tips_text1">
				<div id="result">Input plain text here to be hashed.</div>

				<textarea id="texts" rows="2" cols="20" onkeyup="selectHash();"></textarea>


				<div id="file_info">

					<div id="checksum_type2" class="line">
						<div class="lineLeft">Checksum type:</div>
						<div class="lineRight">
							<input type="radio" class="radiobtn" name="checksum_type_2"
								id="md5_hash" value="0" checked="true" onclick="selectHash();">MD5
							<input type="radio" class="radiobtn marginleft6px"
								name="checksum_type_2" id="sha1_hash" value="1"
								onclick="selectHash();">SHA1 <input type="radio"
								class="radiobtn marginleft6px" name="checksum_type_2"
								id="sha256_hash" value="2" onclick="selectHash();">SHA-256
						</div>
					</div>


					<div id="text_checksum" class="line">
						<div class="lineLeft">String hash:</div>
						<input type="text" class="hash_string_text" id="hash_string3"
							onclick="SelectAll(&#39;hash_string3&#39;);">
					</div>

				</div>

				<div id="Buttons">
					<input class="Btn" type="button" id="CalcHashForTexts"
						onclick="v3X_();" value="Calculate">
				</div>


			</div>
		</div>


		<div id="LinksDiv" class="fieldset margintop10px marginbottom10px">

			<div style="text-align: center; margin: 20px 0 0 3px;">
				<p>Footer text</p>
				<p></p>
			</div>
		</div>



	</div>




</body>
</html>
