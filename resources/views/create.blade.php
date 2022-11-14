<!DOCTYPE html>
<html lang="en">
<head>
    <title>Upload Customer's Feedback</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">
</head>
<body>
    <div class="p-6 bg-white border-b border-gray-200">
        <form action='/storefile' method="post" enctype="multipart/form-data">
            @csrf
            <input type="file" name="feedback" id="feedback">
            <button type="submit">Upload File</button>
        </form>
    </div>
</body>
</html>