
 



 






 



  
 

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="refresh" content="290"; URL=https://www.myabl.com/">
	<meta content="no-cache" http-equiv="cache-control">
	<meta content="no-store" http-equiv="cache-control">
	<meta content="no-cache" http-equiv="Pragma">
	<meta content="0" http-equiv="Expires">
	<meta content="IE=11" http-equiv="X-UA-Compatible">
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="default" name="apple-mobile-web-app-status-bar-style">
	<meta content="true" name="HandheldFriendly">
	<meta content="width" name="MobileOptimized">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>myABL - Login</title>
    <link rel="icon" href="/oamcustompages/pages/img/favicon.png">
    <!-- Bootstrap -->
    <link href="/oamcustompages/pages/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">
    <link href="/oamcustompages/pages/css/fonts.css" rel="stylesheet">
    <link href="/oamcustompages/pages/css/owl.carousel.css" rel="stylesheet">
    <link href="/oamcustompages/pages/css/fonts_new.css" id="font-stylesheet" rel="stylesheet">
    <link id="size-stylesheet" rel="stylesheet">
	<link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notonastaliqurdudraft.css">
	<script type="text/javascript" src="/oamcustompages/pages/jsdir/jquery-includes.js" charset="utf-8"></script>
	<script type="text/javascript" src="/oamcustompages/pages/jsdir/common.js" charset="utf-8" ></script>
	<script type="text/javascript" src="/oamcustompages/pages/jsdir/jquery.min.js" charset="utf-8" ></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  <style>
    html{
      opacity: 0;
    }
    .footer-items li a div{
    /* text-shadow: -0.8px 0.8px 0 white, 0.8px 0.8px 0 white, 0.8px -0.8px 0 white, -0.8px -0.8px 0 white !important;
    text-shadow: -0.7px 0.7px 0 white, 0.7px 0.7px 0 white, 0.7px -0.7px 0 white, -0.7px -0.7px 0 white !important;
    text-shadow: -0.6px 0.6px 0 white, 0.6px 0.6px 0 white, 0.6px -0.6px 0 white, -0.6px -0.6px 0 white !important; */
        /* text-shadow: -0.5px 0.5px 0 white, 0.5px 0.5px 0 white, 0.5px -0.5px 0 white, -0.5px -0.5px 0 white !important; */
        color: #fd7a37 !important;
    font-weight: 600 !important;
        /* text-shadow:     -0.7px 0.7px 0.5px rgba(255,255,255,0.5), 0.7px 0.7px 0.5px rgba(255,255,255,0.5), 0.7px -0.7px 0.5px rgba(255,255,255,0.5), -0.7px -0.7px 0.5px rgba(255,255,255,0.5) */

}
  </style>
<script type="text/javascript">

var scr_w, scr_w1,scr_h, scr_h1;

function setScreenSize(){
			
			scr_w1 = screen.availWidth-10+"px";
			scr_h1 = screen.availHeight-60+"px";
		}

function forgotPassword () {
	var l_frmname 	= 'frmprocess';
	var l_requestid = 'RRFPW01';
	createForm(l_frmname,l_requestid);	
	formwindow_open ($("form[name="+l_frmname+"]") [0], 'Forgot Password?', l_requestid);
}

function createForm (p_frmname,p_requestid) {
	var form = $("form[name="+p_frmname+"]");
	if (form.length == 0) {
		$("form[name='frmmain']").after ('<form name='+p_frmname+' action="process.jsp" method="POST" autocomplete="off"/>');
		var form = $("form[name="+p_frmname+"]");
		form.append ('<input type="hidden" value='+p_requestid+' name="fldRequestId"/>');
		form.append ('<input type="hidden" value="01" name="fldDeviceId"/>');
		form.append ('<input type="hidden" value="eng" name="fldlang"/>');
		form.append ('<input type="hidden" value="" name="title"/>');
	}
}


function togglePassword()
{ 		
		//alert("Hi");
		var pwd = document.getElementById("password1");
        if(pwd.getAttribute("type")=="password"){
            pwd.setAttribute("type","text");
      document.getElementById("eye_icon").src="/oamcustompages/pages/images/icons-png/eye_1.png"; 
      document.getElementById("eye_icon").style.height="10px";        
        } else {
    pwd.setAttribute("type", "password");			
    document.getElementById("eye_icon").src="/oamcustompages/pages/images/icons-png/eye_2.png";
    document.getElementById("eye_icon").style.height="15px";       
  }
}



</script>
<!-- Start Disable frame hijacking Script-->

<style id="antiClickjack">body { display: none !important; }</style>
<script type="text/javascript">
	 
    if (self === top) {
       var antiClickjack = document.getElementById("antiClickjack");
       antiClickjack.parentNode.removeChild(antiClickjack);
    } else {
        top.location = self.location;
    }
</script>

<!-- End Disable frame hijacking Script--> 
 
<script>   
var currentPageLang = 'en';
var userLanguageArray =  new Array();
var isError;

    function trim(s)  
    {  
		return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );  
    }  
 
    function validate()  
    {  
		if(trim(document.frmLogin.sUserName.value)=="")  
		{  
			alert("Login empty");  
			document.frmLogin.sUserName.focus();  
			return false;  
		}  
		else if(trim(document.frmLogin.sPwd.value)=="")  
		{  
			alert("password empty");  
			document.frmLogin.sPwd.focus();  
			return false;  
		}  
    }  

        function Testfn(user,pass){
          var $form = null;
          if($(window).width() <= 767) { $form = document.frmmain; }else { $form = document.frmmain;}
          $form.username.value = user;
          $form.password.value = pass;
          $form.submit();
							
          return false;
						}
						
						function Regfn(){
							
							document.frmreg.submit();
							
							return true;
						}
						
						
    </script> 
	<script language="javascript" type="text/javascript">




function submitform()
{
	
	 document.loginData.action = "/oamcustompages/pages/login.jsp"; 
	 document.loginData.submit();
	 document.loginData.action ="/oam/server/auth_cred_submit";
}

function hideOverlay(overlayDivId)
{
	var overlayDiv = document.getElementById('layer');
	overlayDiv.style.display = 'none';
	
	var overlayDivElement = document.getElementById(overlayDivId);
	overlayDivElement.style.display = 'none';
}

            var virtKeyb = false;

            function HandleKeyPress(evt){
              //console.log(virtKeyb);
              if (virtKeyb) {
                var key = evt.which || evt.charCode || evt.keyCode || 0;

                if (key == 13)
                {
                  //document.frmmain.submit();
                  //Testfn();
                  var l = null;
                  if($(window).width() <= 767) {
                    l = document.getElementById('sSubmit1');
                  }else {
                    l = document.getElementById('sSubmit');
                  }
          l.click();
        }
        else {
          return false;
        }
      }
      else {
        var key = evt.which || evt.charCode || evt.keyCode || 0;
        if (key==13){
          //document.frmmain.submit();
          //Testfn();
          var l = null;
          if($(window).width() <= 767) {
            l = document.getElementById('sSubmit1');
          }else {
            l = document.getElementById('sSubmit');
          }
          l.click();
								}
								else {
									return key;
								}
								
								
							}
						}
					
					</script>

<!-- Added by Junaid Ahmad 10-10-2017 for Security Popup -->
<script language="javascript" type="text/javascript">
    function closeSecurityPopup()
    {
        var popupContainer = document.getElementsByClassName("securityPopupContainer");
        popupContainer[0].style.display = "none";
    }
	function togglePopupLanguage()
	{
		var btn = document.getElementById("btnChangePopupLanguage");
		var englishHeading = document.getElementById("popupHeadingEnglish");
		var urduHeading = document.getElementById("popupHeadingUrdu");
		var englishContent = document.getElementById("popupContentEnglish");
		var urduContent = document.getElementById("popupContentUrdu");
		if (btn.innerText == "English")
		{
			englishContent.style.display = "block";
			englishHeading.style.display = "block";
			urduContent.style.display = "none";
			urduHeading.style.display = "none";
			btn.innerHTML = "اردو";
			btn.style.fontSize = "24px";
			btn.style.marginTop = "6px";
		}
		else
		{
			englishContent.style.display = "none";
			englishHeading.style.display = "none";
			urduContent.style.display = "block";
			urduHeading.style.display = "block";
			btn.innerHTML = "English";
			btn.style.fontSize = "18px";
			btn.style.marginTop = "13px";
		}
	}
</script>
<!-- ******************************** -->

  </head>
  
<style>@media only screen and (max-width: 765px) {
    .loginSide {
       width: 100%;
   }
   }
  .owl-next,
  .owl-disabled {
    background: rgba(225, 75, 16) !important;
  }
  .footer-items {
    padding: 0;
    width: 100%;
    display: flex !important;
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: end;
    margin: 0 !important;
  }
  .footer-items li {
    flex-grow: 1;
    flex-basis: 110px;
    margin-top: 10px;
  }
  .display-flex-center {
    align-items: center;
    justify-content: center;
    display: flex;
    background: #F9FAFB !important;
  }
  .footer-items li>a {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    justify-content: center;
  }
  .footer-items li div {
    margin: 12px 0 18px 0px;
    font-weight: 500;
    font-size: 12.5px;
    line-height: 21px;
    color: #FFFFFF;
  }
  .footer-items li img {
    width: 60px !important;
    height: 60px !important;
  }
  .login-input-field {
    background: #FFFFFF;
    border: 1px solid #E8E8E8 !important;
    ;
    border-radius: 7px !important;
    ;
  }
  .login-input-field>input {
    border: 0 !important
  }
  button {
    text-transform: capitalize !important
  }
  button.btn-submit {
    background: #FD7A37;
    border-radius: 7px;
    font-size: 14px !important;
    border: 0;
    padding: 11px 30px
  }
  .footer-items .sub-menu > ul a:hover {
    color: #FD7A37 !important;
  }
  button.btn-register:active{
        background: transparent;
        -webkit-box-shadow: inset 0 0px 0px rgb(0 0 0 / 0%);
        box-shadow: inset 0 0px 0px rgb(0 0 0 / 0%);
  }
  .footer-btn-register {
    background: transparent;
    border-radius: 7px;
    border: 1px solid #083880;
  }
  button.btn-register {
    padding: 4px 12px;
    background: transparent;
  }
  button.btn-register>a {
    font-size: 14px !important;
    color: #083880;
  }
  button.btn-register>a:hover {
    font-size: 14px !important;
    color: #083880;
  }
  button.btn-register>a:before {
    background: transparent !important;
  }
  body {
    background: #F9FAFB !important;
  }
  a.having-trouble-logIn-text {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #707070;
    text-decoration: underline;
	text-align: right;
	
  }
  .margin-bottom-15x {
    margin-bottom: 15px !important;
  }
  .input-field-label {
    font-weight: 400;
    font-size: 14px;
    color: #4A5568;
    margin-bottom: 3px;
  }
  .contact-us-text>img {
    height: 25px;
    width: 25px;
  }
  .contact-us-text>div {
    margin-left: 10px;
  }
  .contact-us-text {
    margin-top: 25px;
    align-items: center;
    display: flex;
    line-height: 16px;
    letter-spacing: 0.023em;
    color: #8B8A8A;
    justify-content: start;
    font-size: 13.5px;
  }
  .contact-number {
    color: #041F60;
    text-decoration: underline;
  }
  @media (min-width: 768px) {
    .footer-item-right-padding {
      padding-right: 50.4% !important;
    }
    .footer-items li div {
      font-size: 10px;
    }
  }
  div.owl-stage-outer a>div {
    color: #041F60 !important;
  }
  @media (min-width: 992px) {
    .footer-item-right-padding {
      padding-right: 33.4% !important;
    }
    .footer-items li div {
      font-size: 12.5px;
    }
  }
  .padding-left-15x {
    padding-left: 45px !important;
  }
  .input-field-suffix {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding-right: 15px !important;
    margin: auto;
    cursor: pointer;
    height: 10px;
  }
  .input-field-prefix {
    position: absolute;
    top: 0;
    height: 20px;
    left: 0;
    margin: auto;
    bottom: 0;
    border-right: 1px solid rgba(170, 170, 170, 0.13);
    padding-right: 10px;
    padding-left: 10px;
  }
  .footer-items .sub-menu>ul {
    background: #FFFFFF;
    border-radius: 14px;
  }
  .footer-items .sub-menu>ul {
    margin-bottom: 17px !important;
    position: absolute;
    padding: 0;
    margin: 0;
  }
  .footer-items .sub-menu>ul a {
    text-align: center;
    color: #404246;
  }
  .footer-items .sub-menu>ul a {
    border-radius: 14px;
    padding: 15px 10px;
	border-radius: 14px;
	border-radius: 14px;

  }
   .footer-items .sub-menu>ul a {
    border-radius: 14px;
    padding: 15px 10px;
	border-radius: 14px;
	border-radius: 14px;
   	
   	
  }
  .footer-items .sub-menu>ul li:not(:last-child) {
    border-bottom: 1px solid rgba(112, 112, 112, 0.20);
  }
  .footer-items .sub-menu>ul li {
    margin-top: 0 !important;
  }
  .footer-items .submenu-triangle {
    left: 0;
    position: absolute;
    right: 0;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-top: 14px solid white;
    margin: auto;
  }
  .width-100{
      width:100% !important
  }
  ul#open-account.dropdown-menu {
        right:0;
        left:0;
        border:0
  }
  ul#open-account.dropdown-menu li:last-child {
        border-bottom-left-radius: 14px;
        border-bottom-right-radius: 14px;
  }
  ul#open-account.dropdown-menu li:first-child {
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
  }
  ul#open-account.dropdown-menu li {
        margin-right: -33px;
        margin-left: -33px;
        background: white;
  }
  
  
  
  .contact-number:hover{
    cursor: pointer;
    color: #dc4b10;
    text-decoration: underline;
}
  button.btn.btn-register.width-100:hover {
      background: rgba(220,220,220,0.3);
  }
  
  
  /* this is a _demo_ container. remember the importance of relative and absolute positioning */
.tooltip-container {
    position: relative;
    display: flex;
    place-content: center;
}

/* styling of the tooltip display */
p#tooltip-text {
    display: none;
    position: absolute;
    top: -60px;
    z-index: 1;
    background: #00732c;
    padding: 8px;
    font-size: 1rem;
    color: #fff;
    border-radius: 2px;
    animation: fadeIn 0.6s;
}



.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {opacity: 0;} 
  to {opacity: 1;}
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity:1 ;}
}
  
  
  .hide {
  display: none;
}
    
.myDIV:hover+.hide {
  display: block;
  color: white;
}



  
</style>
<body>
  <section class="login cover equalizer-container  h-100" style="background-image:url('/oamcustompages/pages/images/pink-icon/backscreen.jpg');">
	<!-- Added by Junaid Ahmad 10-10-2017 for Security Popup -->
  
<div class="securityPopupContainer">
    <div class="securityPopup">
        <div id="securityPopupHeader">
            <center>
        <span id="popupHeadingEnglish" style="display:block;font-weight:bold;font-size:18px;color:#E88522">Secure Internet Banking Tips</span>
                  <span id="popupHeadingUrdu" dir="rtl" style="display:none;font-weight:bold;font-family:'Noto Nastaliq Urdu Draft';font-size:16px;color:#E88522">تجاویز برائےمحفوظ انٹرنیٹ بینکنگ</span>
      </center>      
        </div>
        <br/>
		<div id="popupContentEnglish" style="display:block;font-size:14px">																											   
			<p>Allied Bank never asks you for your personal information (myABL ID, password, ATM PIN, OTP) through phone calls, web links, SMS, emails and social media. Also, we only call our customers from 1222 and never call from 111-225-225. Do not share any personal information to callers claiming to be from Allied Bank/government/security companies.</p>
			<ul style="color:#222222;margin-top:20px;font-style:oblique">
				<li>Never store myABL ID/passwords, card numbers on your browser.</li>
				<li>Always choose a unique and strong password, and change it regularly.</li>
				<li>Keep your browser, and antivirus updated and periodically scan your computer.</li>
				<li>Login to myABL Internet Banking through <a href="https://www.abl.com/">https://www.abl.com</a> into your browser.</li>
				<li>Always logout myABL  after use.</li>
				<li>Check your last login details and transaction history.</li>
				<li>In case of any suspicious activity, immediately contact our helpline 111-225-225.</li>
			</ul>
		</div>
      <div id="popupContentUrdu" dir="rtl" style="font-size:14px;font-family:'Noto Nastaliq Urdu Draft';font-weight:500;display:none;line-height:28px">
          <p>الائیڈبینک آپ کی ذاتی معلومات جیسا کہ (انٹرینٹ آئی ڈی اور پاسورڈ ) کے بارے میں بذریعہ فون کالز، ویب لنکس، ایس ایم ایس، ای میل اور سوشل میڈیا کےذریعے کبھی بھی نہیں پوچھتا اور ہم اپنے صارفین کو صرف 1222 سے کال کرتے ہیں اور کبھی بھی 225-225-111.سے کال نہیں کرتے۔ اگر کبھی آپ کو ایسی کوئی کال/ای میل یا ایس ایم ایس موصول ہو جس میں الائیڈ بینک/گورنمنٹ/سکورٹی اداروں کا نام استعمال کر کے آپ سے معلومات حاصل کرنے کی کوشش کی جائے تو معلومات فراہم نہ کریں۔</p>
        <ul style="color:#222222;margin-top:20px">
                <li>کبھی بھی   myABL   آئی  ڈی/پاسورڈ ، کارڈ نمبرزبراؤزر میں سٹور مت کریں۔</li>
                <li>ہمیشہ  ایک منفرد اور مضبوط پاسورڈ کا انتخاب کریں، اور باقاعدگی سے بدلتے رہیں۔</li>
                <li>اپنے براؤزر اور اینٹی وائرس کو اپ ڈیٹ رکھیں اوروقفے وقفے سےاپنے کمپیوٹر  کو جانچتے رہیے۔</li>
                <li>ہمیشہ myABL      استعمال کرلینے کے بعد اسے لاگ آؤٹ کریں۔</li>
                <li>اپنے آخری لاگ ان کی تفصیلات اور ٹرانزیکشن کی تاریخ کی جانچ پڑتال کریں۔</li>
                <li>کسی قسم کی مشکوک سرگرمی کی صورت میں، فوری ہماری ہیلپ لائن 225-225-111 پر رابطہ کریں۔</li>
            </ul>
    </div>
    <br/>
        <!--p style="color:#222222;font-size: 14px;font-style: oblique;margin-left: 20px">Allied bank is not responsible if customers do not comply with above security guidelines.</p-->
    <!-- Begin DigiCert site seal HTML and JavaScript -->


<script type="text/javascript">

var __dcid = __dcid || [];__dcid.push(["DigiCertClickID_9yJtmmFC", "11", "m", "black", "9yJtmmFC"]);(function(){var cid=document.createElement("script");cid.async=true;cid.src="//seal.digicert.com/seals/cascade/seal.min.js";var s = document.getElementsByTagName("script");var ls = s[(s.length - 1)];ls.parentNode.insertBefore(cid, ls.nextSibling);}());

</script>

<!-- End DigiCert site seal HTML and JavaScript -->
        <div style="width:100%; height: 50px; margin-top: -10px;padding-top:10px;">
        <span id="DigiCertClickID_K2BAxMS0" data-language="en" style="float:left;padding-left:30px;">

            <a href="https://www.digicert.com/ev-ssl-certification/"></a>

        </span>
            <Button style="float: right;background: #e56419;color: #f2f2f2;margin-top:10px;" onclick="closeSecurityPopup()">Proceed</Button>
      <a id="btnChangePopupLanguage" style="font-face:Lato;float:right;margin-top:6px;padding-right:20px;font-size:24px;font-weight:500;color:#1A0DAB;cursor:pointer;text-align:right;" onclick="togglePopupLanguage()">اردو</a>
        </div>
    </div>
</div>
  
<!--*****************************************************-->
      <div class="container-fluid">
  <div class="row rowMain " style=" display: flex; ">
      <style>
      .h-100{ height: 100% !important;  }</style>
              <div class="h-100 col-sm-6 col-md-8 equalize rightPanel hidden-xs" 
                ></div>
              <div class="h-100 col-sm-6 col-md-4 equalize loginSide" style="background: #F9FAFB;;   position: absolute; right: 0;">
                  <div class="loginScreen display-flex-center" style="z-index: 1;">
                      <ul style="display: none;" class="list-inline main-tab hidden-xs">
                  <li><a href="#" class="active">Personal</a></li>
                  <li><a target="_blank" href="https://business.myabl.com">Business</a></li>
                </ul>
                <div class="clear"></div>
                <div class=" col-xs-9 col-sm-8 col-md-8 col-lg-8 loginContent" style="    padding-left: 0;padding-right: 0;">
                  <div class="logoLogin">
                    <img style="height:45px !important;" src="/oamcustompages/pages/images/icons-png/myabl-logo.png" alt="My ABL">
                  </div>
                  <div class="loginDesc">
                    <h2 style="font-size: 25px;margin:34px 0 17px 0">Welcome!</h2>
               </div>
			<div class="form-group has-feedback" style="margin-bottom:5px !important">
							
                   <div align="center" id="errorBar1" class="errorBar1" enctype="text/plain" name="errorBar1" >
                <div id="errMsg" style="line-height:15px;color:red;">
                  <p id="result1" class="loginFailed"> </p> 
                </div>
              </div>
              
            </div>
                  <form  id="form" onSubmit=""  method="post"  autocomplete="off">
                    <div class="input-field-label">Username</div>
                    <div class="login-input-field form-group has-feedback">
                      <label class="sr-only control-label" for="uID">Username</label>
                      <input type="text" class="padding-left-15x form-control " name="username1" id="username1"
                          autocomplete="off" placeholder="Username">
                  <img class="input-field-prefix" src="/oamcustompages/pages/images/icons-png/username-field.png" />
                  </div>
                  <div class="input-field-label">Password</div>
                  <div class="login-input-field form-group has-feedback">
                    <label class="sr-only control-label" for="uPass">Password</label>
                    <input autocomplete="off" type="password" class="padding-left-15x form-control " name="password1"
                    id="password1" onkeypress="return HandleKeyPress(event);"
                    placeholder="Password">
            <img class="input-field-prefix" src="/oamcustompages/pages/images/icons-png/password-field.png" />
            <img class="input-field-suffix" id='eye_icon' onclick="togglePassword()" src="/oamcustompages/pages/images/icons-png/eye_1.png" />
                    </div>
                    <div class="form-link margin-bottom-15x" style="display: flex; justify-content: flex-start;">
                      <a href="https://www.myabl.com/?module=forgot-password"
                        class="having-trouble-logIn-text">Having Trouble Logging In ?</a>
                      </div>
                    <button type="button" name="sSubmit" id="sSubmit" class="btn btn-submit sSubmit">Sign
                      in</button>
                      <footer class="formFooter footer-btn-register">
                      <button type="button" class="btn btn-register width-100"><a href="https://www.myabl.com/?module=registration" class="width-100">Register Now</a></button>
                    </footer>
                  </form>
          <form name="frmmain" action="/oam/server/auth_cred_submit" method="post"  autocomplete="off">
            <input name="request_id" value="" type="hidden">&nbsp;<input name="username" value="" autocomplete="off"  type="hidden"><input name="password" value="" autocomplete="off"  type="hidden" autocomplete="new-password">
          </form>
          <div class="contact-us-text">
              <img src="/oamcustompages/pages/images/icons-png/contact-us.png" />
              <div>
                  <div>Need Any Help ?</div>
                  <div>Contact Us&nbsp;<a class="contact-number" href="tel:111-225-225">111-225-225</a></div>
                </div>
              </div>


                </div>
              </div>
      
            </div>

            <ul class="list-inline col-sm-6 col-md-8 col-lg-8 footer-items owl-responsive footer-item-right-padding" style="left: 0;position: fixed;bottom: 0;"> 
                <li>
                  <a href="https://www.myabl.com/pages/public/features.html" target="popup" onclick="window.open('https://www.myabl.com/pages/public/features.html#fundstransfer','popup','width=600,height=600,scrollbars=yes,resizable=yes'); return false;">
                    <img src="/oamcustompages/pages/images/icons-png/features.png" />
                    <div>Features</div>
                  </a>
                </li>
                <li>
                  <a href="https://www.myabl.com/pages/public/FAQ.html" target="popup" onclick="window.open('https://www.myabl.com/pages/public/FAQ.html','popup','width=600,height=600,scrollbars=yes,resizable=yes'); return false;">
                    <img src="/oamcustompages/pages/images/icons-png/faqs.png" / class="no-change">
                    <div>FAQ's</div>
                  </a>
                </li>
                <li>
                  <a href="https://www.myabl.com/pages/public/password-security.html" target="popup" onclick="window.open('https://www.myabl.com/pages/public/password-security.html','popup','width=600,height=600,scrollbars=yes,resizable=yes'); return false;">
                    <img src="/oamcustompages/pages/images/icons-png/security.png" />
                    <div>Security</div>
                  </a>
                </li>
            <li class="dropdown dropup customRda sub-menu">
                       <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                    <img src="/oamcustompages/pages/images/icons-png/open-account.png" />
                          <div>Open Account</div>
                       </a>
                       <ul class="dropdown-menu" id="open-account" aria-labelledby="dropdownMenuLink" style="padding: 0; margin: 0;min-width: -webkit-fill-available;">
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="https://rda.abl.com/#/customer-onboarding?customerType=RDA" target="_blank">Roshan Digital Account</a></li>
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="https://rda.abl.com/#/customer-onboarding?customerType=DAO" target="_blank">myPakistan Digital Account</a></li>
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="https://www.abl.com/be-our-customer/" target="_blank">Be Our Customer</a><div class="submenu-triangle"></div></li>
                       </ul>
                </li>
                
            <li>
              <a href="https://www.abl.com/latest-offers/"  target="_blank">
                <img src="/oamcustompages/pages/images/icons-png/offers.png" / class="no-change">
                <div>Offers</div>
              </a>
            </li>
                   <li class="dropdown dropup customRewards sub-menu" style="display: none">
                       <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                    <img src="/oamcustompages/pages/images/icons-png/offers.png" />
                          <div>Rewards & Offers</div>
                       </a>
                       <ul class="dropdown-menu" id ="offers-rewards" aria-labelledby="dropdownMenuLink" style="padding: 0; margin: 0;min-width: -webkit-fill-available;">
					   <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="http://10.224.3.147/(S(0grbxpwdpx2rxwoj0bex0vgm))/index.aspx " target="_blank">myABL coins</a></li>
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="#" target="_blank">myABL Rewards</a></li>
						    <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="#" target="_blank">ABL Cards</a></li>
							  <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="#" target="_blank">Master Cards QR</a></li>
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="#" target="_blank">Golootlo</a><div class="submenu-triangle"></div></li>
                       </ul>
                
                </li>
                <li>        
                  <a href="https://www.abl.com/services/branch-network/" target="_blank">
                    <img src="/oamcustompages/pages/images/icons-png/locate-us.png" />
                    <div>Locate Us</div>
                  </a>
                </li>
                  <li class="dropdown dropup customhelp sub-menu">
                       <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                    <img src="/oamcustompages/pages/images/icons-png/help.png" />
                          <div>Help and Support</div>
                       </a>
                       <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="padding: 0; margin: 0;min-width: -webkit-fill-available;">
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="https://www.abl.com/help-and-support/complaints/" target="_blank">Complaints</a></li>
                          <li style="transform: skew(-0deg, 0deg);display: block"><a style="transform: skew(-0deg, 0deg);" class="dropdown-item" href="https://www.abl.com/
						  -and-support/dispute-settlement" target="_blank">Disputes</a><div class="submenu-triangle"></div></li>
                       </ul>
                </li>
          </ul>
          </div>
      </div>
  </section>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/oamcustompages/pages/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/oamcustompages/pages/js/bootstrap.min.js"></script>
    <script src="/oamcustompages/pages/js/owl.carousel.min.js"></script>

    <script type="text/javascript">
	  $(document).ready(function() {
		  
			/* Added by Asif: 10-nov-2017
				Greeting the Customer
			*/
			var myDate = new Date();
			var hrs = myDate.getHours();

			var greet;

			if (hrs < 12)
				greet = 'Good Morning!';
			else if (hrs >= 12 && hrs < 16)
				greet = 'Good Afternoon!';
			else if (hrs >= 16 && hrs < 21)
				greet = 'Good Evening!';
			else if (hrs >= 21 && hrs <= 24)
				greet = 'Good Evening!';
		
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
							  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
							];
			var dateStringFormat = days[myDate.getDay()] + ', ' + monthNames[myDate.getMonth()] + ' ' + myDate.getDate() + ', ' + myDate.getFullYear();
			$('#greetDiv').html('<h3>'+ greet +'</h3><span>' + dateStringFormat + '</span>');
			//console.log(dateStringFormat);
			/* Greet code finishes here */

      $(".errorBar1").hide();
      $('.sSubmit').click(function () {

        $('.sSubmit').attr('disabled', true);
        var $form = $(this).closest('form'); 
        
        var userName = $form.find('#username1').val();
        var password = $form.find('#password1').val(); 
        var datastr = 'userName='+userName+'&password='+password;
        Testfn(userName, password);















      });
      $(window).on('load resize', function () {
        if (window.innerWidth >= 480) {
          // $('.col1').height($('.wraper').height());
          // $('.col2').height($('.wraper').height());
          // $('.col3').height($('.wraper').height());
          var bodyheight = $('body').height()
          var footerheight = $('.sitefooter').height();
          var containerheight = $('.equalizer-container').height();
          var targetheight = bodyheight - footerheight;
          $('.equalizer-container, .equalize').height(targetheight);
        }
        if (window.innerWidth < 480) {
          // $('.col1').height('auto');
          // $('.col2').height('auto');
          // $('.col3').height('auto');
          var bodyheight = $('body').height()
          var footerheight = $('.sitefooter').height();
          var containerheight = $('.equalizer-container').height();
          var targetheight = bodyheight - footerheight;
          //$('.equalizer-container, .equalize').height('-webkit-fill-available');
        }
        $("#size-stylesheet").attr("href", "/oamcustompages/pages/css/main_desktop.css");

        if ($(window).width() >= 767) {
          // $("#size-stylesheet").attr("href", "/oamcustompages/pages/css/main_desktop.css");
          $("#font-stylesheet").attr("href", "/oamcustompages/pages/css/fonts.css");
          
         } else {
          // $("#size-stylesheet").attr("href", "/oamcustompages/pages/css/main.css");
          $("#font-stylesheet").attr("href", "/oamcustompages/pages/css/fonts_new.css");
        }
      });
 
      // var bodyheight = $('body').height()
      // var footerheight = $('.sitefooter').height();
      // var containerheight = $('.equalizer-container').height();
      // var targetheight = bodyheight - footerheight;
      // $('.equalizer-container, .equalize').height(targetheight);


      $(function () {
        setTimeout(function(){
          var owl = $('.owl-responsive'),
          owlOptions = {
            loop: false,
            margin: 0,
            items: 3,
            slideBy: 3,
            nav: true,
            navText: ['<i class="icon-back"></i>', '<i class="icon-next"></i>'],
                // responsive:{
                //   0:{
                //       items:3
                //   },
                //   480:{
                //       items:3
                //   },
                //   640:{
                //     items:3
                //   }
                // }
          };


           

          if ( $(window).width() < 767 ) {
            var owlActive = owl.owlCarousel(owlOptions);
          } else {
            owl.addClass('off');
          }
        owl.on('changed.owl.carousel', function (event) {
          if (event.item.index==0) {
            $('.owl-next').removeClass('owl-disabled');
            $('.owl-prev').addClass('owl-disabled');
          } else {
            $('.owl-prev').removeClass('owl-disabled');
            $('.owl-next').addClass('owl-disabled');
          }

        });

        $(window).resize(function () {
          if ($(window).width() < 767) {
            if ($('.owl-responsive').hasClass('off')) {
              var owlActive = owl.owlCarousel(owlOptions);
              owl.removeClass('off');
            }
          } else {
            if (!$('.owl-responsive').hasClass('off')) {
              owl.addClass('off').trigger('destroy.owl.carousel');
              owl.find('.owl-stage-outer').children(':eq(0)').unwrap();
            }
          }
        });
      }, 2000)

      });
      $(".customRda").mouseenter(function(){
				  var $image = $(this).find("img");
				  var imgSrc = $image.attr("src");
				  var updatedPath = imgSrc.split("/");
				  updatedPath[updatedPath.length - 1] = "open-account.png";
				  updatedPath = updatedPath.join("/")
				  $image.attr("src",updatedPath);
			  }).mouseleave(function(){
				  var $image = $(this).find("img");
				  var imgSrc = $image.attr("src");
				  var updatedPath = imgSrc.split("/");
				  updatedPath[updatedPath.length - 1] = "open-account.png";
				  updatedPath = updatedPath.join("/")
				  $image.attr("src",updatedPath);
			  });
    
      $(".customhelp").mouseenter(function(){
				  var $image = $(this).find("img");
				  var imgSrc = $image.attr("src");
				  var updatedPath = imgSrc.split("/");
				  updatedPath[updatedPath.length - 1] = "help.png";
				  updatedPath = updatedPath.join("/")
				  $image.attr("src",updatedPath);
			  }).mouseleave(function(){
				  var $image = $(this).find("img");
				  var imgSrc = $image.attr("src");
				  var updatedPath = imgSrc.split("/");
				  updatedPath[updatedPath.length - 1] = "help.png";
				  updatedPath = updatedPath.join("/")
				  $image.attr("src",updatedPath);
			  });
			   $(".customRewards").mouseenter(function(){
				  var $image = $(this).find("img");
				  var imgSrc = $image.attr("src");
				  var updatedPath = imgSrc.split("/");
				  updatedPath[updatedPath.length - 1] = "offers.png";
				  updatedPath = updatedPath.join("/")
				  $image.attr("src",updatedPath);
			  }).mouseleave(function(){
				  var $image = $(this).find("img");
				  var imgSrc = $image.attr("src");
				  var updatedPath = imgSrc.split("/");
				  updatedPath[updatedPath.length - 1] = "offers.png";
				  updatedPath = updatedPath.join("/")
				  $image.attr("src",updatedPath);
			  });
      });
    </script>
		<script type="text/javascript">
	window.__lc = window.__lc || {};
	window.__lc.license = 1125501;
	(function() {
	  var lc = document.createElement('script');
	  lc.type = 'text/javascript'; 
	  lc.async = true;
	  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
	});
</script>

  </body>
</html>
