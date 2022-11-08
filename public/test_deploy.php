<!DOCTYPE HTML>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <title>GIT DEPLOYMENT SCRIPT</title>
    <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            .container {
            position: relative;
            overflow: hidden;
            width: 100%;
            padding-top: 75%; /* 4:3 Aspect Ratio  */
            }

            /* Then style the iframe to fit in the container div with full height and width */
            .responsive-iframe {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            }
                    </style>
</head>

<body >
    <div >
        <div >
            <p style="color:white;">Quicksight dashboard</p>
            <div class="container">
                     
                        <iframe
                        class="responsive-iframe"

                        src="https://ap-northeast-1.quicksight.aws.amazon.com/sn/embed/share/accounts/217511598673/dashboards/b10484ed-71f0-4c22-ae3c-d4d72ee9365a?directory_alias=locphuongpl">
                    </iframe>
                    </div>
        </div>
    </div>
</body>

</html>
