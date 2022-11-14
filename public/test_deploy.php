<!DOCTYPE html>
<html >
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Quicksight Dashboard</title>
        
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
            .container {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: calc(100vh - 40px);
            /* padding-top: 75%; 4:3 Aspect Ratio  */
            }
            /* Then style the iframe to fit in the container div with full height and width */
            .responsive-iframe {
            width: 100%;
            height: 100%;
            }
            /* @media screen and (max-width: 783px) {
                .container{
                    
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    padding-top: 250%;
                }
            } */
                    </style>

    </head>
    <body>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 bg-white border-b border-gray-200">
                        <h1>Quicksight Dashboards</h1>
                    </div>
                </div>
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="container">
                    <iframe
                    class="responsive-iframe"
                    src="https://ap-northeast-1.quicksight.aws.amazon.com/sn/embed/share/accounts/217511598673/dashboards/be0e7e90-904e-4222-92d3-d5f146cb19d3?directory_alias=locphuongpl">
                    </iframe>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>



    
 

